import React from "react";
import { IChallengeItemList } from "../interfaces/IChallenge";
import RelativeLink from "./RelativeLink";
import { List, Button, Icon } from "antd";

interface IProps {
  challenges: IChallengeItemList[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const ChallengeList: React.FunctionComponent<IProps> = ({ challenges, header, footer }) => {
  return <List
    header={header}
    footer={footer}
    bordered={true}
    dataSource={challenges}
    renderItem={(challenge: IChallengeItemList) => (
      <List.Item>
        {challenge.title}
        <Button shape="circle" style={{ marginLeft: "5px" }}>
          <RelativeLink to={`/${challenge.id}/edit`}>
            <Icon type="edit" />
          </RelativeLink>
        </Button>
      </List.Item>
    )}
  />;
};

export default ChallengeList;
