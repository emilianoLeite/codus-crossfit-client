import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IChallengeItem } from "../interfaces/IChallenge";
import {
  boardColumnStyle,
  boardItemStyle,
  boardItemTitle,
} from "../styles/components/Board";
import ChallengeModal from "./ChallengeModal";


interface IProps {
  title: string;
  items: IChallengeItem[];
}

export default function ChallengesBoardColumn({ title, items }: IProps) {
  return (
    <Droppable droppableId="todoChallenges">
      {(provided, snapshot) => (
        <div
          className={boardColumnStyle}
          ref={provided.innerRef}>
          <h2 className={boardItemTitle}>{title}</h2>
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={`todoChallenges_${item.id}`}
              index={index}>
              {(provided, snapshot) => (
                <div
                  className={boardItemStyle}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  {item.title}
                  <ChallengeModal challenge={item} />
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
