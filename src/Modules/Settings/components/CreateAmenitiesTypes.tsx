/* eslint-disable @typescript-eslint/no-explicit-any */
/*
@file CreateExpenseHead.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
import { Form, Row } from "antd";
import { FormCommonInput } from "../../../common/Input/FromInput";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useCreateAmenitesTypeMutation } from "../api/AmentiesEndPoints";

const CreateAmenitiesTypes = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [createAmenitiesTypes, { isLoading, isSuccess }] =
    useCreateAmenitesTypeMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // navigate(`/expense/expense-head-list`);
      cardhandleCancel();
    }
  }, [form, isSuccess]);
  const onFinish = (values: any) => {
    createAmenitiesTypes(values);
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
            name="room_amenities"
            label="Amenities Types"
            placeholder="Enter Amenities Types"
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

export default CreateAmenitiesTypes;
