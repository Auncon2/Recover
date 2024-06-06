/* eslint-disable @typescript-eslint/no-explicit-any */
/*
@file CreateExpenseHead.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
import { Form, Row } from "antd";
import { useEffect } from "react";
import { useCreateIngredientsMutation } from "../api/IngredientsEndPoints";
import SubmitButton from "../../../../components/SubmitButton/SubmitButton";
import {
  FormCommonInput,
  FormUnitSelectInput,
} from "../../../../common/Input/FromInput";

const CreateIngredients = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [createIngredients, { isLoading, isSuccess }] =
    useCreateIngredientsMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // navigate(`/expense/expense-head-list`);
      cardhandleCancel();
    }
  }, [form, isSuccess]);
  const onFinish = (values: any) => {
    createIngredients(values);
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
            label="Ingredient Name"
            placeholder="Enter Ingredient Name"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          />
          <FormUnitSelectInput
            required
            name="measurement"
            label="Ingredient Unit"
            placeholder="Enter Ingredient Unit"
            rules={[{ required: true }]}
            style={{ width: "450px" }}
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

export default CreateIngredients;
