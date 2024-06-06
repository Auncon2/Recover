import { Form, Row } from "antd";
import { FormCommonInput } from "../../../common/Input/FromInput";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { useEffect } from "react";
import { useCreateRoomTypeMutation } from "../api/RoomTypesEndPoint";

const CreateRoomTypes = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [createRoomTypes, { isLoading, isSuccess }] =
    useCreateRoomTypeMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // navigate(`/expense/expense-head-list`);
      cardhandleCancel();
    }
  }, [form, isSuccess]);
  const onFinish = (values: any) => {
    createRoomTypes(values);
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
            name="room_type"
            label="Room Types"
            placeholder="Enter Room Types"
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

export default CreateRoomTypes;
