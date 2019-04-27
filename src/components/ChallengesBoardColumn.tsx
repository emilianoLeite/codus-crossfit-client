import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IChallenge } from "../interfaces/IChallenge";

interface IProps {
  items: IChallenge[];
}

export default function ChallengesBoardColumn({ items }: IProps) {
  return (
    <Droppable droppableId="todoChallenges">
      {(provided, snapshot) => (
        <div
          className="board-column"
          ref={provided.innerRef}>
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={`todoChallenges_${item.id}`}
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
