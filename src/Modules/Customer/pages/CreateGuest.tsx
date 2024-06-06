/*
Create Account
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  Card,
  Col,
  Input,
  Row,
  Typography,
  Breadcrumb,
  Select,
} from "antd";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";

// import { useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useCreateGuestMutation } from "../api/CustomerEndPoints";
import { useEffect } from "react";

const CreateGuest = () => {
  const [createGuest, { isSuccess }] = useCreateGuestMutation();
  // const [open, setOpen] = useState(false);

  // const showDrawer = () => {
  //   setOpen(true);
  // };

  // const onClose = () => {
  //   setOpen(false);
  // };
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    createGuest(values);
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess]);
  return (
    <>
      <div className="my-5">
        <Breadcrumb
          separator=">"
          items={[
            {
              href: "/",
              title: (
                <>
                  <HomeOutlined className=" me-1" />
                  <span>Dashboard</span>
                </>
              ),
            },
            {
              href: "",
              title: (
                <>
                  {/* <UserOutlined /> */}
                  <span>Guest</span>
                </>
              ),
            },
            {
              title: <span className="text-[#1B9FA2]">Create Guest</span>,
            },
          ]}
        />
      </div>

      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <Row
              align={"middle"}
              justify={"space-between"}
              style={{ marginBottom: "1rem" }}
            >
              <Typography.Title level={4}>Create Guest</Typography.Title>
              {/* <Button className="bg-[#b38b7a] text-white" onClick={showDrawer}>
                Edit
              </Button> */}
            </Row>
            {/* <Drawer title="Update" width={720} onClose={onClose} open={open}>
              <UpdateAccount />
            </Drawer> */}
            <Form onFinish={onFinish} layout="vertical" form={form}>
              <Row align={"middle"} gutter={[20, 16]}>
                {/* Name */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Name",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input placeholder="Enter Your Name" />
                  </Form.Item>
                </Col>

                {/* email */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input type="email" placeholder="Enter Your Email" />
                  </Form.Item>
                </Col>

                {/* country */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Country",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Enter Your Country" />
                  </Form.Item>
                </Col>

                {/* city */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "Please input your City",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Enter Your City" />
                  </Form.Item>
                </Col>

                {/* user_type */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="user_type"
                    rules={[{ required: true }]}
                    label="User Type"
                    required
                  >
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Enter User Type"
                    >
                      <Select.Option value="guest">Guest</Select.Option>
                      <Select.Option value="user">User</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <SubmitButton />
              {/* <Form.Item style={{ marginTop: "1rem" }}>
                <Button
                  htmlType="submit"
                  icon={<SendOutlined />}
                  className="text-bold bg-[#b38b7a] text-white w-36"
                >
                  Submit
                </Button>
              </Form.Item> */}
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateGuest;
