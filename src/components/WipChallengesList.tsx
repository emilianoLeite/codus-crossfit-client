import React, { useState } from "react";
import { IWipChallenge } from "../interfaces/IWipChallenge";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";


// a little function to help us with reordering the result
const reorder = (list: IWipChallenge[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function WipChallengesList({ wipChallenges }: { wipChallenges: IWipChallenge[] }) {
  const [items, setItems] = useState(wipChallenges);

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderdItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderdItems);
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.userEmail}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
