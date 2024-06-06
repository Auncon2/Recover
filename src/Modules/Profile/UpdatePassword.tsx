import { Button, Col, Form, Input, Row, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useUpdatePasswordMutation } from "../../app/api/userApi/userApi";
import { SendOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../app/slice/modalSlice";

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [updatePassword, { isLoading, isSuccess, isError }] =
    useUpdatePasswordMutation();
  const dispatch = useDispatch();

  // Custom validation rule to check if old and new passwords are the same
  const validatePassword = (_: any, value: any) => {
    // Check if the password contains at least one special character
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    // Check if the password contains at least one capital letter
    const hasCapitalLetter = /[A-Z]/.test(value);

    // Check if the password contains at least one small letter
    const hasSmallLetter = /[a-z]/.test(value);

    // Check if the password contains at least one number
    const hasNumber = /[0-9]/.test(value);
    // Check if the password contains any spaces
    const hasSpace = /\s/.test(value);

    // Check if all conditions are met
    if (
      !hasSpecialCharacter ||
      !hasCapitalLetter ||
      !hasSmallLetter ||
      !hasNumber ||
      hasSpace
    ) {
      return Promise.reject(
        hasSpace
          ? "New password must not contain any space "
          : `New password must contain at least ${
              hasSpecialCharacter ? "" : "1 special character,"
            }${hasCapitalLetter ? "" : "1 capital letter,"}${
              hasSmallLetter ? "" : "1 small letter,"
            }${hasNumber ? "" : "1 number,"}`
      );
    }

    if (value === form.getFieldValue("old_password")) {
      return Promise.reject(
        "New password cannot be the same as the Old Password"
      );
    }
    return Promise.resolve();
  };
  const onSubmit: SubmitHandler<any> = async (data) => {
    await updatePassword({ data });
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(setCommonModal());
    } else if (isError) {
      message.error("Failed to update password. Please try again.");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Form
        name="Updated"
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[12, 16]}>
          {/* Old Password */}
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
            <Form.Item
              label="Old Password"
              name="old_password"
              rules={[
                {
                  required: true,
                  message: "Enter your Old Password",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password type="text" placeholder="Enter old Password" />
            </Form.Item>
          </Col>

          {/* New Password */}
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
            <Form.Item
              label="New Password"
              name="new_password"
              rules={[
                {
                  required: true,
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
                {
                  validator: validatePassword, // Custom validation rule
                },
              ]}
            >
              <Input.Password type="text" placeholder="Enter New Password" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button
            // className="text-bold bg-green-500 hover:bg-blue-700 text-white w-36"
            htmlType="submit"
            icon={<SendOutlined />}
            style={{
              marginTop: "5px",
              background: "#01adad",
              borderRadius: "50px",
              width: "130px",
              color: "white",
            }}
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdatePassword;
