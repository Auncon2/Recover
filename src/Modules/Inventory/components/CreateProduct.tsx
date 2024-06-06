import { Modal } from "antd";
import React from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProduct: React.FC<Props> = React.memo(
  ({ open, setOpen }): JSX.Element => {
    return (
      <React.Fragment>
        <Modal
          title="Create Product"
          open={open}
          onOk={() => {
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          footer={null}
        >
          <p>...</p>
        </Modal>
      </React.Fragment>
    );
  }
);

export default CreateProduct;
