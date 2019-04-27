import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IWipChallenge } from "../interfaces/IWipChallenge";
import {
  boardColumnStyle,
  boardItemStyle,
} from "../styles/components/Board";
interface IProps {
  droppableId: string;
  items: IWipChallenge[];
}

export default function WipChallengesBoardDoingColumn({ droppableId, items }: IProps) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          className={boardColumnStyle}
          ref={provided.innerRef}>
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
                  {item.userEmail}
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
