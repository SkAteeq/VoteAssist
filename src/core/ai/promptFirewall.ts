const BLOCKED_TERMS = [
  'vote for', 'best party', 'who is better', 'election prediction', 
  'ignore previous', 'who should i vote', 'which candidate', 'support party'
];

export const promptFirewall = {
  isSafe: (input: string): boolean => {
    const normalizedInput = input.toLowerCase();
    return !BLOCKED_TERMS.some(term => normalizedInput.includes(term));
  }
};
