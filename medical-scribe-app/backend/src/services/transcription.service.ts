import OpenAI from 'openai';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface TranscriptionResult {
  text: string;
  language?: string;
  duration?: number;
  segments?: Array<{
    id: number;
    start: number;
    end: number;
    text: string;
  }>;
}

export class TranscriptionService {
  /**
   * Transcribe audio file using OpenAI Whisper
   */
  async transcribeAudio(
    audioFilePath: string,
    language?: string
  ): Promise<TranscriptionResult> {
    try {
      logger.info('Starting audio transcription', { audioFilePath, language });

      // Check if file exists
      if (!fs.existsSync(audioFilePath)) {
        throw new AppError('Audio file not found', 404);
      }

      const startTime = Date.now();

      // Create readable stream from file
      const audioFile = fs.createReadStream(audioFilePath);

      // Call OpenAI Whisper API
      const response = await openai.audio.transcriptions.create({
        file: audioFile,
        model: process.env.WHISPER_MODEL || 'whisper-1',
        language: language || 'en',
        response_format: 'verbose_json',
        timestamp_granularities: ['segment'],
      });

      const duration = Date.now() - startTime;

      logger.info('Audio transcription completed', {
        duration: `${duration}ms`,
        textLength: response.text.length,
      });

      return {
        text: response.text,
        language: response.language,
        duration,
        segments: response.segments as any,
      };
    } catch (error: any) {
      logger.error('Audio transcription failed', {
        error: error.message,
        audioFilePath,
      });
      throw new AppError(
        `Transcription failed: ${error.message}`,
        500
      );
    }
  }

  /**
   * Process real-time audio chunks for live transcription
   */
  async transcribeAudioChunk(
    audioChunk: Buffer,
    consultationId: string
  ): Promise<string> {
    try {
      // Save chunk to temporary file
      const tempFilePath = `/tmp/${consultationId}-${Date.now()}.webm`;
      fs.writeFileSync(tempFilePath, audioChunk);

      const result = await this.transcribeAudio(tempFilePath);

      // Clean up temp file
      fs.unlinkSync(tempFilePath);

      return result.text;
    } catch (error: any) {
      logger.error('Real-time transcription chunk failed', {
        error: error.message,
        consultationId,
      });
      throw error;
    }
  }

  /**
   * Identify speakers in the conversation (doctor vs patient)
   */
  async diarizeTranscription(
    transcriptionText: string
  ): Promise<Array<{ speaker: string; text: string; timestamp: number }>> {
    try {
      // Use GPT-4 to identify speakers based on context
      const prompt = `
You are analyzing a medical consultation transcript. Identify who is speaking (Doctor or Patient) for each part of the conversation.

Transcript:
${transcriptionText}

Return a JSON array with objects containing:
- speaker: "Doctor" or "Patient"
- text: the spoken text
- timestamp: estimated position in conversation (0-100%)

Consider:
- Doctors typically ask questions, explain diagnoses, prescribe treatments
- Patients describe symptoms, answer questions, express concerns
`;

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result.conversation || [];
    } catch (error: any) {
      logger.error('Speaker diarization failed', { error: error.message });
      throw new AppError(`Diarization failed: ${error.message}`, 500);
    }
  }
}

export default new TranscriptionService();
