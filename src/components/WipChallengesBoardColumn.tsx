/** @jsx jsx */

import React from "react";
import { jsx } from "@emotion/core";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IWipChallenge } from "../interfaces/IWipChallenge";
import {
  boardColumnStyle,
  boardItemStyle,
} from "../styles/components/Board";
interface IProps {
  title: string;
  droppableId: string;
  items: IWipChallenge[];
}

export default function WipChallengesBoardColumn({ droppableId, items, title }: IProps) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          css={boardColumnStyle}
          ref={provided.innerRef}>
          <h2>{title}</h2>
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={`${droppableId}_${item.id}`}
              index={index}>
              {(provided, snapshot) => (
                <div
                  css={boardItemStyle}
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
