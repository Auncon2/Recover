/*
@file Login.tsx
@Author Ami Hasan<ami.m360ict@gmail.com>
*/
import { Form, Input, Divider, Row, Col, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion"; // Import motion from framer-motion
import "./LoginDesign.css";

import { useLoginMutation } from "../../app/api/userApi/api";
import { Link } from "react-router-dom";
import useIsMobile from "../../components/utils/useIsMobile";

// import SubmitButton from "../../components/SubmitButton/SubmitButton";
// import TOAB from "../../assets/logo.png";
// import { type } from "./../../components/AppLayout/AppLayoutData";

type IInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const isMobile = useIsMobile();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = (values: IInputs) => {
    const body = {
      email: values.email,
      password: values.password,
    };

    login(body);
  };

  return (
    <motion.div
      className="bg-slate-50 flex justify-center items-center bg-cover bg-center bg-no-repeat  min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={
        isMobile?.isMDMobile
          ? { backgroundImage: `url('/bg/login_hotel.jpg')` }
          : {}
      }
    >
      <div className="hidden md:block">
        <motion.div
          className="bg-black relative w-[420px] lg:w-[550px] h-[500px]  xl:w-[700px] xl:h-[600px] 2xl:w-[900px] 2xl:h-[800px] flex justify-center items-center text-white font-bold bg-cover bg-center bg-no-repeat border-b border-t border-l rounded-bl-md rounded-tl-md overflow-hidden shadow-lg "
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src="/bg/login_hotel.jpg"
            alt="login"
            width={"auto"}
            height={"auto"}
            className="bg-cover bg-center bg-no-repeat w-full h-full opacity-30"
          />

          <motion.div
            className="absolute top-11 xl:top-24 2xl:top-36 flex flex-col gap-9 font-bold "
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-col text-white font-bold ">
              <span className="text-[60px] lg:text-[80px] xl:text-[100px] 2xl:text-9xl -ml-0 2xl:-ml-5 font-serif">
                WELCOME
              </span>
              <span className="text-[30px] lg:text-5xl font-serif text-center -mt-6 xl:-mt-8 2xl:-mt-0">
                TO
              </span>
              <div className="text-[33px] lg:text-[45px] xl:text-[56px] 2xl:text-7xl flex items-center -mt-4 2xl:-mt-0 -ml-[-10px] xl:-ml-[-5px] 2xl:-ml-0">
                <span className=" font-serif ">RESERVATION</span>
                <span className=" mb-2 ml-4 ">360</span>
              </div>
            </div>
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-xs xl:text-sm font-normal backdrop-blur-3xl px-3 py-2 rounded-md w-[350px] lg:w-[460px] xl:w-[580px] 2xl:w-[710px] -mt-8  2xl:-mt-0">
                We provide the best service to all our customers. You will have
                the best experience here. Our website provides a user-friendly
                platform for easy booking with a clean interface. It's navigable
                for selecting dates, rooms, and amenities, ensuring a seamless
                experience on various devices. Detailed hotel information,
                including images and pricing, aids informed decisions. The
                straightforward booking process, secure payments, and prompt
                confirmation emails with check-in details enhance the overall
                user experience, making accommodation booking convenient and
                enjoyable.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="w-[320px] lg:w-[400px] h-[500px] xl:w-[450px] xl:h-[600px] 2xl:w-[600px] 2xl:h-[800px] flex items-center bg-white opacity-25  px-[25px] border-b border-t border-r rounded-br-md rounded-tr-md shadow-lg "
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mt-[-70px] ">
          <div className="logo-container">
            <img
              // src="/logo/loginlogo_1.png"
              src="/logo/ressa4.png"
              alt="brand logo"
              width={300}
              height={"auto"}
              className="hidden xl:block"
            />
            <img
              src="/logo/ressa4.png"
              alt="brand logo"
              width={200}
              height={"auto"}
              className="block xl:hidden"
            />
          </div>
          <Divider style={{ margin: "10px" }} />
          {/* <Typography.Title
            level={3}
            style={{
              textAlign: "center",
              paddingBottom: "10px",
              color: "#01adad",
            }}
          >
            LOGIN
          </Typography.Title> */}
          <div className="flex justify-center">
            <span className="font-semibold text-center text-2xl pb-[10px] text-[#01adad]">
              LOGIN
            </span>
          </div>

          <Form name="login-form" onFinish={onFinish}>
            <Row gutter={[16, 8]}>
              <Col xs={24}>
                <Form.Item
                  className="login-item "
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not a valid email!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    className="login "
                    prefix={<MailOutlined className="login-icon" />}
                    placeholder="Email"
                    style={{ borderRadius: "50px" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  className="login-item"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                  ]}
                >
                  <Input.Password
                    className="login"
                    prefix={<LockOutlined className="login-icon" />}
                    placeholder="Password"
                    style={{ borderRadius: "50px" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item>
                  {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    background: "#8f6456",
                  }}
                >
                  <SubmitButton
                    loading={isLoading}
                    label="Login"
                    block
                    icon={<LoginOutlined />}
                  />
                </div> */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      // background: "#8f6456",
                      background: "#01adad",
                      borderRadius: "50px",
                      width: "100%",
                      color: "white",
                    }}
                    loading={isLoading}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Col>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }} />
              <Col xs={24}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span>
                    <Link to="/forget-password" className="text-black">
                      Forget Password
                    </Link>
                  </span>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
