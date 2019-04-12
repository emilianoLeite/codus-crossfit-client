import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IChallenge } from "../interfaces/IChallenge";
import { IWipChallenge } from "../interfaces/IWipChallenge";

interface IProps {
  droppableId: string;
  items: IChallenge[] | IWipChallenge[];
}

interface IDroppableItem {
  text: string;
  entity: {
    name: string;
    id: string;
  };
}

function entitiesToList(list: (IWipChallenge | IChallenge)[]): IDroppableItem[] {
  return list.map((item: IWipChallenge | IChallenge): IDroppableItem => {
    const wipChallenge = (item as IWipChallenge);
    const challenge = (item as IChallenge);
    const isWipChallenge = !!(!challenge.title && wipChallenge.status && wipChallenge.userEmail);

    return {
      text: isWipChallenge ? wipChallenge.userEmail : challenge.title,
      entity: {
        name: isWipChallenge ? "wipChallenge" : "challenge",
        id: item.id || ""
      }
    };
  });
};


export default function WipChallengesBoardColumn(props: IProps) {

  return (
    <Droppable droppableId={props.droppableId}>
      {(provided, snapshot) => (
        <div
          className="board-column"
          ref={provided.innerRef}>
          {entitiesToList(props.items).map((item, index) => (
            <Draggable
              key={item.entity.name + item.entity.id}
              draggableId={item.entity.name + item.entity.id}
              index={index}>
              {(provided, snapshot) => (
                <div
                  className="board-item"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  {item.text}
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
