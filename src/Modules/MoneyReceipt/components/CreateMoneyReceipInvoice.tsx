/* eslint-disable @typescript-eslint/no-explicit-any */
/*
@file CreateExpense.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
import {
  Form,
  Row,
  Col,
  Select,
  Breadcrumb,
  Button,
  Input,
  Card,
  InputNumber,
} from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";

import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";
import { RiAddFill } from "react-icons/ri";

import { useForm, useWatch } from "antd/es/form/Form";

import { useCreateMoneyReceiptMutation } from "../api/MoneyReceiptEndPoints";

import { useGetMeQuery } from "../../../app/api/userApi/userApi";
import { CommonHeaderStyles } from "../../../common/style/Style";
import { useInvoiceData } from "../../../common/Const/CommonConst";
import { useGetAllInvoiceListQuery } from "../../BookingInvoice/api/BookingInvoiceEndPoints";
import { useSelector } from "react-redux";

const CreateMoneyReceipInvoice = () => {
  const invoice = useInvoiceData();
  const { invoiceDue, invoiceDueForPurposeOf } = useSelector(
    (state: any) => state.reservation
  );
  const { data: user } = useGetMeQuery();
  const { data: invoicelist } = useGetAllInvoiceListQuery({ due_inovice: 1 });
  const userId = user?.data?.id;
  const [account, _setFilter] = useState<any>({
    admin_id: userId,
    status: 1,
  });
  console.log("invoicelist?.data", invoicelist?.data);
  const [bankList, setBankTypeList] = useState<any>([]);
  const [invoicepayment, setInvoicePaymentList] = useState<any>();

  const [form] = useForm();

  const navigate = useNavigate();
  const [createMoneyReceipt, { isSuccess }] = useCreateMoneyReceiptMutation();

  const { data: accountList } = useGetAccountListQuery(account);

  const invoiceID = useWatch("invoice_id", form);

  useEffect(() => {
    if (accountList) {
      const BankType =
        accountList?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: value.name,
          id: value.id,
          key: `room_${value.name}_${index}`,
        })) || [];
      setBankTypeList(BankType);
    }
  }, [accountList]);
  useEffect(() => {
    if (invoicelist && invoicelist?.data) {
      const InvoiceList: any | undefined = invoicelist?.data?.find(
        (find: any) => find.invoice_id === invoiceID
      );

      if (InvoiceList) {
        setInvoicePaymentList(InvoiceList);
      }
    }
  }, [invoicelist, invoiceID]);
  // ...............due payment default.........................
  useEffect(() => {
    if (invoiceID && invoicepayment) {
      const invoicePayment = Number(invoicepayment?.due);
      form.setFieldValue("paid_amount", invoicePayment);
    } else if (!invoiceID) {
      form.resetFields(["paid_amount"]);
    }
  }, [invoicepayment, invoiceID]);
  useEffect(() => {
    if (invoiceDue && invoiceDueForPurposeOf) {
      const invoiceDUE = Number(invoiceDue);

      form.setFieldValue("invoice_id", invoiceDUE);
      form.setFieldValue("remarks", invoiceDueForPurposeOf);
    }
    // else if (!invoiceDue) {
    //   form.resetFields(["paid_amount"]);
    // }
  }, [invoiceDue]);
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();

      navigate(`/money-receipt/invoice-money-receipt`);
    }
  }, [isSuccess, navigate]);

  const onFinish = (values: any) => {
    const Invoice = {
      reciept_type: "invoice",
      ac_tr_ac_id: values.ac_tr_ac_id,
      user_id: invoicepayment.user_id,
      paid_amount: values.paid_amount,

      remarks: values.remarks ? values.remarks : "",
      invoice_id: values.invoice_id,
    };

    createMoneyReceipt(Invoice as any);
  };

  const onSearch = (_value: string) => {};

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <Breadcrumb
        style={{ marginBottom: "20px", marginTop: "20px" }}
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
                <span>Money Receipt</span>
              </>
            ),
          },
          {
            href: "/money-receipt/invoice-money-receipt",
            title: (
              <>
                <span>Invoice Money Receipt</span>
              </>
            ),
          },

          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <RiAddFill color="#20a09e" size="15" />
                <span className="text-[#20a09e] font-semibold">
                  Add Money Receipt
                </span>
              </div>
            ),
          },
        ]}
      />

      <hr className="my-5  border-[#01adad]" />
      <div className="flex justify-center items-center">
        <div className="w-full xl:w-[1200px]">
          <Row
            align={"middle"}
            justify={"start"}
            gutter={[6, 15]}
            style={{ marginBottom: "20px" }}
          >
            <Link to={`/money-receipt/invoice-money-receipt`}>
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
                Return to Money Receipt list
              </Button>
            </Link>
          </Row>
          <Card
            title={
              <span style={CommonHeaderStyles as any}>+ Add Money Reccipt</span>
            }
          >
            <Form
              name="expense"
              form={form}
              onFinish={onFinish}
              style={{ width: "100%" }}
              autoComplete="off"
              layout="vertical"
            >
              {/* <hr className="" /> */}
              <Row align={"middle"} justify={"center"}>
                <Col
                  xs={24}
                  sm={12}
                  md={24}
                  lg={24}
                  xl={24}
                  xxl={24}
                  style={{ width: "100%" }}
                >
                  <Row
                    align={"middle"}
                    justify={"center"}
                    style={{ width: "100%" }}
                  >
                    {/* invoice */}
                    <Col xs={24} sm={12} md={24} lg={20} xl={12} xxl={12}>
                      <Form.Item label="Invoice" name="invoice_id">
                        <Select
                          // style={{ width: "400px" }}
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          onSearch={onSearch}
                          filterOption={filterOption}
                          placeholder="Select Invoice"
                          options={invoice}

                          // disabled={!form.getFieldValue("payment_type_partial")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row align={"middle"} justify={"center"}>
                    {/* account */}
                    <Col xs={24} sm={12} md={24} lg={20} xl={12} xxl={12}>
                      <Form.Item
                        label="Account Name"
                        name="ac_tr_ac_id"
                        rules={[{ required: true, message: "Select Account" }]}
                      >
                        <Select
                          allowClear
                          showSearch
                          optionFilterProp="children"
                          onSearch={onSearch}
                          filterOption={filterOption}
                          placeholder="Select account name"
                          options={bankList}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row align={"middle"} justify={"center"}>
                    {/* Remarks */}
                    <Col xs={24} sm={12} md={24} lg={20} xl={12} xxl={12}>
                      <Form.Item
                        label="Amount"
                        name="paid_amount"
                        rules={[{ required: true, message: "Enter Amount" }]}
                      >
                        <InputNumber
                          type="number"
                          style={{ width: "100%" }}
                          placeholder="Enter Paid Amount"
                          readOnly
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row align={"middle"} justify={"center"}>
                    {/* Remarks */}
                    <Col xs={24} sm={12} md={24} lg={20} xl={12} xxl={12}>
                      <Form.Item
                        label="Details (For the purpose of)"
                        name="remarks"
                        rules={[{ required: true, message: "Enter Details" }]}
                      >
                        <Input
                          type="text"
                          style={{ width: "100%" }}
                          placeholder="Details"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row align={"middle"} justify={"center"}>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        style={{
                          backgroundColor: "#01adad",
                          color: "white",
                          borderRadius: "50px",
                          width: "170px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "30px",
                        }}
                      >
                        Create Money Receipt
                      </Button>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateMoneyReceipInvoice;
