import { useCallback } from 'react';

export function useVoiceSynthesis() {
  const speak = useCallback((text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      
      // Strip basic markdown formatting for better reading
      const cleanText = text.replace(/[*_#\[\]]/g, '').replace(/https?:\/\/[^\s]+/g, 'link');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95; // Slightly slower for clarity
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { speak };
}
