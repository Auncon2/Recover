import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

import { useUpdateDepartmentTypesMutation } from "../api/DepartmentEndPoints";

interface IupdateDepartmentTypes {
  department_name: string;
}
const UpdateDepartmentTypes = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { id, department_name, status } = updateData || {};
  const [updateBedTypes] = useUpdateDepartmentTypesMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("name", department_name);
      form.setFieldValue("status", status);
    }
  }, [form, department_name, updateData]);

  const onSubmit: SubmitHandler<IupdateDepartmentTypes> = async (data) => {
    await updateBedTypes({ id, data });
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="upate Department Types"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item label="Update Department Types " name="name">
            <Input type="text" placeholder="Enter Department Types " />
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
    </>
  );
};

export default UpdateDepartmentTypes;
