import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IChallengeItem } from "../interfaces/IChallenge";
import {
  boardColumnStyle,
  boardItemTitle,
} from "../styles/components/Board";
import ChallengesBoardItem from "./ChallengeBoardItem";


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
                <ChallengesBoardItem
                  item={item}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
