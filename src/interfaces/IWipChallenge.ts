export interface IWipChallenge {
  id: string;
  userEmail: string;
  status: ChallengeStatus;
}

export enum ChallengeStatus {
  DOING = "DOING",
  DONE = "DONE"
}

