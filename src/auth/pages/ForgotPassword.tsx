/*
Forgot Password
@Author MD Mamun Miah <mamunahmed.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Input, Button, Divider, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion"; // Import motion from framer-motion
import "./LoginDesign.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useGetOTPMutation } from "./forget_api/forgetApi";
// import TOAB from '../../assets/logo.png';

type IForget = {
  email: string;
  type: string;
  otp: string;
};
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [getOTP, { isSuccess, isLoading }] = useGetOTPMutation();

  const onFinish = (values: IForget) => {
    const body = {
      email: values.email,
      otp: values.otp,
      type: "forget_h_admin",
    };
    getOTP(body);
  };
  if (isSuccess) {
    navigate(`/forget-password/otp?email=${email}`);
  }
  return (
    <motion.div
      className="bg-gradient-to-r from-indigo-500 to-cyan-300 flex justify-center items-center bg-cover bg-center  bg-no-repeat  min-h-screen "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex rounded-md overflow-hidden mx-[20px] lg:mx-[40px] xl:mx-0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/bg/forgot.jpg"
          alt="forgot"
          className="w-[400px] lg:w-[620px] h-[500px] object-cover object-center hidden md:block"
        />

        <motion.div
          // className="registration-form login-form-container"
          className="w-[420px] bg-white flex items-center px-[25px] "
          // style={{ backgroundImage: `url('/bg/forgot.jpg')` }}
        >
          <div className="flex flex-col w-full ">
            {/* <div className="logo-container">
              <img
                src="/bg/forgot.jpg"
                alt="brand logo"
                width={"auto"}
                height={60}
              />
            </div> */}
            <Divider style={{ margin: "10px" }} />
            <Typography.Title
              level={3}
              style={{
                textAlign: "center",
                paddingBottom: "10px",
                color: "#647df3",
              }}
            >
              Forgot Password
            </Typography.Title>
            <Form name="login-form" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[{ message: "Please enter your Email!" }]}
              >
                <Input
                  onChange={(e: any) => setEmail(e.target.value)}
                  prefix={<MailOutlined className="login-icon" />}
                  placeholder="E-mail"
                  className="login"
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
                    width: "100%",
                    color: "white",
                    borderRadius: "50px",
                  }}
                  // className="login-button"
                >
                  Send OTP
                </Button>
                <Divider style={{ marginBottom: "10px", marginTop: "50px" }} />
                <span style={{ marginTop: "15rem", color: "black" }}>
                  <Link to="/login" className="back-button">
                    Go Back
                  </Link>
                </span>
              </Form.Item>
            </Form>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;
