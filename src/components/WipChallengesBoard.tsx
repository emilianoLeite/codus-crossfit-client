
import React from "react";
import { DraggableLocation, DropResult, DragDropContext } from "react-beautiful-dnd";

import { isDoing, isDone, IWipChallengeItem } from "../interfaces/IWipChallenge";
import WipChallengesBoardColumn from "./WipChallengesBoardColumn";
import { boardStyle } from "../styles/components/Board";
import { MutationFn } from "react-apollo";
import { IChallengeItem } from "../interfaces/IChallenge";
import ChallengesBoardColumn from "./ChallengesBoardColumn";

interface IProps {
  challenges: IChallengeItem[];
  wipChallenges: IWipChallengeItem[];
  mutations: {
    createWipChallengeMutation: MutationFn;
    moveWipChallengeMutation: MutationFn;
  };
}

const move = (sourceList: IWipChallengeItem[], destinationList: IWipChallengeItem[], source: DraggableLocation, destination: DraggableLocation) => {

  const newSourceList = Array.from(sourceList);

  const newDestinationList = Array.from(destinationList);
  const [removed] = newSourceList.splice(source.index, 1);

  newDestinationList.splice(destination.index, 0, removed);

  return { newSourceList, newDestinationList };
};

export default function WipChallengesBoard({ challenges, wipChallenges, mutations }: IProps) {
  const doingWipChallenges = (wipChallenges as IWipChallengeItem[]).filter(isDoing);
  const doneWipChallenges = (wipChallenges as IWipChallengeItem[]).filter(isDone);

  const [doingItems, setDoingItems] = React.useState(doingWipChallenges);
  const [doneItems, setDoneItems] = React.useState(doneWipChallenges);

  function stateMapping(droppableId: string): IWipChallengeItem[] {
    switch (droppableId) {
      case "doingWipChallenges": return doingItems;
      case "doneWipChallenges": return doneItems;
      default: return [];
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) { return; }

    const sourceList = stateMapping(source.droppableId);
    const destinationList = stateMapping(destination.droppableId);
    const createWipChallenge = async (challengeId: string, email: string) => {
      const result = await mutations.createWipChallengeMutation(
        { variables: { challengeId, email } }
      );

      if (!result) { throw new Error("WipChallenge could not be created"); }
      return doingItems.concat(result.data.createWipChallenge);
    };
    const moveItemsTo = async (status: string) => {
      const result = await mutations.moveWipChallengeMutation(
        { variables: { id: sourceList[source.index].id, status } }
      );

      if (!result) { throw new Error("WipChallenge could not be moved"); }
      return move(sourceList, destinationList, source, destination);
    };

    if (source.droppableId === "todoChallenges" && destination.droppableId === "doingWipChallenges") {
      const email = window.prompt("Please inform your email: ");

      if (email) {
        createWipChallenge(challenges[source.index].id, email)
          .then(setDoingItems)
          .catch(console.error);
      }
    } else if (source.droppableId === "doingWipChallenges" && destination.droppableId === "doneWipChallenges") {
      moveItemsTo("DONE")
        .then(({ newSourceList, newDestinationList }) => {
          setDoingItems(newSourceList);
          setDoneItems(newDestinationList);
        })
        .catch(console.error);

    } else if (source.droppableId === "doneWipChallenges" && destination.droppableId === "doingWipChallenges") {
      moveItemsTo("DOING")
        .then(({ newSourceList, newDestinationList }) => {
          setDoneItems(newSourceList);
          setDoingItems(newDestinationList);
        })
        .catch(console.error);
    }
  };

  return (
    <div className={boardStyle}>
      <DragDropContext onDragEnd={onDragEnd}>
        <ChallengesBoardColumn title="TODO" items={challenges} />
        <WipChallengesBoardColumn droppableId="doingWipChallenges" title="Doing" items={doingItems} />
        <WipChallengesBoardColumn droppableId="doneWipChallenges" title="Done" items={doneItems} />
      </DragDropContext>
    </div>
  );
}
