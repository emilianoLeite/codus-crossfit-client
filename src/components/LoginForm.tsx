import React from "react";
import { Button, Card, Input, Icon } from "antd";

interface IProps {
  onSubmit: (formInputs: ILoginForm) => void;
}

export interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm: React.FunctionComponent<IProps> = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Card title="Login" style={{ width: 300 }}>
      <form onSubmit={(e) => { e.preventDefault(); props.onSubmit({ email, password }); }}>
        <div>
          <label style={{display: "none" }} htmlFor="email">Email</label>
          <Input
            name="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
            placeholder="Email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </div>

        <div>
          <label style={{display: "none" }} htmlFor="password">Password</label>
          <Input
            name="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }}
            type="password"
            placeholder="Password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </div>

        <div style={{ float: "right", marginTop: "5px" }}>
          <Button type="primary" htmlType="submit">Login</Button>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
