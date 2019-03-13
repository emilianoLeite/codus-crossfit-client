import React from "react";
import { IChallenge } from "../interfaces/IChallenge";
import RelativeLink from "./RelativeLink";

const ChallengeList: React.FunctionComponent<{ challenges: IChallenge[] }> = ({ challenges }) => {
  return (
    <ul>
      {challenges.map((challenge) => {
        return (
          <li key={challenge.id}>
            <span>
              {challenge.title}
            </span>
            <RelativeLink to={`/${challenge.id}/edit`}>Edit Challenge</RelativeLink>
          </li>
        );
        })}
    </ul>
  );
};

export default ChallengeList;
