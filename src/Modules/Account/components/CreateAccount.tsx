/*
Create Account
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Card, Col, Input, Row, Breadcrumb, Select, Button } from "antd";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { useCreateAccountMutation } from "../api/AccountEndPoint";
import { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useWatch } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { CommonHeaderStyles } from "../../../common/style/Style";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [_dummy, _setDummy] = useState({});
  const [createAccount, { isSuccess }] = useCreateAccountMutation();

  // const { data: paymentMethod } = useGetPaymentlistQuery(dummy as any);
  // const [open, setOpen] = useState(false);

  // const showDrawer = () => {
  //   setOpen(true);
  // };

  // const onClose = () => {
  //   setOpen(false);
  // };

  const [form] = Form.useForm();
  const AC_type = useWatch("ac_type", form);

  const onFinish = (values: any) => {
    const CreateAccount = {
      name: values.name,
      ac_type: values.ac_type,
      bank: values.bank ? values.bank : "",
      branch: values.branch ? values.branch : "",
      account_number: values.account_number ? values.account_number : "",
      opening_balance: values.opening_balance ? values.opening_balance : 0,
      details: values.details,
    };

    createAccount(CreateAccount as any);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate(`/account/account-list`);
    }
  }, [form, isSuccess, navigate]);
  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        opening_balance: 0,
      });
    }
  }, [form]);
  return (
    <>
      <div className="mt-5 mb-[50px]">
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
                  <span>Account</span>
                </>
              ),
            },
            {
              title: <span className="text-[#1B9FA2]">Create Account</span>,
            },
          ]}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 mb-5 md:gap-0">
        <span style={CommonHeaderStyles as any}>Create Account</span>
        <Link to={`/account/account-list`}>
          <Button
            icon={<FaArrowLeft />}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "230px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Return to Account list
          </Button>
        </Link>
      </div>

      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            {/* <Drawer title="Update" width={720} onClose={onClose} open={open}>
            <UpdateAccount />
          </Drawer> */}
            <Form onFinish={onFinish} layout="vertical" form={form}>
              <Row align={"middle"} gutter={[20, 16]}>
                {/* Name */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="name"
                    label="Account Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Account Name",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input placeholder="Enter Your Account Name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="ac_type"
                    label="Pay Type"
                    rules={[
                      {
                        required: true,

                        message: "Please select Payment Type",
                      },
                    ]}
                  >
                    {/* <Select style={{ width: "100%" }} placeholder="Pay Type">
                      {paymentMethod?.data?.map((payment) => (
                        <Select.Option key={payment.id} value={payment.id}>
                          {payment.payment_method}
                        </Select.Option>
                      ))}
                    </Select> */}
                    <Select style={{ width: "100%" }} placeholder="Pay Type">
                      <Select.Option value="bank">Bank</Select.Option>
                      <Select.Option value="cash">Cash</Select.Option>
                      <Select.Option value="cheque">Cheque</Select.Option>
                      <Select.Option value="mobile-banking">
                        Mobile Banking
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* Bank */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="bank"
                    label="Bank Name"
                    rules={[
                      {
                        required: AC_type === "cash" ? false : AC_type,

                        message: "Please input your Bank",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Enter Your Bank"
                      disabled={AC_type === "cash" ? AC_type : false}
                    />
                  </Form.Item>
                </Col>
                {/* branch */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="branch"
                    label="Branch"
                    rules={[
                      {
                        required: AC_type === "cash" ? false : AC_type,

                        message: "Please enter your Branch",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Your Branch"
                      disabled={AC_type === "cash" ? AC_type : false}
                    />
                  </Form.Item>
                </Col>
                {/* AC Number */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="account_number"
                    label="Account Number"
                    rules={[
                      {
                        required: AC_type === "cash" ? false : AC_type,

                        message: "Please enter Account Number",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Account Number"
                      disabled={AC_type === "cash" ? AC_type : false}
                    />
                  </Form.Item>
                </Col>
                {/* Openning Balance */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="opening_balance"
                    rules={[{ required: true }]}
                    label="Opening balance"
                    required
                  >
                    <Input type="number" placeholder="Opening balance" />
                  </Form.Item>
                </Col>

                {/* Details */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="details"
                    // rules={[{ required: true }]}
                    label="Details"
                  >
                    <Input type="text" placeholder="Details" />
                  </Form.Item>
                </Col>
              </Row>

              <SubmitButton />
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateAccount;
