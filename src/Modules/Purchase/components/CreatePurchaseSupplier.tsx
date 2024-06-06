import { HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  FormProps,
  Input,
  Row,
  Select,
} from "antd";
import React from "react";
import { CommonHeaderStyles } from "../../../common/style/Style";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { PurchaseSupplierType } from "../types/purchaseTypes";

const CreatePurchaseSupplier: React.FC = (): JSX.Element => {
  const [form] = Form.useForm();

  const onFinish: FormProps<PurchaseSupplierType>["onFinish"] = (values) => {
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
              title: <span className="text-[#1B9FA2]">Create Supplier</span>,
            },
          ]}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 mb-5 md:gap-0">
        <span style={CommonHeaderStyles as any}>Create Supplier</span>
        <Link to={`/purchase/supplier-list`}>
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
            Return to Supplier list
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
                    label="Supplier Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Supplier Name",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input placeholder="Enter Supplier Name" />
                  </Form.Item>
                </Col>

                {/* Openning Balance */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="opening_balance"
                    rules={[{ required: true }]}
                    label="Phone Number"
                    required
                  >
                    <Input placeholder="Phone Number" />
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

export default CreatePurchaseSupplier;
