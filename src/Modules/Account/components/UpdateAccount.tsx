import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";

const UpdateAccount = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Form layout="vertical" hideRequiredMark onFinish={onFinish} form={form}>
        <Row gutter={16}>
          <Col span={12}>
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
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="branch"
              label="Branch"
              rules={[
                {
                  required: true,
                  message: "Please input your Branch",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Branch" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ac_number"
              rules={[{ required: true }]}
              label="Account Number"
              required
            >
              <Input placeholder="Account Number" type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="openning_balance"
              rules={[{ required: true }]}
              label="Opening balance"
              required
            >
              <Input placeholder="Opening balance" type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="details"
              rules={[{ required: true }]}
              label="Details"
              required
            >
              <Input placeholder="Details" type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ marginTop: "1rem" }}>
          <Button
            htmlType="submit"
            icon={<SendOutlined />}
            className="text-bold bg-[#b38b7a]  text-white w-36"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateAccount;
