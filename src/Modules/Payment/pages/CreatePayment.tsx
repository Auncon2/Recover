/* eslint-disable @typescript-eslint/no-explicit-any */
/*
@file CreateExpenseHead.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
import { Form, Row } from "antd";
import { FormCommonInput } from "../../../common/Input/FromInput";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { useEffect } from "react";
import { useCreatePaymentMethodMutation } from "../api/PaymentMethodEndPoint";
// import { useNavigate } from "react-router-dom";

const CreatePayment = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [createPayment, { isLoading, isSuccess }] =
    useCreatePaymentMethodMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // navigate(`/expense/expense-head-list`);
      cardhandleCancel();
    }
  }, [cardhandleCancel, form, isSuccess]);
  const onFinish = (values: any) => {
    createPayment(values);
  };

  return (
    <>
      {/* <Card
        style={{
          boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
          marginBottom: "1rem",
        }}
        title={
          <Typography.Title level={5}>Create Expense Head</Typography.Title>
        }
      > */}
      {/* <Row
        align={"middle"}
        justify={"space-between"}
        style={{ marginBottom: "1rem" }}
      >
        <Typography.Title level={5}>Create Expense Title</Typography.Title>
      </Row> */}
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
            label="Payment Method"
            placeholder="Enter Payment Method"
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

export default CreatePayment;
