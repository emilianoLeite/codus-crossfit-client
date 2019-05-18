import React from "react";
import { Button } from "antd";

interface IProps {
  onSubmit: (formInputs: ILoginForm) => void;
}

export interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm: React.FunctionComponent<IProps> = (props: IProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <form onSubmit={(e) => { e.preventDefault(); props.onSubmit({ email, password }); }}>
      <label htmlFor="email"> Email </label>
      <input
        name="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); }}
      />
      <label htmlFor="password"> Password </label>
      <input
        name="password"
        value={password}
        type="password"
        onChange={(e) => { setPassword(e.target.value); }}
      />
      <Button type="primary" htmlType="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
