/** @jsx jsx */

import React from "react";
import { jsx } from "@emotion/core";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IChallenge } from "../interfaces/IChallenge";
import {
  boardColumnStyle,
  boardItemStyle,
} from "../styles/components/Board";


interface IProps {
  items: IChallenge[];
}

export default function ChallengesBoardColumn({ items }: IProps) {
  return (
    <Droppable droppableId="todoChallenges">
      {(provided, snapshot) => (
        <div
          css={boardColumnStyle}
          ref={provided.innerRef}>
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={`todoChallenges_${item.id}`}
              index={index}>
              {(provided, snapshot) => (
                <div
                  css={boardItemStyle}
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
