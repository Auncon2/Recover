/*
Create Account
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Col, Input, Row, Button } from "antd";
import { useEffect } from "react";
import {
  useCreateHotelRestaurentMutation,
  useGetAllHotelRestaurentPermissionlistQuery,
} from "../api/CreateRestaurentEndPoints";
import { SendOutlined } from "@ant-design/icons";
interface CreateRestaurentFormData {
  name: string;
  res_email: string;
  admin_name: string;
  permission: number[];
  phone: string;
  email: string;
  password: string;
}
const CreateRestaurent = ({ onClose }: any) => {
  const [form] = Form.useForm();
  const [createRestaurent, { isSuccess, isLoading }] =
    useCreateHotelRestaurentMutation();
  const { data: restaurentPermissionList } =
    useGetAllHotelRestaurentPermissionlistQuery();
  console.log("restaurentPermissionList", restaurentPermissionList?.data);

  const permissionIds = restaurentPermissionList?.data?.map(
    (permission: { id: any }) => permission.id
  );

  console.log("Permission IDs:", permissionIds); // This will log the array of permission IDs
  const onFinish = (values: CreateRestaurentFormData) => {
    createRestaurent({
      name: values.name,
      res_email: values.res_email,
      admin_name: values.admin_name,
      // permission: "[1]",
      phone: values.phone,
      email: values.email,
      password: values.password,
      permission: permissionIds,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();

      onClose();
    }
  }, [form, isSuccess]);
  //   useEffect(() => {
  //     if (form) {
  //       form.setFieldsValue({
  //         opening_balance: 0,
  //       });
  //     }
  //   }, [form]);
  return (
    <>
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Row align={"middle"} gutter={[20, 16]}>
          {/* Name */}
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Form.Item
              name="name"
              label="Restaurant Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Restaurant Name",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Enter Your Restaurant Name" />
            </Form.Item>
          </Col>
          {/* res_email */}
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Form.Item
              name="res_email"
              label="Restaurant Email"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input  Email",
              //     whitespace: true,
              //   },
              // ]}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },

                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter Restaurant Email" />
            </Form.Item>
          </Col>

          {/* Phone */}
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Form.Item
              name="phone"
              label="Restaurant Phone"
              rules={[
                {
                  required: true,
                  message: "Please input your Restaurant Phone",
                  whitespace: true,
                },
              ]}
            >
              <Input type="number" placeholder="Enter Your Restaurant Phone" />
            </Form.Item>
          </Col>
          {/* Admin Name */}
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Form.Item
              name="admin_name"
              label="Admin Name"
              rules={[
                {
                  required: true,
                  message: "Please input Admin Name",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Enter Your Admin Name" />
            </Form.Item>
          </Col>
          {/* email */}
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Form.Item
              name="email"
              label="Admin Email"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input  Email",
              //     whitespace: true,
              //   },
              // ]}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },

                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter Admin Email" />
            </Form.Item>
          </Col>

          {/* password */}
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your Password",
                  whitespace: true,
                },
              ]}
            >
              <Input.Password placeholder="Enter Your Password" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Button
            htmlType="submit"
            loading={isLoading}
            icon={<SendOutlined />}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "100%",
            }}
          >
            Create Restaurant
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default CreateRestaurent;
