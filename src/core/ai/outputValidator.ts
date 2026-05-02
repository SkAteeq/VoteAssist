import { z } from 'zod';

const ElectionResponseSchema = z.object({
  answer: z.string(),
  sources: z.array(z.string()).optional(),
  actionToTake: z.enum(['REGISTER', 'FIND_BOOTH', 'WAIT', 'NONE']).optional()
});

export function validateOutput(rawResponse: string) {
  try {
    const parsed = JSON.parse(rawResponse);
    return ElectionResponseSchema.parse(parsed);
  } catch (e) {
    // Fallback for non-JSON responses
    return {
      answer: rawResponse,
      actionToTake: 'NONE' as const
    };
  }
}
