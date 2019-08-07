import React from "react";
import { boardItemStyle } from "../styles/components/Board";
import ChallengeModal from "./ChallengeModal";
import { IChallengeItem } from "../interfaces/IChallenge";

interface IProps {
  item: IChallengeItem;
}

const ChallengesBoardItem = React.forwardRef(({ item, ...rest }: IProps, ref: React.Ref<HTMLDivElement>) => (
  <div
    className={boardItemStyle}
    ref={ref}
    {...rest}>
    {item.title}
    <ChallengeModal challenge={item} />
  </div>
));

export default ChallengesBoardItem;
