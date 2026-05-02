import { validateIntent, IntentInfo } from '../rules/intentValidator';
import { checkEligibility, UserContext } from '../rules/eligibility';
import { generateGeminiResponse } from './geminiClient';
import { promptFirewall } from './promptFirewall';

export type OrchestratorResponse = {
  type: 'text' | 'rule' | 'error' | 'map';
  content: string;
  meta?: any;
};

export async function processUserQuery(
  query: string, 
  userContext: UserContext, 
  chatHistory: any[], 
  systemInstruction: string
): Promise<OrchestratorResponse> {
  // 1. Security Layer: Prompt Firewall
  if (!promptFirewall.isSafe(query)) {
    return { 
      type: 'error', 
      content: 'I provide neutral guidance about the election process only. I cannot discuss specific parties, candidates, or provide political advice.' 
    };
  }

  // 2. Routing Layer: Intent Detection
  const intent: IntentInfo = validateIntent(query);

  // 3. Deterministic Layer (Rules Engine Fallbacks)
  if (intent === 'CHECK_ELIGIBILITY') {
    if (userContext.age !== undefined && userContext.isCitizen !== undefined && userContext.hasValidId !== undefined) {
      const isEligible = checkEligibility(userContext);
      return { 
        type: 'rule', 
        content: isEligible 
          ? 'Based on the details provided (Age >= 18, Indian citizen, valid ID), you are **eligible** to vote. Your next step is to register on the official ECI portal.' 
          : `Based on the details provided, you are **not currently eligible** to vote.\n\nCriteria missing: ${userContext.age < 18 ? 'Must be 18+' : ''} ${!userContext.isCitizen ? 'Must be Indian Citizen' : ''} ${!userContext.hasValidId ? 'Must have valid ID' : ''}`.trim()
      };
    } else {
      return {
         type: 'text',
         content: "To check your eligibility accurately, please confirm: \\n1. Are you 18 or older?\\n2. Are you an Indian citizen?\\n3. Do you have a valid ID and address proof?"
      }
    }
  }

  if (intent === 'FIND_BOOTH' && userContext.pinCode) {
    return { 
      type: 'map', 
      content: `Here is the polling booth coverage area for PIN CODE: **${userContext.pinCode}**. \n\nPlease verify your exact booth allocation using your Voter ID (EPIC number) on the official ECI portal.`,
      meta: { pinCode: userContext.pinCode }
    };
  } else if (intent === 'FIND_BOOTH') {
    return {
      type: 'text',
      content: "To help you find your polling booth, please provide your 6-digit PIN code."
    }
  }

  // 4. AI Generative Layer (Fallback for processes, timelines, explanations)
  const aiResponse = await generateGeminiResponse(systemInstruction, chatHistory, query);
  
  return { 
    type: 'text', 
    content: aiResponse || "I couldn't process that request. Please verify with official sources such as the Election Commission of India website." 
  };
}
