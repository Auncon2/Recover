/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// @Author Istiak Ahmed<istiak.m360ict@gmail.com>

import { useEffect } from "react";
import { Form, Row, Col, Select, Input, Button, Upload } from "antd";
import { useCreateAdminRevservationMutation } from "../api/AdminEndPoint";
// import { FormFileInput } from "../../../common/Input/FromInput";
import { useGetCommonRoleQuery } from "../../../app/fromItemCommon/CommonEndPoint";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";

const CreateAdmin = () => {
  const [createAdmin, { isSuccess }] = useCreateAdminRevservationMutation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data: roleData } = useGetCommonRoleQuery();
  const roleOptions = roleData?.data || [];

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(setCommonModal());
    }
  }, [isSuccess, form]);

  const validateMobileNumber = (_: any, value: any) => {
    if (value && value.length > 11) {
      return Promise.reject("Mobile number cannot be more than 11 digits");
    } else {
      return Promise.resolve();
    }
  };

  const onFinish = (values: any) => {
    console.log("values", values);
    const formData = new FormData();
    const { avatar, ...all } = values;
    // for (const key in values) {
    //   if (key === "avatar") {
    //     formData.append(key, values[key]?.[0]?.originFileObj);
    //   } else {
    //     formData.append(key, values[key]);
    //   }
    // }
    for (const key in all) {
      if (all[key] !== undefined) {
        formData.append(key, all[key]);
      }
    }
    if (avatar?.file?.originFileObj && avatar !== String) {
      formData.append("logo", avatar?.file?.originFileObj);
    }

    console.table(Object.fromEntries(formData));
    createAdmin(formData);
  };

  return (
    <>
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Row align="middle" gutter={[20, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="name"
              rules={[{ required: true }]}
              label="Name"
              required
            >
              <Input placeholder="Name" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="email"
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
              label="Email"
              required
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
                { validator: validateMobileNumber },
              ]}
            >
              <Input type="number" placeholder="Phone" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Select Role"
              name="role"
              rules={[{ required: true, message: "Select a role" }]}
            >
              <Select placeholder="Select Role">
                {roleOptions.map((role: any) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          {/* <FormFileInput name="avatar" label="Admin photo" picture="picture" /> */}
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Admin photo"
              name="avatar"
              // rules={[
              //   { required: true, message: "Please input your password!" },
              // ]}
            >
              <Upload maxCount={1}>
                <Button icon={<UploadOutlined />} style={{ width: "330px" }}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: "end" }}>
          {/* <SubmitButton loading={isLoading} /> */}
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            Create Admin
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateAdmin;
