/* eslint-disable @typescript-eslint/no-explicit-any */
/*
@file CreateExpenseHead.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
import { Form, Row } from "antd";
import { useEffect } from "react";
import SubmitButton from "../../../../components/SubmitButton/SubmitButton";
import { FormCommonInput } from "../../../../common/Input/FromInput";
import { useCreateCategoryMutation } from "../api/CategoryEndPoints";

const CreateCategory = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [createCategory, { isLoading, isSuccess }] =
    useCreateCategoryMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // navigate(`/expense/expense-head-list`);
      cardhandleCancel();
    }
  }, [form, isSuccess]);
  const onFinish = (values: any) => {
    createCategory(values);
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        style={{ width: "100%" }}
      >
        <Row
          align={"middle"}
          // justify="end"
          gutter={[10, 16]}
          style={{ width: "100%" }}
        >
          <FormCommonInput
            name="name"
            label="Category Name"
            placeholder="Enter Category Name"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          />
        </Row>
        <Row align={"middle"} justify="end">
          <SubmitButton loading={isLoading} />
        </Row>
      </Form>
      {/* </Card> */}
    </>
  );
};

export default CreateCategory;
