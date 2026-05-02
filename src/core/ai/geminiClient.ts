import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateGeminiResponse(systemInstruction: string, chatHistory: any[], userMessage: string): Promise<string> {
   const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [...chatHistory, { role: 'user', parts: [{ text: userMessage }] }],
    config: { 
      systemInstruction, 
      temperature: 0.1 
    }
  });
  return response.text || '';
}
