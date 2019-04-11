import React from "react";
import { IWipChallenge, ChallengeStatus } from "../interfaces/IWipChallenge";
import { DraggableLocation, DropResult, DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const filterByDoing = ({ status }: IWipChallenge) => status === ChallengeStatus.DOING;
const filterByDone = ({ status }: IWipChallenge) => status === ChallengeStatus.DONE;
const move = (sourceList: IWipChallenge[], destinationList: IWipChallenge[], source: DraggableLocation, destination: DraggableLocation) => {

  const sourceClone = Array.from(sourceList);

  const destClone = Array.from(destinationList);
  const [removed] = sourceClone.splice(source.index, 1);

  destClone.splice(destination.index, 0, removed);

  return [sourceClone, destClone];
};

export default function WipChallengesBoard({ wipChallenges }: { wipChallenges: IWipChallenge[] }) {
  const doingWipChallenges = (wipChallenges as IWipChallenge[]).filter(filterByDoing);
  const doneWipChallenges = (wipChallenges as IWipChallenge[]).filter(filterByDone);

  const [doingItens, setDoingItens] = React.useState(doingWipChallenges);
  const [doneItens, setDoneItens] = React.useState(doneWipChallenges);

  const stateMapping: any = {
    doingWipChallenges: doingItens,
    doneWipChallenges: doneItens
  };
  console.log("doing", doingWipChallenges);
  console.log("done", doneWipChallenges);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) { return; }

    if (source.droppableId !== destination.droppableId) {
      const sourceList = stateMapping[source.droppableId];
      const destinationList = stateMapping[destination.droppableId];
      const [newDoingItens, newDoneItens] = move(sourceList, destinationList, source, destination);

      setDoingItens(newDoingItens);
      setDoneItens(newDoneItens);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="doingWipChallenges">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}>
            {doingItens.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}>
                {(provided, snapshot) => (
                  <div
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
      <Droppable droppableId="doneWipChallenges">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}>
            {doneItens.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}>
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
