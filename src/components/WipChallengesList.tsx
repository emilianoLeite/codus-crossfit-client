import React from "react";

interface IWipChallenge {
  id: string;
  userEmail: string;
}

export default function WipChallengesList({ wipChallenges }: { wipChallenges: IWipChallenge[] }) {
  return (
    <React.Fragment>
      {
        wipChallenges.map(({ id, userEmail }) => (
          <div key={id}>
            <p>{userEmail}</p>
          </div>
        ))
      }
    </React.Fragment>
  );
}
