import React, { FormEvent } from "react";
import { Button, Input, Icon } from "antd";

import { IEditableChallenge } from "../interfaces/IChallenge";
import { formLabel } from "../styles/components/Form";

interface IProps {
  challenge?: IEditableChallenge;
  onSubmit: (challenge: IEditableChallenge) => void;
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

        <label className={formLabel} htmlFor="title">Title</label>
        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className={formLabel} htmlFor="description">Description</label>
        <Input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="primary" htmlType="submit" style={{marginTop: "10px"}}>
          <Icon type="check" />
          Submit
        </Button>
      </fieldset>
    </form>
  );
};

export default ChallengeForm;
