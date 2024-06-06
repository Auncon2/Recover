import { Button, Form, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import {
  FormCommonInput,
  FormSelectInput,
} from "../../../../common/Input/FromInput";
import { useUpdateCategoryMutation } from "../api/CategoryEndPoints";

interface IUpdateIngredients {
  name: string;
  measurement: string;
}

const CategoryUpdateModal = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { id, name, status } = updateData || {};

  const [updateBedTypes] = useUpdateCategoryMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("name", name);
      form.setFieldValue("status", status === 0 ? "Unavailable" : "Available");
    }
  }, [form, status, name, updateData]);

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
          name="upate Category"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <FormCommonInput
            name="name"
            label="Category Name"
            placeholder="Enter Category Name"
            style={{ width: "100%" }}
          />
          <FormSelectInput
            name="status"
            label="Category Status"
            placeholder="Enter Category Status"
            style={{ width: "475px" }}
            data={[
              { name: "Unavailable", value: "0" },
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

export default CategoryUpdateModal;
