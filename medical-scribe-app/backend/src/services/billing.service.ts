import OpenAI from 'openai';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface BillingCode {
  codeType: 'ICD-10' | 'CPT' | 'MBS';
  code: string;
  description: string;
  isPrimary: boolean;
  confidence: number;
}

export class BillingService {
  /**
   * Suggest billing codes based on consultation notes
   */
  async suggestBillingCodes(
    clinicalNote: string,
    consultationType: string = 'general'
  ): Promise<BillingCode[]> {
    try {
      logger.info('Suggesting billing codes', { consultationType });

      const prompt = `
You are a medical billing expert specializing in Australian Medicare (MBS), ICD-10, and CPT codes.

Analyze this clinical note and suggest appropriate billing codes:

${clinicalNote}

Consultation Type: ${consultationType}

Return a JSON array of billing codes with this structure:
{
  "codes": [
    {
      "codeType": "MBS" | "ICD-10" | "CPT",
      "code": "the actual code",
      "description": "brief description",
      "isPrimary": true/false,
      "confidence": 0.0-1.0
    }
  ]
}

Guidelines:
- Include MBS codes for Australian Medicare billing
- Include ICD-10 codes for diagnoses
- Include CPT codes if applicable
- Mark the primary diagnosis/procedure
- Provide confidence scores based on clinical clarity
- Only suggest codes you're confident about (>0.7 confidence)
`;

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in medical billing codes for Australian healthcare.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result.codes || [];
    } catch (error: any) {
      logger.error('Billing code suggestion failed', { error: error.message });
      throw new AppError(`Billing code suggestion failed: ${error.message}`, 500);
    }
  }

  /**
   * Validate a billing code
   */
  async validateBillingCode(code: string, codeType: string): Promise<boolean> {
    // In production, this would check against a billing code database
    // For now, basic validation
    try {
      switch (codeType) {
        case 'MBS':
          // MBS codes are typically 4-5 digits
          return /^\d{4,5}$/.test(code);
        case 'ICD-10':
          // ICD-10 format: letter + 2 digits + optional decimal + 1-2 more digits
          return /^[A-Z]\d{2}(\.\d{1,2})?$/.test(code);
        case 'CPT':
          // CPT codes are 5 digits
          return /^\d{5}$/.test(code);
        default:
          return false;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * Calculate estimated Medicare rebate (Australian)
   */
  async calculateMedicareRebate(mbsCode: string): Promise<number> {
    // In production, this would query the MBS fee schedule
    // For now, return dummy data
    const mbsSchedule: Record<string, number> = {
      '23': 39.10,     // Level A consultation
      '36': 75.25,     // Level B consultation
      '44': 148.40,    // Level C consultation
      '52': 222.60,    // Level D consultation
      '104': 17.75,    // Blood test
      '721': 83.95,    // ECG
    };

    return mbsSchedule[mbsCode] || 0;
  }

  /**
   * Generate billing summary for consultation
   */
  async generateBillingSummary(
    codes: BillingCode[],
    consultationDuration: number
  ): Promise<{
    totalCodes: number;
    estimatedMedicareRebate: number;
    privateFeeSuggestion: number;
    codeBreakdown: Array<{ code: string; description: string; rebate: number }>;
  }> {
    try {
      const codeBreakdown = await Promise.all(
        codes
          .filter(c => c.codeType === 'MBS')
          .map(async (code) => ({
            code: code.code,
            description: code.description,
            rebate: await this.calculateMedicareRebate(code.code),
          }))
      );

      const estimatedMedicareRebate = codeBreakdown.reduce(
        (sum, item) => sum + item.rebate,
        0
      );

      // Suggest private fee (typically 150-200% of Medicare rebate)
      const privateFeeSuggestion = Math.round(estimatedMedicareRebate * 1.75);

      return {
        totalCodes: codes.length,
        estimatedMedicareRebate,
        privateFeeSuggestion,
        codeBreakdown,
      };
    } catch (error: any) {
      logger.error('Billing summary generation failed', { error: error.message });
      throw new AppError(`Billing summary failed: ${error.message}`, 500);
    }
  }
}

export default new BillingService();
