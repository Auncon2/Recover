/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Row, Col, Card, Typography, Divider, Input } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

// import { useNavigate } from 'react-router';
// import { NumberInput } from '../../../components/FormItems/FormItems';
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import {
  SelectAccount,
  SelectExpenseItem,
  SelectPaymentMethod,
} from "../../../app/fromItemCommon/SelectCustomField";
// import { FormInput } from '../../../common/Input/FromInput';
import { useCreateExpenseMutation } from "../api/ExpenseEndPoint";

const CreateExpenseNew = () => {
  const [form] = Form.useForm();
  // const [paymentStatus, setPaymentStatus] = useState('unpaid');
  // const navigate = useNavigate();
  const [createExpense, { isLoading, isSuccess }] = useCreateExpenseMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      //   navigate(`/invoice/invoice-list/${data?.id}`);
    }
  }, [isLoading]);
  const onFinish = (values: any) => {
    // Check if the payment type is "unpaid"
    if (values.paymentType === "unpaid") {
      // Exclude ac_id from the payload
      const { accountId, ...payloadWithoutAcId } = values;
      const body: any = {
        ...payloadWithoutAcId,
        discount: values.discount,
        vat: values.vat,
        invoiceItem: values.invoiceItem && values.invoiceItem,
        accountId: undefined,
        user_id: values.user_id,
      };
      createExpense(body);
      form.resetFields();
    } else {
      // Payment type is not "unpaid," include ac_id in the payload
      const body: any = {
        ...values,
        discount: values.discount,
        vat: values.vat,
        invoiceItem: values.invoiceItem && values.invoiceItem,
        user_id: values.user_id,
      };
      createExpense(body);
      form.resetFields();
    }
  };

  const [selectedInvoiceAmounts, setSelectedInvoiceAmounts] = useState<
    number[]
  >([]);

  const handleInvoiceHeadSelect = (amount: number, index: number) => {
    const updatedAmounts = [...selectedInvoiceAmounts];
    updatedAmounts[index] = amount;
    setSelectedInvoiceAmounts(updatedAmounts);
  };

  return (
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
        <Typography.Title level={5}>Create Expense</Typography.Title>
      </Row>
      <Form onFinish={onFinish} layout="vertical">
        <Card className="border">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Typography.Title level={5}>
              Expense Information 📃
            </Typography.Title>
          </div>
          <Form.List name="invoiceItem" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Row
                    key={field.key}
                    gutter={[8, { xs: 8, sm: 8, md: 24, lg: 24 }]}
                    align="middle"
                  >
                    <div style={{ width: "33%" }}>
                      <SelectExpenseItem
                        required
                        name={[field.name, "id"]}
                        onSelectInvoiceHead={(amount: any) =>
                          handleInvoiceHeadSelect(amount, index)
                        }
                        label="Select Invoice Head"
                      />
                    </div>

                    <div
                      title="Price"
                      style={{
                        width: "20%",
                        marginLeft: "10px",
                        marginBottom: "18px",
                      }}
                    >
                      <label htmlFor="">Price</label>
                      <Input placeholder="Price" />
                    </div>

                    <Form.Item
                      style={{
                        marginLeft: "10px",
                        marginTop: "2rem",
                      }}
                    >
                      {index === 0 ? (
                        <Button
                          type="primary"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        ></Button>
                      ) : (
                        <>
                          <Button
                            style={{
                              background: "red",
                              color: "#fff",
                              marginLeft: "1rem",
                            }}
                            onClick={() => remove(field.name)}
                            icon={<MinusOutlined />}
                          ></Button>
                        </>
                      )}
                    </Form.Item>
                    {fields.length > 1 && <Divider />}
                  </Row>
                ))}
              </>
            )}
          </Form.List>
        </Card>
        <Card
          className="border"
          style={{ marginBottom: "1rem", marginTop: "1rem" }}
        >
          <Typography.Title style={{ marginBottom: "1rem" }} level={5}>
            Payment Information 💳
          </Typography.Title>
          <Row gutter={[5, 16]}>
            <Col
              style={{ marginTop: "30px" }}
              xs={24}
              xl={12}
              sm={24}
              md={12}
              lg={12}
            >
              <SelectPaymentMethod
                required
                label="Payment Method"
                name={"paymentType"}
              />
            </Col>

            <Col style={{ marginTop: "30px" }} xs={24} sm={24} md={12} lg={12}>
              <SelectAccount required label="Account" name={"accountId"} />
            </Col>
          </Row>
        </Card>
        <Row justify="end">
          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Card
              className="border"
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
            >
              <Typography.Title style={{ marginBottom: "1rem" }} level={5}>
                Total Expense Information 💵
              </Typography.Title>
              <Row justify="space-between" gutter={[5, 16]}>
                <Col span={24}>
                  <Form.Item name="grandTotal">
                    <label htmlFor="">Grand Total</label>
                    <Input
                      name="grandTotal"
                      placeholder="Grand Total"
                      disabled
                      style={{
                        height: "50px",
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <SubmitButton />
      </Form>
    </Card>
  );
};

export default CreateExpenseNew;
