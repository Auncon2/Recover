import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useUpdateBedtypesMutation } from "../api/BedTypesEndPoints";

interface IUpdateBedTypes {
  bed_type: string;
}

const BedTypesUpdateModal = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { id, bed_type, status } = updateData || {};
  const [updateBedTypes] = useUpdateBedtypesMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("bed_type", bed_type);
      form.setFieldValue("status", status);
    }
  }, [form, bed_type, updateData]);

  const onSubmit: SubmitHandler<IUpdateBedTypes> = async (data) => {
    await updateBedTypes({ id, data });
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
          name="upate Bed Types"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item label="Update Bed Types title" name="bed_type">
            <Input type="text" placeholder="Enter Bed Types " />
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

export default BedTypesUpdateModal;
