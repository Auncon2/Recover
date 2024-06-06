/* eslint-disable @typescript-eslint/no-explicit-any */
/*
@file CreateExpenseHead.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
import { Col, Form, Input, Row } from "antd";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { useEffect } from "react";
import { useCreateHallAmenitesTypeMutation } from "../api/HallAmenitiesEndPoint";
import TextArea from "antd/es/input/TextArea";
// import { useNavigate } from "react-router-dom";

const CreateHallAmenities = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [createAmenitiesTypes, { isLoading, isSuccess }] =
    useCreateHallAmenitesTypeMutation();
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
      <Form form={form} onFinish={onFinish} layout="vertical" className=" py-5">
        <Row
          align={"middle"}
          justify={"start"}
          gutter={[20, 2]}
          style={{ width: "100%" }}
        >
          <Col xs={24} sm={24} md={10} lg={24}>
            <Form.Item
              label="Hall Amenities"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Enter your Hall Amenities",
                },
              ]}
            >
              <Input type="text" placeholder="Enter Hall Amenities" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={10} lg={24}>
            <Form.Item label="Hall Description" name="description">
              <TextArea rows={4} placeholder="Enter Description" />
            </Form.Item>
          </Col>
        </Row>

        <Row align={"middle"} justify="end">
          <SubmitButton loading={isLoading} />
        </Row>
      </Form>
      {/* </Card> */}
    </>
  );
};

export default CreateHallAmenities;
