import OpenAI from 'openai';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type NoteFormat = 'SOAP' | 'CHEDDAR' | 'DAP' | 'CUSTOM';

export interface ClinicalNote {
  format: NoteFormat;
  content: Record<string, string>;
  plainText: string;
  summary: string;
}

export class NoteGenerationService {
  /**
   * Generate clinical note from transcription
   */
  async generateClinicalNote(
    transcriptionText: string,
    format: NoteFormat = 'SOAP',
    customTemplate?: string
  ): Promise<ClinicalNote> {
    try {
      logger.info('Generating clinical note', { format, textLength: transcriptionText.length });

      const prompt = this.buildPrompt(transcriptionText, format, customTemplate);

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert medical scribe who creates accurate, concise clinical documentation.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');

      // Convert structured note to plain text
      const plainText = this.formatNotePlainText(result, format);

      return {
        format,
        content: result,
        plainText,
        summary: result.summary || '',
      };
    } catch (error: any) {
      logger.error('Clinical note generation failed', { error: error.message });
      throw new AppError(`Note generation failed: ${error.message}`, 500);
    }
  }

  /**
   * Build prompt based on note format
   */
  private buildPrompt(
    transcriptionText: string,
    format: NoteFormat,
    customTemplate?: string
  ): string {
    const basePrompt = `
Analyze the following medical consultation transcript and generate a clinical note.

Transcript:
${transcriptionText}

`;

    switch (format) {
      case 'SOAP':
        return basePrompt + `
Create a SOAP note with the following sections:

Return JSON with:
{
  "subjective": "Patient's reported symptoms, history, concerns",
  "objective": "Physical examination findings, vital signs, test results",
  "assessment": "Diagnosis or clinical impression",
  "plan": "Treatment plan, prescriptions, follow-up",
  "summary": "One-sentence summary of the visit"
}
`;

      case 'CHEDDAR':
        return basePrompt + `
Create a CHEDDAR note with the following sections:

Return JSON with:
{
  "chief_complaint": "Main reason for visit",
  "history": "History of present illness, past medical history",
  "examination": "Physical examination findings",
  "diagnostics": "Lab results, imaging, tests ordered",
  "discussion": "Discussion with patient, differential diagnosis",
  "assessment": "Clinical assessment and diagnosis",
  "resolution": "Treatment plan and follow-up",
  "summary": "One-sentence summary of the visit"
}
`;

      case 'DAP':
        return basePrompt + `
Create a DAP note with the following sections:

Return JSON with:
{
  "data": "Subjective and objective data from the visit",
  "assessment": "Clinical assessment and diagnosis",
  "plan": "Treatment plan and next steps",
  "summary": "One-sentence summary of the visit"
}
`;

      case 'CUSTOM':
        return basePrompt + (customTemplate || 'Create a clinical note in your preferred format.');

      default:
        throw new AppError('Invalid note format', 400);
    }
  }

  /**
   * Format structured note as plain text
   */
  private formatNotePlainText(content: Record<string, string>, format: NoteFormat): string {
    let text = '';

    Object.entries(content).forEach(([key, value]) => {
      if (key === 'summary') return; // Skip summary in plain text
      const formattedKey = key.toUpperCase().replace(/_/g, ' ');
      text += `${formattedKey}:\n${value}\n\n`;
    });

    return text.trim();
  }

  /**
   * Generate a referral letter
   */
  async generateReferralLetter(
    patientName: string,
    consultationSummary: string,
    specialistType: string,
    doctorName: string
  ): Promise<string> {
    try {
      const prompt = `
Write a professional medical referral letter to a ${specialistType}.

Patient: ${patientName}
Referring Doctor: ${doctorName}
Consultation Summary: ${consultationSummary}

The letter should include:
- Date
- Professional greeting
- Reason for referral
- Relevant clinical history
- Examination findings
- Request for specialist evaluation
- Professional closing

Format as a complete letter ready to send.
`;

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
      });

      return response.choices[0].message.content || '';
    } catch (error: any) {
      logger.error('Referral letter generation failed', { error: error.message });
      throw new AppError(`Referral generation failed: ${error.message}`, 500);
    }
  }

  /**
   * Generate patient handout/instructions
   */
  async generatePatientHandout(
    diagnosis: string,
    treatment: string,
    specialInstructions?: string
  ): Promise<string> {
    try {
      const prompt = `
Create a patient-friendly handout explaining their condition and treatment.

Diagnosis: ${diagnosis}
Treatment: ${treatment}
${specialInstructions ? `Special Instructions: ${specialInstructions}` : ''}

The handout should:
- Explain the condition in simple terms
- List treatment steps
- Include do's and don'ts
- Mention when to seek immediate care
- Be reassuring but accurate

Write in clear, non-technical language suitable for patients.
`;

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
      });

      return response.choices[0].message.content || '';
    } catch (error: any) {
      logger.error('Patient handout generation failed', { error: error.message });
      throw new AppError(`Handout generation failed: ${error.message}`, 500);
    }
  }
}

export default new NoteGenerationService();
