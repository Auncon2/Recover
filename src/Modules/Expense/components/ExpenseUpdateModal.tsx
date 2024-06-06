import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useUpdateExpenseMutation } from "../api/ExpenseEndPoint";

interface IUpdateExpense {
  name: string;
}

const ExpenseUpdateModal = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { id, name } = updateData || {};
  const [updateExpense] = useUpdateExpenseMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("name", name);
    }
  }, [form, name, updateData]);

  const onSubmit: SubmitHandler<IUpdateExpense> = async (data) => {
    await updateExpense({ id, data });
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
          name="upate Expense"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Update Expense title"
            name="name"
            rules={[{ required: true, message: "Please input expense name!" }]}
          >
            <Input type="text" placeholder="Enter Expense Head" />
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

export default ExpenseUpdateModal;
