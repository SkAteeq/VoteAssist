export interface UserContext {
  age?: number;
  isCitizen?: boolean;
  hasValidId?: boolean;
  state?: string;
  pinCode?: string;
}

export function checkEligibility(user: UserContext): boolean {
  if (user.age === undefined || user.isCitizen === undefined || user.hasValidId === undefined) {
    return false;
  }
  return user.age >= 18 && user.isCitizen && user.hasValidId;
}
