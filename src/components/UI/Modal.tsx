import React from "react";
import { Modal, Button } from "antd";

type MouseClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type MouseClickHandler = (e: MouseClickEvent) => void; 

export interface UIModalBehaviorProps {
  handleOk?: MouseClickHandler;
  handleCancel?: MouseClickHandler;
};

export interface UIModalProps extends UIModalBehaviorProps {
  title: string;
  children?: React.ReactNode;
};

const UIModal: React.FunctionComponent<UIModalProps> = ({ children, handleCancel, handleOk, title }) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const onOk = (e: MouseClickEvent) => {
    handleOk && handleOk(e);
    setVisible(false);
  };

  const onCancel = (e: MouseClickEvent) => {
    handleCancel && handleCancel(e);
    setVisible(false);
  };

  return (
    <React.Fragment>
      <Button shape="circle-outline" icon="eye" onClick={showModal} style={{marginLeft: "3px"}} />
      <Modal
        title={title}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        {children}
      </Modal>
    </React.Fragment>
  );
};

export default UIModal;
