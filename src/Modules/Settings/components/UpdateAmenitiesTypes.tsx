import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useUpdateAmenitiestypesMutation } from "../api/AmentiesEndPoints";

interface IUpdateAmenitiesTypes {
  room_amenities: string;
}

const AmenitiesTypesUpdateModal = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { id, room_amenities, status } = updateData || {};
  const [updateAmenitiesTypes] = useUpdateAmenitiestypesMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("room_amenities", room_amenities);
      form.setFieldValue("status", status);
    }
  }, [form, room_amenities, updateData]);

  const onSubmit: SubmitHandler<IUpdateAmenitiesTypes> = async (data) => {
    await updateAmenitiesTypes({ id, data });
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
          name="upate Amenities Types"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item label="Update Amenity" name="room_amenities">
            <Input type="text" placeholder="Enter Amenitie" />
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

export default AmenitiesTypesUpdateModal;
