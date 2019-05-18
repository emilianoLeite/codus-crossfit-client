import React from "react";
import { IWipChallenge } from "../interfaces/IWipChallenge";
import UIModal, { UIModalProps } from "./UI/Modal";

interface IProps extends UIModalProps {
  challenge: IWipChallenge;
};

const ChallengeModal: React.FunctionComponent<IProps> = ({ challenge, children, ...rest }) => {
  return (
    <UIModal title={challenge.id} {...rest}>
      {challenge.userEmail}
    </UIModal>
  );
};

export default ChallengeModal;
