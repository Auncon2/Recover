import React from "react";
import { CommonHeaderStyles } from "../../../common/style/Style";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  FormProps,
  InputNumber,
  Row,
  Select,
} from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { PurchaseType } from "../types/purchaseTypes";
import { HomeOutlined } from "@ant-design/icons";

const CreatePurchase: React.FC = (): JSX.Element => {
  const [form] = Form.useForm();

  const onFinish: FormProps<PurchaseType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  return (
    <React.Fragment>
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
                  <span>Supplier</span>
                </>
              ),
            },
            {
              title: <span className="text-[#1B9FA2]">Create Purchase</span>,
            },
          ]}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 mb-5 md:gap-0">
        <span style={CommonHeaderStyles as any}>Create Purchase</span>
        <Link to={`/purchase/purchase-list/`}>
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
            Return to Purchase list
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
            <Form onFinish={onFinish} layout="vertical" form={form}>
              <Row align={"middle"} gutter={[20, 16]}>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="ac_type"
                    label="Select Supplier"
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
                    <Select style={{ width: "100%" }} placeholder="Select One">
                      <Select.Option value="1">Supplier - 1</Select.Option>
                      <Select.Option value="2">Supplier - 2</Select.Option>
                      <Select.Option value="3">Supplier - 3</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="name"
                    label="Purchase Date"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Supplier Name",
                        whitespace: true,
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>

                {/* Openning Balance */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="opening_balance"
                    rules={[{ required: true }]}
                    label="Amount"
                    required
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="Amount"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="ac_type"
                    label="Status"
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
                    <Select style={{ width: "100%" }} placeholder="Status">
                      <Select.Option value="active">Active</Select.Option>
                      <Select.Option value="inactive">Inactive</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <SubmitButton />
            </Form>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CreatePurchase;
