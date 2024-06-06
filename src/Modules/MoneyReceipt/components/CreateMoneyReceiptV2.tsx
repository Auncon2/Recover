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
  message,
  Alert,
  Result,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";

import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";
import { RiAddFill } from "react-icons/ri";

import { useForm, useWatch } from "antd/es/form/Form";
import { useGetCustomerListQuery } from "../../Customer/api/CustomerEndPoints";

import { useGetAllInvoiceListQuery } from "../../BookingInvoice/api/BookingInvoiceEndPoints";
import { IViewInvoiceList } from "../../BookingInvoice/types/InvoiceTypes";
import { useCreateMoneyReceiptMutation } from "../api/MoneyReceiptEndPoints";
import { useGetRoomBookingInvoiceListQuery } from "../../BookRoom/api/RoomBookingEndPoints";
import { useGetHallBookingInvoiceListQuery } from "../../HallModule/api/HallEndPoints";
import { useGetMeQuery } from "../../../app/api/userApi/userApi";
import { CommonHeaderStyles } from "../../../common/style/Style";
// import { useSelector } from "react-redux";

const CreateMoneyReceiptV2 = () => {
  // const { bookingDuePaymnet } = useSelector((state: any) => state.reservation);
  const { guestid = "", invoiceid = "", type = "" } = useParams();
  const { data: user } = useGetMeQuery();
  const userId = user?.data?.id;
  const [account, _setFilter] = useState<any>({
    admin_id: userId,
    status: 1,
  });

  const [totalDue, setTotalDue] = useState(0);

  const [bankList, setBankTypeList] = useState<any>([]);
  const [guestList, setGuestList] = useState<any>([]);
  const [invoiceList, setInvoiceList] = useState<any>([]);

  const [guestLastBalance, setGuestLastBalance] = useState<any>();
  const [guestBookingLastBalance, setBookingGuestLastBalance] = useState<any>();
  const [paymentCompare, setPaymentCompare] = useState<any>();
  const [roomBookingPaymentCompare, setRoomBookingPaymentCompare] =
    useState<any>();
  const [HallBookingPaymentCompare, setHallBookingPaymentCompare] =
    useState<any>();

  const [filter, setFilter] = useState<any>({
    due_inovice: 1,
    user_id:
      guestid != "create" && type === "room"
        ? guestid
        : guestid != "create" && type === "hall"
        ? guestid
        : "",
  });
  const [filterValue, setFilterValue] = useState<any>({});
  const [form] = useForm();
  // const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createMoneyReceipt, { isSuccess }] = useCreateMoneyReceiptMutation();

  const { data: accountList } = useGetAccountListQuery(account);

  const { data: guestlist } = useGetCustomerListQuery(filterValue);

  const { data: Invoicelist } = useGetAllInvoiceListQuery({ ...filter });
  const { data: RoomBookinginvoicelist } = useGetRoomBookingInvoiceListQuery({
    ...filter,
  });
  const { data: HallBookinginvoicelist } = useGetHallBookingInvoiceListQuery({
    ...filter,
  });

  const userID = useWatch("user_id", form);
  const recieptType = useWatch("reciept_type", form);
  const paidAmount = useWatch("paid_amount", form);
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
    if (guestlist) {
      const GuestList =
        guestlist?.data?.map((value: any, index: any) => ({
          value: value?.id,
          label: `${value?.name} (${
            value?.email ? value?.email : `Phone No : ${value?.phone}`
          }) , (Last Balance : ${value?.last_balance})`,
          // label: (
          //   <div className="grid gap-2">
          //     <span className="text-blue-700">{value.name} </span>($
          //     {value.email ? value.email : `Phone No : ${value.phone}`}) , (Last
          //     Balance : {value.last_balance})
          //   </div>
          // ),
          // id: value.user_id,
          key: `room_${value.name}_${index}`,
        })) || [];
      setGuestList(GuestList);
    }
  }, [guestlist]);
  // ....................other Invoice list..........................
  useEffect(() => {
    if (Invoicelist) {
      const invoicelist =
        Invoicelist?.data?.map((value: any, index: any) => ({
          value: value.invoice_id,
          label: `${value.invoice_no}  (Due : ${value.due})`,
          // id: value.user_id,
          key: `room_${value.invoice_no}_${index}`,
        })) || [];
      setInvoiceList(invoicelist);
    }
  }, [Invoicelist]);
  useEffect(() => {
    if (Invoicelist && Invoicelist?.data.length > 0) {
      // Calculate total due
      const dueTotal = Invoicelist?.data.reduce((total: any, invoice: any) => {
        return total + parseFloat(invoice.due);
      }, 0);

      setTotalDue(dueTotal);
    }
  }, [Invoicelist]);

  useEffect(() => {
    if (Invoicelist && Invoicelist?.data) {
      const matchPayment: any | undefined = Invoicelist.data.find(
        // (find: any) => find.invoice_id === values.invoice_id
        (find: any) => find.invoice_id === invoiceID
      );

      if (matchPayment) {
        setPaymentCompare(matchPayment);
      }
    }
  }, [Invoicelist]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();

      navigate(`/money-receipt/invoice-money-receipt`);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (
      (guestid &&
        guestid !== "create" &&
        invoiceid &&
        invoiceid !== "money-receipt" &&
        type &&
        type === "room") ||
      (guestid &&
        guestid !== "create" &&
        invoiceid &&
        invoiceid === "money-receipt" &&
        type &&
        type === "room")
    ) {
      const parsedGuestId = Number(guestid);
      // const parsedInvoiceId = parseInt(invoiceid);
      // const invoiceID = "invoice";
      // const Paid_Amount = Number(roomBookingPaymentCompare?.due);
      const positiveBalance = Math.abs(
        Number(guestBookingLastBalance?.last_balance)
      );

      form.setFieldValue("user_id", parsedGuestId);
      // form.setFieldValue("reciept_type", invoiceID);
      // form.setFieldValue("invoice_id", parsedInvoiceId);
      form.setFieldValue("paid_amount", positiveBalance);
    } else if (
      (guestid &&
        guestid !== "create" &&
        invoiceid &&
        invoiceid !== "money-receipt" &&
        type &&
        type === "hall") ||
      (guestid &&
        guestid !== "create" &&
        invoiceid &&
        invoiceid === "money-receipt" &&
        type &&
        type === "hall")
    ) {
      const parsedGuestId = Number(guestid);

      const positiveBalance = Math.abs(
        Number(guestBookingLastBalance?.last_balance)
      );

      form.setFieldValue("user_id", parsedGuestId);

      form.setFieldValue("paid_amount", positiveBalance);
    }
  }, [guestid, type, guestBookingLastBalance, form]);
  // ...............invoiceDefault value.........................
  useEffect(() => {
    if (
      guestid &&
      guestid === "create" &&
      invoiceid &&
      invoiceid === "money-receipt" &&
      type &&
      type === "all" &&
      Invoicelist?.data?.length
    ) {
      const accountId = Number(Invoicelist?.data[0].invoice_id);
      form.setFieldValue("invoice_id", accountId);
    } else if (
      guestid &&
      guestid === "create" &&
      invoiceid &&
      invoiceid === "money-receipt" &&
      type &&
      type === "all" &&
      Invoicelist?.data?.length === 0
    ) {
      form.resetFields(["invoice_id"]);
    }
  }, [Invoicelist?.data, invoiceid, guestid, type]);

  useEffect(() => {
    if (
      guestid &&
      guestid === "create" &&
      invoiceid &&
      invoiceid === "money-receipt" &&
      type &&
      type === "all" &&
      recieptType &&
      recieptType != "invoice"
    ) {
      const positiveBalance = Math.abs(Number(guestLastBalance?.last_balance));
      form.setFieldValue("paid_amount", positiveBalance);
    } else if (
      recieptType &&
      recieptType === "invoice" &&
      guestid &&
      guestid === "create" &&
      invoiceid &&
      invoiceid === "money-receipt" &&
      type &&
      type === "all"
    ) {
      const subTotal = Number(paymentCompare?.due);
      form.setFieldValue("paid_amount", subTotal);
    }
  }, [
    guestid,
    invoiceid,
    recieptType,
    type,
    paymentCompare,
    guestLastBalance,

    // roomBookingPaymentCompare,
    // HallBookingPaymentCompare,
    form,
  ]);

  // ....................Guest last balance.............................
  useEffect(() => {
    if (userID && guestlist && guestlist?.data) {
      const GuestLastBalance: any | undefined = guestlist?.data?.find(
        (find: any) => find.id === userID
      );

      if (GuestLastBalance) {
        setGuestLastBalance(GuestLastBalance);
      }
    } else {
      const GuestLastBalance: any | undefined = guestlist?.data?.find(
        (find: any) => find.id === Number(guestid)
      );

      if (GuestLastBalance) {
        setBookingGuestLastBalance(GuestLastBalance);
      }
    }
  }, [userID, guestlist, guestid]);

  // ....................compare other invoice due.............................
  useEffect(() => {
    if (Invoicelist && Invoicelist.data) {
      const matchPayment: IViewInvoiceList | undefined = Invoicelist?.data.find(
        // (find: any) => find.invoice_id === values.invoice_id
        (find: any) => find.invoice_id === invoiceID
      );

      if (matchPayment) {
        setPaymentCompare(matchPayment);
      }
    }
  }, [invoiceID, Invoicelist]);
  // ....................compare room invoice due.............................
  useEffect(() => {
    if (RoomBookinginvoicelist && RoomBookinginvoicelist?.data) {
      const matchPayment: any | undefined = RoomBookinginvoicelist?.data.find(
        // (find: any) => find.invoice_id === values.invoice_id
        (find: any) => find.invoice_id === invoiceID
      );

      if (matchPayment) {
        setRoomBookingPaymentCompare(matchPayment);
      }
    }
  }, [RoomBookinginvoicelist, invoiceID]);
  // ....................compare hall invoice due.............................
  useEffect(() => {
    if (RoomBookinginvoicelist && RoomBookinginvoicelist?.data) {
      const matchPayment: any | undefined = HallBookinginvoicelist?.data.find(
        // (find: any) => find.invoice_id === values.invoice_id
        (find: any) => find.invoice_id === invoiceID
      );

      if (matchPayment) {
        setHallBookingPaymentCompare(matchPayment);
      }
    }
  }, [HallBookinginvoicelist, invoiceID]);

  const onFinish = (values: any) => {
    console.log(
      "    Number(values.paid_amount) === Number(paymentCompare?.due)",
      Number(paidAmount as any),
      Number(values.paid_amount),
      Number(paymentCompare?.due)
    );

    if (
      // Number(values.paid_amount) === Number(paymentCompare?.due)
      values.reciept_type === "invoice" &&
      Number(paidAmount) ===
        Number(
          // .................................................
          guestid &&
            guestid === "create" &&
            invoiceid &&
            invoiceid === "money-receipt" &&
            type &&
            type === "all"
            ? paymentCompare?.due
            : guestid &&
              guestid != "create" &&
              invoiceid &&
              invoiceid === "money-receipt" &&
              type &&
              type === "room"
            ? paymentCompare?.due
            : guestid &&
              guestid != "create" &&
              invoiceid &&
              invoiceid != "money-receipt" &&
              type &&
              type === "room"
            ? roomBookingPaymentCompare?.due
            : guestid &&
              guestid != "create" &&
              invoiceid &&
              invoiceid != "money-receipt" &&
              type &&
              type === "hall"
            ? HallBookingPaymentCompare?.due
            : guestid &&
              guestid != "create" &&
              invoiceid &&
              invoiceid == "money-receipt" &&
              type &&
              type === "hall"
            ? paymentCompare?.due
            : HallBookingPaymentCompare?.due
        )
    ) {
      const Invoice = {
        reciept_type: values.reciept_type,
        ac_tr_ac_id: values.ac_tr_ac_id,
        user_id: values.user_id,
        paid_amount: values.paid_amount,

        remarks: values.remarks ? values.remarks : "",
        invoice_id: values.invoice_id,
      };

      createMoneyReceipt(Invoice as any);
    } else if (values.reciept_type === "overall") {
      const Overall = {
        reciept_type: values.reciept_type,
        ac_tr_ac_id: values.ac_tr_ac_id,
        user_id: values.user_id,
        paid_amount: values.paid_amount,
        remarks: values.remarks ? values.remarks : "",
      };

      createMoneyReceipt(Overall as any);
    } else if (
      (guestid &&
        guestid !== "create" &&
        invoiceid &&
        invoiceid !== "money-receipt" &&
        type &&
        type === "room") ||
      (guestid &&
        guestid !== "create" &&
        invoiceid &&
        invoiceid === "money-receipt" &&
        type &&
        type === "room") ||
      (guestid &&
        guestid !== "create" &&
        invoiceid &&
        invoiceid !== "money-receipt" &&
        type &&
        type === "hall") ||
      (guestid &&
        guestid !== "create" &&
        invoiceid &&
        invoiceid === "money-receipt" &&
        type &&
        type === "hall")
    ) {
      const BookingOverall = {
        reciept_type: "overall",
        ac_tr_ac_id: values.ac_tr_ac_id,
        user_id: Number(guestid),
        paid_amount: values.paid_amount,
        remarks: values.remarks ? values.remarks : "",
      };

      createMoneyReceipt(BookingOverall as any);
    } else if (
      (values.reciept_type === "invoice" &&
        Number(paidAmount) !=
          Number(
            guestid &&
              guestid === "create" &&
              invoiceid &&
              invoiceid === "money-receipt" &&
              type &&
              type === "all"
              ? paymentCompare?.due
              : guestid &&
                guestid != "create" &&
                invoiceid &&
                invoiceid === "money-receipt" &&
                type &&
                type === "room"
              ? paymentCompare?.due
              : guestid &&
                guestid != "create" &&
                invoiceid &&
                invoiceid != "money-receipt" &&
                type &&
                type === "room"
              ? roomBookingPaymentCompare?.due
              : guestid &&
                guestid != "create" &&
                invoiceid &&
                invoiceid != "money-receipt" &&
                type &&
                type === "hall"
              ? HallBookingPaymentCompare?.due
              : guestid &&
                guestid != "create" &&
                invoiceid &&
                invoiceid == "money-receipt" &&
                type &&
                type === "hall"
              ? paymentCompare?.due
              : HallBookingPaymentCompare?.due
          )) ||
      (values.reciept_type === "overall" &&
        Number(paidAmount) !=
          Number(
            guestid &&
              guestid === "create" &&
              invoiceid &&
              invoiceid === "money-receipt" &&
              type &&
              type === "all"
              ? totalDue
              : guestid &&
                guestid != "create" &&
                invoiceid &&
                invoiceid === "money-receipt" &&
                type &&
                type === "room"
              ? totalDue
              : guestid &&
                guestid != "create" &&
                invoiceid &&
                invoiceid != "money-receipt" &&
                type &&
                type === "room"
              ? totalDue
              : guestid &&
                guestid != "create" &&
                invoiceid &&
                invoiceid != "money-receipt" &&
                type &&
                type === "hall"
              ? totalDue
              : guestid &&
                guestid != "create" &&
                invoiceid &&
                invoiceid == "money-receipt" &&
                type &&
                type === "hall"
              ? totalDue
              : totalDue
          ))
    ) {
      message.warning("Amount and Due is not same", 2);
    }
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
                {/* <UserOutlined /> */}
                <span>Money Receipt</span>
              </>
            ),
          },
          {
            href: "/money-receipt/invoice-money-receipt",
            title: (
              <>
                {/* <UserOutlined /> */}
                <span>Invoice Money Receipt</span>
              </>
            ),
          },

          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                {/* <AppstoreOutlined style={{ color: "#20a09e" }} /> */}
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
                  {(guestid &&
                    guestid != "create" &&
                    invoiceid &&
                    invoiceid === "money-receipt" &&
                    type &&
                    type === "room") ||
                  (guestid &&
                    guestid != "create" &&
                    invoiceid &&
                    invoiceid === "money-receipt" &&
                    type &&
                    type === "hall") ? (
                    <Row align={"middle"} justify={"center"}>
                      {/* name */}
                      <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item>
                          <Alert
                            message={
                              guestid &&
                              guestid != "create" &&
                              invoiceid &&
                              invoiceid === "money-receipt" &&
                              type &&
                              type === "room"
                                ? `This Guest has extra charges. Please clear the due to make checkout !`
                                : `This Guest has extra charges. Please clear the due to make checkout !`
                            }
                            type="warning"
                            showIcon
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                  {guestid &&
                  guestid === "create" &&
                  invoiceid &&
                  invoiceid === "money-receipt" &&
                  type &&
                  type === "all" ? (
                    <Row align={"middle"} justify={"center"}>
                      <Col xs={24} sm={12} md={24} lg={20} xl={12} xxl={12}>
                        <Form.Item label="Select Guest Type" name="guest_type">
                          <Select
                            placeholder="Search by status"
                            style={{ width: "100%" }}
                            onChange={(value) =>
                              setFilterValue({
                                // ...filterValue,
                                user_type: value ? value : "",
                              })
                            }
                            defaultValue="All"
                            options={[
                              {
                                value: "",
                                label: "All",
                              },
                              {
                                value: "room-guest",
                                label: "Room Guest",
                              },
                              {
                                value: "hall-guest",
                                label: "Hall Guest",
                              },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                  {guestid &&
                  guestid === "create" &&
                  invoiceid &&
                  invoiceid === "money-receipt" &&
                  type &&
                  type === "all" ? (
                    <Row align={"middle"} justify={"center"}>
                      {/* name */}
                      <Col xs={24} sm={12} md={24} lg={20} xl={12} xxl={12}>
                        <Form.Item
                          label="Select Guest"
                          name="user_id"
                          rules={[{ required: true, message: "Select Name" }]}
                        >
                          <Select
                            placeholder="Enter the Name"
                            showSearch
                            optionFilterProp="children"
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={guestList}
                            onChange={(value) =>
                              setFilter({
                                ...filter,

                                user_id: value,
                              })
                            }
                            allowClear
                            style={{ height: "auto" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : (
                    <Row align={"middle"} justify={"center"}>
                      {/* name */}
                      <Col xs={24} sm={12} md={24} lg={20} xl={12} xxl={12}>
                        <Form.Item label="Guest Last Balance">
                          <Alert
                            message={`${guestBookingLastBalance?.name} (${
                              guestBookingLastBalance?.email
                                ? guestBookingLastBalance?.email
                                : `Phone No : ${guestBookingLastBalance?.phone}`
                            }) (Last Balance : ${
                              guestBookingLastBalance?.last_balance
                            })`}
                            type="info"
                            showIcon
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  )}

                  {Number(guestBookingLastBalance?.last_balance) === 0 ||
                  Number(guestLastBalance?.last_balance) === 0 ? (
                    <Result title="Please select a guest who's last balance is not zero!" />
                  ) : (
                    <>
                      {guestid &&
                        guestid === "create" &&
                        invoiceid &&
                        invoiceid === "money-receipt" &&
                        type &&
                        type === "all" && (
                          <Row align={"middle"} justify={"center"}>
                            <Col
                              xs={24}
                              sm={12}
                              md={24}
                              lg={20}
                              xl={12}
                              xxl={12}
                            >
                              <Form.Item
                                label="Payment To"
                                name="reciept_type"
                                rules={[
                                  {
                                    required: true,
                                    message: "Select Payment To",
                                  },
                                ]}
                              >
                                <Select
                                  options={[
                                    { value: "overall", label: "Over All" },
                                    {
                                      value: "invoice",
                                      label: "Specific Invoice",
                                    },
                                  ]}
                                  disabled={userID ? false : true}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        )}
                      {guestid &&
                      guestid === "create" &&
                      invoiceid &&
                      invoiceid === "money-receipt" &&
                      type &&
                      type === "all" &&
                      recieptType === "invoice" ? (
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
                                options={invoiceList}

                                // disabled={!form.getFieldValue("payment_type_partial")}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      <Row align={"middle"} justify={"center"}>
                        {/* account */}
                        <Col xs={24} sm={12} md={24} lg={20} xl={12} xxl={12}>
                          <Form.Item
                            label="Account Name"
                            name="ac_tr_ac_id"
                            rules={[
                              { required: true, message: "Select Account" },
                            ]}
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
                            rules={[
                              { required: true, message: "Enter Amount" },
                            ]}
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
                            rules={[
                              { required: true, message: "Enter Details" },
                            ]}
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
                    </>
                  )}
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateMoneyReceiptV2;
