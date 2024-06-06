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
  Space,
  Button,
  Input,
  Card,
  DatePicker,
  message,
  InputNumber,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateExpenseMutation,
  useGetExpenseHeadlistQuery,
} from "../api/ExpenseEndPoint";
import { useEffect, useState } from "react";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

import { RiAddFill } from "react-icons/ri";
import { DatePickerProps } from "antd/lib";
import dayjs from "dayjs";
import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";
import { useForm, useWatch } from "antd/es/form/Form";
import { useGetMeQuery } from "../../../app/api/userApi/userApi";
import { CommonHeaderStyles } from "../../../common/style/Style";
import useIsMobile from "../../../components/utils/useIsMobile";

const CreateExpense = () => {
  const isMobile = useIsMobile();

  // function disabledDate(current: any) {

  //   return current && current < moment().startOf("day");
  // }
  // const [amount, setAmount] = useState<number[]>([]);
  // const [totalAmount, setTotalAmount] = useState(0);
  const { data: user } = useGetMeQuery();
  const userId = user?.data?.id;
  const [account, setFilter] = useState<any>({
    admin_id: userId,
    status: 1,
  });
  const [expenseTypeList, setExpenseTypeList] = useState<any>([]);
  const [dummy, _setDummy] = useState<any>({});

  const [form] = useForm();
  const [_accountBalance, _setAccountBalance] = useState<number>(0);

  const [_selectedAccountId, setSelectedAccountId] = useState<number>(0);
  const navigate = useNavigate();
  const [createExpense, { isSuccess }] = useCreateExpenseMutation();
  const { data: expenseHeadData } = useGetExpenseHeadlistQuery(dummy);
  const { data: accountList } = useGetAccountListQuery({ ...account });

  const [sum, setSumList] = useState<any>();
  // const Method = useWatch("method", form);
  const ac_tr_ac_ID = useWatch("ac_tr_ac_id", form);

  // console.log("as", findAvailableBalance?.available_balance);

  const findAvailableBalance = accountList?.data?.find(
    (sMethod: any) => sMethod.id === ac_tr_ac_ID
  );

  const onChange: DatePickerProps["onChange"] = (
    _date: any
    // dateString: any
  ) => {
    // console.log(dateString);
  };

  useEffect(() => {
    if (findAvailableBalance) {
      form.setFieldValue(
        "available_balance",
        findAvailableBalance?.available_balance
      );
    } else {
      form.resetFields(["available_balance"]);
    }
  }, [findAvailableBalance, form]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate(`/expense/expense-list`);
    }
  }, [form, isSuccess, navigate]);
  const expenseItem = useWatch("expense_item", form);

  useEffect(() => {
    if (expenseItem) {
      const totalamount = expenseItem?.reduce(
        (sum: any, item: any) =>
          sum + (parseInt(item?.amount ? item?.amount : 0, 10) || 0),
        0
      );

      const ExpenseItem = {
        totalamount,
      };
      setSumList(ExpenseItem);
    } else {
      setSumList(0);
    }
  }, [expenseItem]);

  const onFinish = (values: any) => {
    const createExpenseItem = {
      name: values.name,
      remarks: values?.remarks,
      expense_date: dayjs(values.expense_date).format("YYYY-MM-DD"),
      ac_tr_ac_id: values.ac_tr_ac_id ? values.ac_tr_ac_id : 0,
      expense_item: values?.expense_item?.map((item: any) => ({
        name: item.name,
        amount: item.amount,
        // amount: parseFloat(item.amount),
      })),
    };
    if (values.available_balance < sum?.totalamount) {
      message.warning("Available balance is not sufficient");
    } else if (values.available_balance >= sum?.totalamount) {
      createExpense(createExpenseItem as any);
    }
  };

  useEffect(() => {
    if (expenseHeadData) {
      const ExpenseTypeList =
        expenseHeadData?.data?.map((value: any, index: any) => ({
          value: value.name,
          label: value.name,

          key: `room_${value.name}_${index}`,
        })) || [];
      setExpenseTypeList(ExpenseTypeList);
    }
  }, [expenseHeadData]);
  useEffect(() => {
    if (accountList?.data) {
      const accountId = Number(accountList?.data[0]?.id);
      form.setFieldValue("ac_tr_ac_id", accountId);
    } else if (account?.data?.length === 0) {
      form.resetFields(["ac_tr_ac_id"]);
    }
  }, [form, accountList?.data]);

  const onSearch = (_value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: "40px", marginTop: "20px" }}
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
                <span>Expense</span>
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
                  Add Expense
                </span>
              </div>
            ),
          },
        ]}
      />

      <hr className="my-5  border-[#01adad]" />

      <Link
        to={`/expense/expense-list`}
        className="flex justify-start items-center mb-[20px] hover:text-white"
      >
        <Button
          icon={<FaArrowLeft />}
          style={{
            backgroundColor: "#01adad",
            color: "white",
            borderRadius: "50px",
            // width: "220px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Return to Expense History
        </Button>
      </Link>

      <Card
        title={<span style={CommonHeaderStyles as any}>Create Expense</span>}
      >
        <Form
          form={form}
          name="expense"
          onFinish={onFinish}
          style={{ width: "100%" }}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            expense_item: [{ name: undefined, amount: undefined }],
          }}
          // className="flex justify-center"
        >
          {/* <div className="grid "> */}
          <Row align={"middle"} justify={"center"}>
            <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={8}>
              <Form.List name="expense_item">
                {(fields, { add, remove }) => (
                  <Col>
                    <Row align={"middle"} justify={"center"}>
                      {fields.map(
                        ({ key, name, ...restField }, index: number) => (
                          <Space
                            key={key}
                            style={
                              isMobile?.isMDMobile
                                ? {
                                    display: "flex",
                                    flexDirection: "column",
                                    marginBottom: 8,
                                  }
                                : { display: "flex", marginBottom: 8 }
                            }
                            align="center"
                          >
                            <Form.Item
                              {...restField}
                              label="Head"
                              name={[name, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Head",
                                },
                              ]}
                            >
                              <Select
                                style={{ width: "200px" }}
                                placeholder="Head Name"
                                showSearch
                                optionFilterProp="children"
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={expenseTypeList}
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="Amount"
                              name={[name, "amount"]}
                              rules={[
                                { required: true, message: "Missing Amount" },
                              ]}
                            >
                              <InputNumber
                                min={0}
                                // onBlur={(e: any) => handleAmount(e.target.value)}
                                style={{ width: "200px" }}
                                placeholder="Amount"
                              />
                            </Form.Item>

                            {index > 0 && (
                              <ImCancelCircle
                                style={{ color: "Red" }}
                                className="hover:cursor-pointer"
                                onClick={() => remove(name)}
                              />
                            )}
                          </Space>
                        )
                      )}
                    </Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <Form.Item style={{ width: "100%" }}>
                        <Button
                          // type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined style={{ color: "white" }} />}
                          style={{
                            backgroundColor: "#01adad",
                            color: "white",
                            borderRadius: "50px",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Add More
                        </Button>
                      </Form.Item>
                    </Col>
                  </Col>
                )}
              </Form.List>
            </Col>
          </Row>
          <Row align={"middle"} justify={"center"}>
            <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={8}>
              <Row>
                {/* name */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Select Name" }]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      placeholder="Enter the Name"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                {/* Method */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Form.Item
                    label="Method"
                    name="method"
                    rules={[
                      {
                        required: true,
                        message: "Enter your Method",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select Method"
                      // onChange={(e) => setMethod(e)}
                      onChange={(value) => {
                        setFilter({
                          ...account,
                          ac_type: value,
                        });
                      }}
                    >
                      <Select.Option value="cash">Cash</Select.Option>
                      <Select.Option value="bank">Bank</Select.Option>
                      <Select.Option value="mobile-banking">
                        Mobile Banking
                      </Select.Option>
                      <Select.Option value="cheque">Cheque</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                {/* account */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Form.Item
                    label="Account Name"
                    name="ac_tr_ac_id"
                    rules={[{ required: true, message: "Select Account" }]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select Account"
                      onChange={(e) => {
                        setSelectedAccountId(e);
                      }}
                      disabled={!form.getFieldValue("method")}
                    >
                      {/* {findMethod?.map((sData: any, index: number) => ( */}
                      {accountList?.data?.map((sData: any, index: number) => (
                        <Select.Option key={index} value={sData?.id}>
                          {sData?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                {/* Remarks */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Form.Item label="Remarks" name="remarks">
                    <Input
                      type="text"
                      style={{ width: "100%" }}
                      placeholder="Remarks"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                {/* available balance */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Form.Item label="Available Balance" name="available_balance">
                    <Input
                      style={{ width: "100%" }}
                      type="text"
                      placeholder="Enter Available Balance"
                      readOnly={true}
                      disabled={!form.getFieldValue("method")}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ width: "100%" }}>
                {/* expense_date */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Form.Item label="Expense Date" name="expense_date">
                    <DatePicker
                      onChange={onChange}
                      style={{ width: "100%" }}
                      // disabledDate={disabledDate}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* </div> */}
          <Row align={"middle"} justify={"center"}>
            <Form.Item>
              <Button
                htmlType="submit"
                style={{
                  backgroundColor: "#01adad",
                  color: "white",
                  borderRadius: "50px",
                  width: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                Create Expense
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Card>
    </>
  );
};
export default CreateExpense;
