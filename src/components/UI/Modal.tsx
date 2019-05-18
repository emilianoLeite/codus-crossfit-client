import React from "react";
import { Modal, Icon } from "antd";

type MouseClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type MouseClickHandler = (e: MouseClickEvent) => void; 

export interface UIModalProps {
  handleOk?: MouseClickHandler;
  handleCancel?: MouseClickHandler;
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
      <Icon type="eye" onClick={showModal} />
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
