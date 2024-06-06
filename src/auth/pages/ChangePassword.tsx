/*
Change Password
@Author MD Mamun Miah <mamunahmed.m360ict@gmail.com>
*/
import { Form, Input, Button, Divider, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion"; // Import motion from framer-motion
import "./LoginDesign.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useChangePasswordMutation } from "./forget_api/forgetApi";
// import TOAB from "../../assets/logo.png";

type IForget = {
  password: string;
};
const ChangePassword = () => {
  const [changePass, { isSuccess, isLoading }] = useChangePasswordMutation();
  const [query] = useSearchParams();
  const email = query.get("email");
  const token = localStorage.getItem("otpToken");
  const navigate = useNavigate();

  const onFinish = (values: IForget) => {
    const body = {
      email: email,
      token: token,
      password: values.password,
    };
    changePass(body);
  };
  if (isSuccess) {
    navigate("/login");
  }

  return (
    <motion.div
      // className="login-container"
      className="bg-gradient-to-r from-indigo-500 to-cyan-300 flex justify-center items-center bg-cover bg-center  bg-no-repeat  min-h-screen "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        // className="registration-form login-form-container"
        className="bg-white px-[25px] py-[25px] rounded-[8px] w-[320px] h-[400px]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="logo-container">
          {/* <img src={TOAB} alt='brand logo' width={'auto'} height={60} /> */}
        </div>
        <Divider style={{ margin: "10px" }} />
        <Typography.Title
          level={3}
          style={{ textAlign: "center", color: "#647df3" }}
        >
          Change Password
        </Typography.Title>
        <Form onFinish={onFinish} name="login-form">
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="login-icon" />}
              placeholder="Password"
              className="login "
              style={{
                borderRadius: "50px",
                backgroundColor: "white",
                color: "black",
              }}
            />
          </Form.Item>

          <Form.Item className="button-container">
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              style={{
                display: "flex",
                justifyContent: "center",

                // background: "#8f6456",
                background: "#647df3",
                borderRadius: "50px",
                width: "100%",
                color: "white",
              }}
              // className="login-button"
            >
              Submit
            </Button>
            <Divider style={{ marginBottom: "10px" }} />
            <span
              style={{
                marginTop: "15rem",
                color: "black",
              }}
            >
              <Link to="/login">Go Back</Link>
            </span>
          </Form.Item>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default ChangePassword;
