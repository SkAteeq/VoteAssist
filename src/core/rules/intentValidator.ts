export type IntentInfo = 'CHECK_ELIGIBILITY' | 'REGISTER' | 'FIND_BOOTH' | 'TIMELINE' | 'GENERAL';

export function validateIntent(query: string): IntentInfo {
  const lower = query.toLowerCase();
  if (lower.includes('eligible') || lower.includes('can i vote') || lower.includes('am i old enough') || lower.includes('my age')) return 'CHECK_ELIGIBILITY';
  if (lower.includes('register') || lower.includes('apply') || lower.includes('form 6')) return 'REGISTER';
  if (lower.includes('booth') || lower.includes('where to vote') || lower.includes('location')) return 'FIND_BOOTH';
  if (lower.includes('date') || lower.includes('when') || lower.includes('timeline') || lower.includes('deadline')) return 'TIMELINE';
  return 'GENERAL';
}
