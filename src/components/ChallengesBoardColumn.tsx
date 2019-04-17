import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IChallenge } from "../interfaces/IChallenge";

interface IProps {
  droppableId: string;
  items: IChallenge[];
}

export default function ChallengesBoardDoingColumn({ items }: IProps) {
  return (
    <Droppable droppableId="todoChallenges">
      {(provided, snapshot) => (
        <div
          className="board-column"
          ref={provided.innerRef}>
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}>
              {(provided, snapshot) => (
                <div
                  className="board-item"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  {item.title}
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
