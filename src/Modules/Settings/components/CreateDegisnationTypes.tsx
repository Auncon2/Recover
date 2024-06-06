import { Form, Row } from "antd";
import { FormCommonInput } from "../../../common/Input/FromInput";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import { useCreateDegisnationTypeMutation } from "../api/DegisnationEndPoints";
const CreateDegisnationTypes = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [createDegisnation, { isLoading, isSuccess }] =
    useCreateDegisnationTypeMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // navigate(`/expense/expense-head-list`);
      cardhandleCancel();
    }
  }, [form, isSuccess]);
  const onFinish = (values: any) => {
    createDegisnation(values);
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
            label="Designation Types"
            placeholder="Enter Designation Types"
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

export default CreateDegisnationTypes;
