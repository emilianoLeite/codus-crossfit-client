import React from "react";
import { Menu, Icon } from "antd";
import { ClickParam } from "antd/lib/menu";
import { withRouter, RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps {
  rightContent: React.ReactNode;
}

const Navbar = ({ history, location, rightContent }: IProps) => {
  const handleClick = (e: ClickParam) => {
    history.push(`/${e.keyPath}`);
  };
  const selectedKeys = [
    location.pathname.replace("/", "")
  ];
  if (location.pathname === "/") {
    selectedKeys.push("wip_challenges");
  }

  return (
    <Menu onClick={handleClick} selectedKeys={selectedKeys} mode="horizontal">
      <Menu.Item key="challenges" >
        <Icon type="appstore" />
        Challenges
      </Menu.Item>
      <Menu.Item key="wip_challenges">
        <Icon type="project" />
        WIP Challenges
      </Menu.Item>

      { rightContent && <div style={{ float: "right", marginRight: "15px" }}>
        { rightContent }
      </div> }
    </Menu>
  );
};

export default withRouter(Navbar);
