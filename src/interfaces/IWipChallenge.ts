export interface IWipChallenge {
  id: string;
  userEmail: string;
  status: ChallengeStatus;
}

export enum ChallengeStatus {
  DOING = "DOING",
  DONE = "DONE"
}


export const isDoing = ({ status }: IWipChallenge) => status === ChallengeStatus.DOING;
export const isDone = ({ status }: IWipChallenge) => status === ChallengeStatus.DONE;
