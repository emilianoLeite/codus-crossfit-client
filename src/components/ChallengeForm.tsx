import React, { FormEvent } from "react";
import { IChallenge } from "../interfaces/IChallenge";

interface IProps {
  challenge?: IChallenge;
  onSubmit: (challenge: IChallenge) => void;
}

const ChallengeForm: React.FunctionComponent<IProps> = ({ challenge, onSubmit }: IProps) => {
  const defaultChallenge = challenge || { title: "", description: "" };
  const [title, setTitle] = React.useState(defaultChallenge.title);
  const [description, setDescription] = React.useState(defaultChallenge.description);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
          <legend>
            {
            defaultChallenge.id ? "Edit Challenge" : "Create Challenge"
            }
        </legend>

        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
};

export default ChallengeForm;
