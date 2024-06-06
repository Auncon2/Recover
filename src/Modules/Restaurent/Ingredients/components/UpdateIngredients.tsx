import { Button, Form, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useUpdateIngredientsMutation } from "../api/IngredientsEndPoints";
import {
  FormCommonInput,
  FormUnitSelectInput,
} from "../../../../common/Input/FromInput";

interface IUpdateIngredients {
  name: string;
  measurement: string;
}

const IngredientsUpdateModal = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { id, name, measurement } = updateData || {};

  const [updateBedTypes] = useUpdateIngredientsMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("name", name);
      form.setFieldValue("measurement", measurement);
    }
  }, [form, measurement, name, updateData]);

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
          name="upate Ingredients"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <FormCommonInput
            name="name"
            label="Ingredient Name"
            placeholder="Enter Ingredient Name"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          />
          <FormUnitSelectInput
            name="measurement"
            label="Ingredient Unit"
            placeholder="Enter Ingredient Unit"
            rules={[{ required: true }]}
            style={{ width: "475px" }}
          />
          <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            <Button
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

export default IngredientsUpdateModal;
