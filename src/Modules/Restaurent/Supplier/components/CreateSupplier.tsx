/* eslint-disable @typescript-eslint/no-explicit-any */
/*
@file CreateExpenseHead.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
import { Form, Row } from "antd";
import { useEffect } from "react";
import SubmitButton from "../../../../components/SubmitButton/SubmitButton";
import { FormCommonInput } from "../../../../common/Input/FromInput";
import { useCreateSupplierMutation } from "../api/SupplierEndPoints";

const CreateSupplier = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [createSupplier, { isLoading, isSuccess }] =
    useCreateSupplierMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // navigate(`/expense/expense-head-list`);
      cardhandleCancel();
    }
  }, [form, isSuccess]);
  const onFinish = (values: any) => {
    createSupplier(values);
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
            label="Supplier Name"
            placeholder="Enter Supplier Name"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          />
          <FormCommonInput
            name="phone"
            label="Supplier Phone"
            placeholder="Enter Supplier Phone"
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

export default CreateSupplier;
