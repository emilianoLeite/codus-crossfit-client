
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { IWipChallengeItem } from "../interfaces/IWipChallenge";
import {
  boardColumnStyle,
  boardItemStyle,
  boardItemTitle,
} from "../styles/components/Board";
import ChallengeModal from "./ChallengeModal";

interface IProps {
  title: string;
  droppableId: string;
  items: IWipChallengeItem[];
}

export default function WipChallengesBoardColumn({ droppableId, items, title }: IProps) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          className={boardColumnStyle}
          ref={provided.innerRef}>
          <h2 className={boardItemTitle}>{title}</h2>
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={`${droppableId}_${item.id}`}
              index={index}>
              {(provided, snapshot) => (
                <div
                  className={boardItemStyle}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  { (() => {
                    const {challenge} = item;
                    if (challenge) {
                      return (
                        <React.Fragment>
                          {challenge.title}
                          <small style={{ display: "block", textAlign: "right" }}>
                            {item.userEmail.replace("@codus.com.br", "")}
                          </small>
                          <ChallengeModal challenge={challenge} />
                        </React.Fragment>
                      );
                    }
                    return null;
                  })() }
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
