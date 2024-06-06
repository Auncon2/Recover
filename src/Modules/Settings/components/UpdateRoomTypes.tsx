import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useUpdateRoomtypesMutation } from "../api/RoomTypesEndPoint";

interface IUpdateRoomTypes {
  name: string;
}

const RoomTypesUpdateModal = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { id, room_type, status } = updateData || {};
  const [updateRoomTypes] = useUpdateRoomtypesMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("room_type", room_type);
      form.setFieldValue("status", status);
    }
  }, [form, room_type, updateData]);

  const onSubmit: SubmitHandler<IUpdateRoomTypes> = async (data) => {
    await updateRoomTypes({ id, data });
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="upate Room Types"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item label="Update Room Types title" name="room_type">
            <Input type="text" placeholder="Enter Room Types " />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              options={[
                { value: 1, label: "Available" },
                { value: 0, label: "Unavailable" },
              ]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            {/* <Button
              className="text-bold bg-green-500 hover:bg-blue-700 text-white w-36"
              htmlType="submit"
            >
              Submit
            </Button> */}
            <Button
              // icon={<FaArrowLeft />}
              htmlType="submit"
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                // width: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomTypesUpdateModal;
