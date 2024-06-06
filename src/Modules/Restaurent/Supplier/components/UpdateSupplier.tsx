import { Button, Form, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import {
  FormCommonInput,
  FormSelectInput,
} from "../../../../common/Input/FromInput";
import { useUpdateSupplierMutation } from "../api/SupplierEndPoints";

interface IUpdateIngredients {
  name: string;
  phone: string;
  status: string;
}

const SupplierUpdateModal = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { id, name, phone, status } = updateData || {};

  const [updateBedTypes] = useUpdateSupplierMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("name", name);
      form.setFieldValue("phone", phone);
      form.setFieldValue("status", status === 0 ? "Unavailable" : "Available");
    }
  }, [form, phone, name, updateData, status]);

  const onSubmit: SubmitHandler<IUpdateIngredients> = async (data) => {
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
          name="upate Supplier"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <FormCommonInput
            name="name"
            label="Supplier Name"
            placeholder="Enter Supplier Name"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          />
          <FormCommonInput
            name="phone"
            label="phone"
            placeholder="Enter phone"
            rules={[{ required: true }]}
            style={{ width: "475px" }}
          />

          <FormSelectInput
            name="status"
            label="status"
            placeholder="Select Status"
            style={{ width: "475px" }}
            data={[
              { name: "unavailable", value: "0" },
              { name: "Available", value: "1" },
            ]}
          />

          <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            <Button
              htmlType="submit"
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
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

export default SupplierUpdateModal;
