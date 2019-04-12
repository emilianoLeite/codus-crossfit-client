import React from "react";
import { IWipChallenge, ChallengeStatus } from "../interfaces/IWipChallenge";
import { DraggableLocation, DropResult, DragDropContext } from "react-beautiful-dnd";
import WipChallengesBoardColumn from "./WipChallengesBoardColumn";
import "./WipChallengesBoard.css";

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) { return; }

    if (source.droppableId !== destination.droppableId) {
      const sourceList = stateMapping[source.droppableId];
      const destinationList = stateMapping[destination.droppableId];
      const [newDoingItens, newDoneItens] = move(sourceList, destinationList, source, destination);
      console.log(newDoingItens, newDoneItens);
      setDoingItens(newDoingItens);
      setDoneItens(newDoneItens);
    }
  };

  return (
    <div className="challenges-board">
      <DragDropContext onDragEnd={onDragEnd}>
        <WipChallengesBoardColumn droppableId="doingWipChallenges" items={doingItens} />
        <WipChallengesBoardColumn droppableId="doneWipChallenges" items={doneItens} />
      </DragDropContext>
    </div>
  );
}
