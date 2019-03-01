import React from "react";

interface IChallenge {
  id: string;
  title: string;
  description: string;
}

const ChallengeList: React.FunctionComponent<{ challenges: IChallenge[] }> = ({ challenges }) => {
  return (
    <ul>
      {challenges.map((challenge) => <li key={challenge.id}>{challenge.title}</li>)}
    </ul>
  );
};

export default ChallengeList;
