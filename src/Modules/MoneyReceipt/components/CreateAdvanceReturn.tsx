/* eslint-disable @typescript-eslint/no-explicit-any */
/*
@file CreateExpense.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
import {
  Form,
  Row,
  Col,
  Breadcrumb,
  Button,
  Input,
  Card,
  DatePicker,
  Select,
  InputNumber,
  Alert,
} from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { HomeOutlined, SendOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";

import { RiAddFill } from "react-icons/ri";

import dayjs from "dayjs";

import TextArea from "antd/es/input/TextArea";
import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";
import { useGetCustomerListQuery } from "../../Customer/api/CustomerEndPoints";
import { useCreateAdvanceReturnMutation } from "../api/MoneyReceiptEndPoints";
import { IViewCustomer } from "../../Customer/types/CustomerTypes";
import { useForm, useWatch } from "antd/es/form/Form";
import { useGetMeQuery } from "../../../app/api/userApi/userApi";
import { CommonHeaderStyles } from "../../../common/style/Style";
const CreateAdvanceReturn = () => {
  const { data: user } = useGetMeQuery();
  const userId = user?.data?.id;
  const [account, _setFilter] = useState<any>({
    admin_id: userId,
  });
  const [_dummy, _setDummy] = useState<any>({});
  const [bankList, setBankTypeList] = useState<any>([]);
  const [guestList, setGuestList] = useState<any>([]);
  const [paymentCompare, setPaymentCompare] = useState<any>();
  const [Compare, setCompare] = useState<any>();
  const [filterValue, setFilterValue] = useState<any>({});
  // const [amount, setAmount] = useState<number[]>([]);
  // const [totalAmount, setTotalAmount] = useState(0);

  //   const [form] = Form.useForm();
  const [form] = useForm();
  const navigate = useNavigate();
  const [createAdvanceReturn, { isSuccess }] = useCreateAdvanceReturnMutation();
  const { data: accountList } = useGetAccountListQuery(account);

  const { data: guestlist } = useGetCustomerListQuery(filterValue);

  // const handleAmount = (value: number) => {
  //   if (value) {
  //     setAmount((prev) => [...prev, parseFloat(value.toString())]);
  //   }
  // };

  // useEffect(() => {
  //   if (amount.length > 0) {
  //     const sum = amount.reduce(
  //       (previousValue, currentValue) => previousValue + currentValue,
  //       0
  //     );
  //     setTotalAmount(sum);
  //   }
  // }, [amount]);
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
          value: value.id,
          //   label: value.name,
          label: `${value.name} (${value.email})`,
          last_balance: value.last_balance,
          key: `room_${value.name}_${index}`,
        })) || [];
      setGuestList(GuestList);
    }
  }, [guestlist]);
  useEffect(() => {
    if (paymentCompare) {
      if (parseInt(paymentCompare?.last_balance, 10) <= 0) {
        setCompare(true);
        // form.setFieldValue(
        //   "return_amount",
        //   parseInt(paymentCompare?.last_balance, 10)
        // );
      } else {
        setCompare(null);
        // form.resetFields(["return_amount"]);
      }
    }
  }, [paymentCompare]);
  const DuePayment = (allvalues: any) => {
    if (guestlist && guestlist?.data) {
      const matchPayment: IViewCustomer | undefined = guestlist?.data.find(
        (find: any) => find.id === allvalues
      );

      if (matchPayment) {
        setPaymentCompare(matchPayment);
      }
    }
  };
  //   const CompareDue = () => {
  //     if (
  //       parseInt(paymentCompare?.last_balance, 10) < 0 ||
  //       parseInt(paymentCompare?.last_balance, 10) === 0
  //     ) {
  //       setCompare(true);
  //     } else {
  //       setCompare(false);
  //     }
  //   };
  useEffect(() => {
    if (paymentCompare) {
      // const userID = Number(guestlist?.data[0].id);
      form.setFieldValue("last_balance", paymentCompare?.last_balance);
    } else if (paymentCompare === undefined) {
      form.resetFields(["last_balance"]);
    }
  }, [paymentCompare]);
  useEffect(() => {
    if (filterValue) {
      // const userID = Number(guestlist?.data[0].id);
      // form.setFieldValue("user_id", userID);
      form.resetFields(["user_id", "last_balance"]);
    }
    // else if (guestlist?.data?.length === 0) {
    //   form.resetFields(["user_id"]);
    // }
  }, [filterValue]);
  const onFinish = (values: any) => {
    const createExpenseItem = {
      user_id: values.user_id ? values.user_id : 0,
      remarks: values?.remarks ? values?.remarks : "",
      return_date: dayjs(values.return_date).format("YYYY-MM-DD"),
      ac_tr_ac_id: values.ac_tr_ac_id ? values.ac_tr_ac_id : 0,
      return_amount: values.return_amount ? values.return_amount : 0,
      //   expense_item: values?.expense_item?.map((item: any) => ({
      //     name: item.name,
      //     amount: item.amount,
      //   })),
    };

    createAdvanceReturn(createExpenseItem as any);
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate(`/money-receipt/advance-return`);
    }
  }, [form, isSuccess]);
  const onSearch = (_value: string) => {};

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const userID = useWatch("user_id", form);

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: "60px", marginTop: "20px" }}
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
            href: "",
            title: (
              <div className="flex items-center gap-1">
                {/* <AppstoreOutlined style={{ color: "#20a09e" }} /> */}
                <RiAddFill color="#20a09e" size="15" />
                <span className="text-[#20a09e] font-semibold">
                  Add Advance PAymnt
                </span>
              </div>
            ),
          },
        ]}
      />

      <hr className="my-5  border-[#01adad]" />

      <div className="flex justify-start mb-5 ">
        <Link
          to={`/money-receipt/advance-return`}
          className="flex justify-center items-center hover:text-white"
        >
          <Button
            icon={<FaArrowLeft />}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Return to Advance Payment List
          </Button>
        </Link>
      </div>
      <Card
        title={
          <span style={CommonHeaderStyles as any}>Add Advance Return</span>
        }
      >
        <Form
          name="expense"
          onFinish={onFinish}
          style={{ width: "100%" }}
          form={form}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            expense_item: [{ name: undefined, amount: undefined }],
          }}
        >
          <Row align={"top"} gutter={[8, 16]}>
            {/* name */}
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="ac_tr_ac_id"
                rules={[
                  { required: true, message: "Please select Account Name" },
                ]}
                label="Account Name"
                required
              >
                <Select
                  // style={{ width: "400px" }}
                  showSearch
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={filterOption}
                  placeholder="Select account name"
                  options={bankList}
                  allowClear
                  // onChange={(value) =>
                  //   handleFilterChange(
                  //     { ac_tr_ac_id_partial: value },
                  //     form.getFieldsValue()
                  //   )
                  // }
                  // disabled={!form.getFieldValue("payment_type_partial")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
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

            {/* type */}
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="user_id"
                rules={[
                  { required: true, message: "Please select Guest Name" },
                ]}
                label="Guest Name"
                required
              >
                <Select
                  placeholder="Enter the Name"
                  showSearch
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={guestList}
                  onChange={(value) => DuePayment(value)}
                  allowClear
                  //   onChange={(value) =>
                  //     setFilter({
                  //       ...filter,
                  //       user_id: value ? value : "",
                  //     })
                  //   }
                />
              </Form.Item>
            </Col>
            {userID ? (
              <Col xs={24} sm={24} md={8}>
                {/* <div className="flex items-center gap-3 lg:mt-8 ml-0 lg:ml-7 font-semibold">
                  <span> Last Balance :</span>
                  <span>
                    {paymentCompare?.last_balance
                      ? paymentCompare?.last_balance
                      : 0}
                  </span>
                </div> */}
                <Form.Item name="last_balance" label="Last Balance">
                  <Input
                    placeholder="Enter Return Amount"
                    type="number"
                    readOnly
                  />
                </Form.Item>
              </Col>
            ) : null}

            {/* Return Ammount */}
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="return_amount"
                rules={[{ required: true, message: "Please Return Amount" }]}
                label="Return Amount"
                required
              >
                <InputNumber
                  min={0}
                  placeholder="Enter Return Amount"
                  type="number"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            {/* Account Number */}
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="return_date"
                rules={[
                  { required: true, message: "Please select Return Date" },
                ]}
                label="Return Date"
                required
                style={{ width: "100%" }}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            {/* Details*/}
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="remarks"
                rules={[
                  { required: true, message: "Please enter Payment Details" },
                ]}
                label="Payment Details"
                required
              >
                <TextArea allowClear placeholder="Details" />
              </Form.Item>
            </Col>
          </Row>
          {Compare ? (
            <Col xs={24} sm={24} md={8}>
              <Alert
                message=" Ensure that the final balance is both positive and greater than
              zero."
                type="warning"
                showIcon
              />
            </Col>
          ) : (
            <Form.Item style={{ marginTop: "1rem" }}>
              <Button
                htmlType="submit"
                icon={<SendOutlined />}
                style={{
                  backgroundColor: "#01adad",
                  color: "white",
                  borderRadius: "50px",
                  width: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                disabled={Compare ? true : false}
              >
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </Card>
    </>
  );
};

export default CreateAdvanceReturn;
