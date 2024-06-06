import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  UploadFile,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { RcFile } from "antd/es/upload";
import { DatePickerProps } from "antd/lib";
import { useEffect, useState } from "react";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { useGetEmployeeQuery } from "../../Employee/api/EmployeeEndPoint";
import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";
import { useForm, useWatch } from "antd/es/form/Form";
// import { useCreatePayrollMutation } from "../api/PayrollEndPoints";
import dayjs from "dayjs";
import { useCreatePayrollMutation } from "../api/HotelPayrollEndPoints";
import { useGetPayRollMonthAndSalaryTypelistQuery } from "../../Settings/api/PayRollMonthAndSalaryEndPoints";
import { useGetMeQuery } from "../../../app/api/userApi/userApi";

// import { useCreateRoomTypeMutation } from "../api/RoomTypesEndPoint";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreatePayroll = ({ cardhandleCancel }: any) => {
  const { data: user } = useGetMeQuery();
  const userId = user?.data?.id;

  const [filter, _setFilter] = useState<any>({
    admin_id: userId,
    status: 1,
  });
  const [form] = useForm();
  const [createPayroll, { isSuccess }] = useCreatePayrollMutation();
  const { data: employee } = useGetEmployeeQuery("");
  const { data: accountList } = useGetAccountListQuery(filter);
  const { data: payrollMonthAndHours } =
    useGetPayRollMonthAndSalaryTypelistQuery("");

  const [fileList, setFileList] = useState<any>([]);
  // const [bankList, setBankTypeList] = useState<any>([]);
  const [attendence, setAttendence] = useState<number | undefined>(undefined);
  const [method, setMethod] = useState<string>("");
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const [selectedAccountId, setSelectedAccountId] = useState<number>(0);
  const [totalDeductionID, setTotalDeduction] = useState<number>(0);
  const [totalOtherID, setTotalOther] = useState<number>(0);
  const [totalSalary, setTotalSalary] = useState<number>(0);
  const [totalDailySalary, setTotalDailySalary] = useState<number>(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const Select_month = useWatch("select_month", form);
  const selectedMonth = payrollMonthAndHours?.data?.find(
    (month) => month.id === Select_month
  );
  console.log("Select_month", Select_month);
  console.log("selectedMonth", selectedMonth);
  useEffect(() => {
    if (selectedMonth) {
      form.setFieldsValue({
        hours_per_month: selectedMonth?.hours,
      });
    }
  }, [selectedMonth, form]);

  const findMethod = accountList?.data?.filter(
    (sMethod: any) => sMethod.ac_type === method
  );

  const findValue = employee?.data?.find(
    (sData) => sData.id === selectedGroupId
  );

  const findAvailableBalance = accountList?.data?.find(
    (sMethod: any) => sMethod.id === selectedAccountId
  );

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();

      setFileList([]); // Reset file list too

      cardhandleCancel();
    }
  }, [isSuccess]);

  const grossSalary = useWatch("gross_salary", form) || 0;
  const grossDailySalary = useWatch("gross_salary_daily", form) || 0;
  // const deductionsAmount = useWatch("deduction_amount", form) || 0;
  const AMOUNT = useWatch("deductions", form);
  const OTHER_AOMUNT = useWatch("others", form);
  const advanceSalary = useWatch("advance_salary", form) || 0;
  const providentFUnd = useWatch("provident_fund", form) || 0;
  const mobileBil = useWatch("mobile_bill", form) || 0;
  const feedAllowance = useWatch("feed_allowance", form) || 0;
  const performBonus = useWatch("perform_bonus", form) || 0;
  const festivalBonus = useWatch("festival_bonus", form) || 0;
  const travelAllowance = useWatch("travel_allowance", form) || 0;
  const healthAllowance = useWatch("health_allowance", form) || 0;
  const incentive = useWatch("incentive", form) || 0;
  const houseRent = useWatch("house_rent", form) || 0;
  const SALARY_TYPE = useWatch("select_salary_type", form);
  const Attendance_days_daily = useWatch("attendance_days_daily", form);

  const Daily_salary = useWatch("daily_salary", form);

  console.log("Hours", OTHER_AOMUNT?.[0]?.hours);

  const TotalDeduction = AMOUNT
    ? AMOUNT.reduce(
        (sum: number, item: any) =>
          sum + parseFloat(item?.deduction_amount || 0),
        0
      )
    : 0;

  useEffect(() => {
    setTotalDeduction(TotalDeduction);
  }, [TotalDeduction]);

  const TotalOtherAmount = OTHER_AOMUNT
    ? OTHER_AOMUNT.reduce(
        (sum: number, item: any) => sum + parseFloat(item?.other_amount || 0),
        0
      )
    : 0;

  useEffect(() => {
    setTotalOther(TotalOtherAmount);
  }, [TotalOtherAmount]);

  useEffect(() => {
    if (method) {
      form.resetFields(["ac_tr_ac_id"]);
    }
  }, [method]);

  useEffect(() => {
    setTotalSalary(
      grossSalary -
        totalDeductionID -
        // deductionsAmount -
        advanceSalary -
        providentFUnd +
        parseFloat(mobileBil) +
        parseFloat(feedAllowance) +
        parseFloat(performBonus) +
        parseFloat(festivalBonus) +
        parseFloat(travelAllowance) +
        parseFloat(healthAllowance) +
        parseFloat(incentive) +
        parseFloat(houseRent) +
        totalOtherID
    );
    // console.log("totallll", totalSalary);
  }, [
    advanceSalary,
    totalDeductionID,

    // deductionsAmount,
    form,
    grossSalary,
    totalSalary,
    providentFUnd,
    mobileBil,
    feedAllowance,
    performBonus,
    festivalBonus,
    travelAllowance,
    healthAllowance,
    incentive,
    houseRent,
    totalOtherID,
  ]);
  // .....total salary daily BsAsterisk.............
  useEffect(() => {
    setTotalDailySalary(
      grossDailySalary -
        totalDeductionID -
        // deductionsAmount -
        advanceSalary -
        providentFUnd +
        parseFloat(mobileBil) +
        parseFloat(feedAllowance) +
        parseFloat(performBonus) +
        parseFloat(festivalBonus) +
        parseFloat(travelAllowance) +
        parseFloat(healthAllowance) +
        parseFloat(incentive) +
        parseFloat(houseRent) +
        totalOtherID
    );
    // console.log("totallll", totalSalary);
  }, [
    advanceSalary,
    totalDeductionID,

    // deductionsAmount,
    form,
    grossDailySalary,
    totalDailySalary,
    providentFUnd,
    mobileBil,
    feedAllowance,
    performBonus,
    festivalBonus,
    travelAllowance,
    healthAllowance,
    incentive,
    houseRent,
    totalOtherID,
  ]);
  useEffect(() => {
    if (findAvailableBalance) {
      form.setFieldValue(
        "available_balance",
        Number(findAvailableBalance?.available_balance).toFixed(2)
      );
    }
  }, [findAvailableBalance, form]);

  useEffect(() => {
    if (SALARY_TYPE && SALARY_TYPE === "hourly" && findValue && findMethod) {
      // form.setFieldValue("base_salary", findValue.salary);
      form.setFieldValue(
        "daily_salary",
        (Number(findValue.salary) / Number(selectedMonth?.hours)).toFixed(2)
      );
      form.setFieldValue(
        "gross_salary",
        (
          (Number(findValue.salary) / Number(selectedMonth?.hours)) *
          (attendence ?? 0)
        ).toFixed(2)
      );

      form.setFieldValue("total_salary", Number(totalSalary).toFixed(2));
    } else if (
      SALARY_TYPE &&
      SALARY_TYPE === "daily" &&
      findValue &&
      findMethod
    ) {
      // form.setFieldValue("base_salary", findValue.salary);
      form.setFieldValue(
        "daily_salary_day",
        (Number(findValue.salary) / 30).toFixed(2)
      );
      form.setFieldValue(
        "gross_salary_daily",
        Number(
          (Number(findValue?.salary) / 30) * (Attendance_days_daily ?? 0)
        ).toFixed(2)
      );

      form.setFieldValue(
        "total_daily_salary",
        Number(totalDailySalary).toFixed(2)
      );
    }
  }, [
    selectedGroupId,
    form,
    findValue,
    attendence,
    findMethod,
    totalSalary,
    selectedMonth,
    SALARY_TYPE,
    Attendance_days_daily,
  ]);
  useEffect(() => {
    if (findValue) {
      form.setFieldValue("base_salary", findValue?.salary);
    }
  }, [findValue]);

  // const navigate = useNavigate();
  //   const [createRoomTypes, { isLoading, isSuccess }] =
  // useCreateRoomTypeMutation();
  //   useEffect(() => {
  //     if (isSuccess) {
  //       form.resetFields();
  //       // navigate(`/expense/expense-head-list`);
  //       cardhandleCancel();
  //     }
  //   }, [cardhandleCancel, form, isSuccess]);

  useEffect(() => {
    if (SALARY_TYPE && SALARY_TYPE === "hourly") {
      form.setFieldsValue({
        others: [
          {
            other_amount: Math.floor(
              Number(Daily_salary) * Number(OTHER_AOMUNT?.[0]?.hours) || 0
            ),
            hours: OTHER_AOMUNT?.[0]?.hours || 0,
          },
        ],
      });
    } else {
      form.setFieldsValue({
        others: [{}],
      });
    }
  }, [SALARY_TYPE, Daily_salary, OTHER_AOMUNT?.[0]?.hours, form]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    // console.log("val", values);
    const {
      deductions,
      others,
      base_salary,
      daily_salary,
      method,
      available_balance,
      salary_date,
      select_month,
      hours_per_month,
      select_salary_type,
      daily_salary_day,
      attendance_days,
      attendance_days_daily,
      gross_salary,
      gross_salary_daily,
      total_salary,
      total_daily_salary,
      ...rest
    } = values;

    if (salary_date) {
      formData.append("salary_date", dayjs(salary_date).format("YYYY-MM-DD"));
    }

    if (fileList && fileList.fileList && fileList.fileList[0]?.originFileObj) {
      formData.append("docs", fileList.fileList[0].originFileObj);
    }
    if (deductions && deductions.length > 0) {
      formData.append("deductions", JSON.stringify(deductions));
    }
    if (others && others.length > 0) {
      formData.append("others", JSON.stringify(others));
    }
    // ..............daily...........................................
    if (SALARY_TYPE && SALARY_TYPE === "daily" && attendance_days_daily) {
      formData.append("attendance_days", attendance_days_daily);
    }
    if (SALARY_TYPE && SALARY_TYPE === "daily" && gross_salary_daily) {
      formData.append("gross_salary", gross_salary_daily);
    }
    if (SALARY_TYPE && SALARY_TYPE === "daily" && total_daily_salary) {
      formData.append("total_salary", total_daily_salary);
    }
    // ...............Hourly......................
    if (SALARY_TYPE && SALARY_TYPE === "hourly" && attendance_days) {
      formData.append("working_hours", attendance_days);
    }
    if (SALARY_TYPE && SALARY_TYPE === "hourly" && gross_salary) {
      formData.append("gross_salary", gross_salary);
    }
    if (SALARY_TYPE && SALARY_TYPE === "hourly" && total_salary) {
      formData.append("total_salary", total_salary);
    }
    // if (values.deductions) {
    //   values.deductions.forEach((deduction: any, index: number) => {
    //     formData.append(
    //       // `deductions[${index}].deduction_amount`,
    //       `deduction_amount`,
    //       deduction.deduction_amount
    //     );
    //     formData.append(
    //       // `deductions[${index}].deduction_reason`,
    //       `deduction_reason`,
    //       deduction.deduction_reason
    //     );
    //   });
    // }

    // if (values.others) {
    //   values.others.forEach((other: any, index: number) => {
    //     formData.append(`other_amount`, other.other_amount);
    //     formData.append(`other_details`, other.other_details);
    //   });
    // }
    for (const key in rest) {
      if (rest[key]) {
        formData.append(key, rest[key]);
      }
    }

    if (
      Number(available_balance) >= Number(values.total_salary) ||
      Number(available_balance) >= Number(values.total_daily_salary)
    ) {
      createPayroll(formData);
    } else {
      message.error("Insufficient balance");
    }

    // console.table(Object.fromEntries(formData));
  };

  //   console.log("asas", findMethod);

  const onChange: DatePickerProps["onChange"] = (
    date: any,
    dateString: any
  ) => {
    console.log(date, dateString);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  // function disabledDate(current: any) {

  //   return current && current < moment().startOf("day");
  // }

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="px-2 py-10"
      >
        <Row
          align={"middle"}
          justify={"start"}
          gutter={[20, 16]}
          style={{ width: "100%" }}
        >
          {/* Employee name */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item
              label="Employee Name"
              name="employee_id"
              rules={[
                {
                  required: true,
                  message: "Enter your Employee Name",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select Employee Name"
                onChange={(e) => {
                  setSelectedGroupId(e);
                }}
              >
                {employee?.data?.map((sData) => (
                  <Select.Option key={sData?.id} value={sData?.id}>
                    {sData?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {/* Base Salary */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item label="Base Salary" name="base_salary">
              <Input type="number" placeholder="Enter Base Salary" readOnly />
            </Form.Item>
          </Col>
          {/* Select Salary Type */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item label="Select Salary Type" name="select_salary_type">
              <Select placeholder="Select Salary Type">
                <Select.Option value="daily">Daily Basis</Select.Option>
                <Select.Option value="hourly">Hourly Basis</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          {SALARY_TYPE && SALARY_TYPE === "hourly" ? (
            <>
              {/* Select Month */}
              <Col xs={24} sm={24} md={10} lg={6}>
                <Form.Item label="Select Month" name="select_month">
                  <Select placeholder="Select Month">
                    {payrollMonthAndHours?.data?.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.month_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {/* Total Hours Per Month*/}
              <Col xs={24} sm={24} md={10} lg={6}>
                <Form.Item label="Total Hours Per Month" name="hours_per_month">
                  <Input
                    type="text"
                    placeholder="Enter Daily Salary"
                    // defaultValue={selectedMonth?.hours}
                    readOnly
                  />
                </Form.Item>
              </Col>
              {/* Daily Salary */}
              <Col xs={24} sm={24} md={10} lg={6}>
                <Form.Item label="Payment Per Hour" name="daily_salary">
                  <Input
                    type="number"
                    placeholder="Enter Daily Salary"
                    readOnly
                  />
                </Form.Item>
              </Col>
              {/* Attendance (Hourly) */}
              <Col xs={24} sm={24} md={10} lg={6}>
                <Form.Item
                  label="Employee's Working Hours per Month"
                  name="attendance_days"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (selectedMonth && value > selectedMonth?.hours) {
                          return Promise.reject(
                            `Employee's working hours per month cannot exceed ${selectedMonth?.hours} hours`
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                    {
                      required: true,
                      message: "Enter your employee's working hours per month",
                    },
                  ]}
                  // rules={[
                  //   {
                  //     required: true,
                  //   },
                  // ]}
                >
                  <Input
                    onChange={(e) =>
                      setAttendence(parseInt(e.target.value, 10))
                    }
                    type="number"
                    placeholder="Enter Attendance (Days)"
                  />
                </Form.Item>
              </Col>
              {/* Gross Salary */}
              <Col xs={24} sm={24} md={10} lg={6}>
                <Form.Item label="Gross Salary" name="gross_salary">
                  <Input
                    type="number"
                    placeholder="Enter Gross Salary"
                    readOnly
                  />
                </Form.Item>
              </Col>
            </>
          ) : (
            <>
              {/* Daily Salary */}
              <Col xs={24} sm={24} md={10} lg={6}>
                <Form.Item label="Payment Per Day" name="daily_salary_day">
                  <Input
                    type="number"
                    placeholder="Enter Daily Salary"
                    readOnly
                  />
                </Form.Item>
              </Col>
              {/* Attendance (Days) */}
              <Col xs={24} sm={24} md={10} lg={6}>
                <Form.Item
                  label="Employee's Working Days Per Month"
                  name="attendance_days_daily"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (value > 31) {
                          return Promise.reject(
                            `Employee's working day cannot exceed 31 days`
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                    {
                      required: true,
                      message: "Enter your employee's working days per month",
                    },
                  ]}
                  // rules={[
                  //   {
                  //     required: true,
                  //   },
                  // ]}
                >
                  <Input type="number" placeholder="Enter Attendance (Days)" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={10} lg={6}>
                <Form.Item label="Gross Salary" name="gross_salary_daily">
                  <Input
                    type="number"
                    placeholder="Enter Gross Salary"
                    readOnly
                  />
                </Form.Item>
              </Col>
            </>
          )}

          {/* Method */}
          <Col xs={24} sm={24} md={10} lg={6}>
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
                onChange={(e) => setMethod(e)}
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
          {/* Accounts*/}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item
              label="Accounts"
              name="ac_tr_ac_id"
              rules={[
                {
                  required: true,
                  message: "Enter your Accounts",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select Account"
                onChange={(e) => {
                  setSelectedAccountId(e);
                }}
              >
                {findMethod?.map((sData: any, index: number) => (
                  <Select.Option key={index} value={sData?.id}>
                    {sData?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Available Balance*/}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item label="Available Balance" name="available_balance">
              <Input
                type="text"
                placeholder="Enter Available Balance"
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex  justify-center">
          <Col xs={24} sm={24} md={8}>
            <div className="my-2">
              <h1 className="text-xl font-bold text-center font-serif">
                Deductions
              </h1>
              <div className="flex space-x-10 justify-center">
                <hr className="my-5 w-60  border-gray-400" />
                <hr className="my-5 w-60  border-gray-400" />
              </div>
            </div>
          </Col>
        </div>
        {/* Deductions  */}

        <Row
          align={"top"}
          justify={"start"}
          gutter={[20, 16]}
          style={{ width: "100%" }}
        >
          <Col xs={24} sm={24} md={24} lg={14} xl={10}>
            <Form.List name="deductions" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <Row>
                  {fields.map(({ key, name, ...restField }, index: number) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                      }}
                      align="center"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "deduction_amount"]}
                        label="Deductions Amount"
                      >
                        <InputNumber
                          type="number"
                          placeholder="Enter Deductions Amount"
                          min={0}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "deduction_reason"]}
                        label="Deductions Reasons"
                      >
                        <Input
                          type="text"
                          placeholder="Enter Deductions Reasons"
                        />
                      </Form.Item>
                      {index > 0 ? (
                        <Form.Item>
                          <Button
                            style={{
                              background: "red",
                              color: "#fff",
                              marginLeft: "1rem",
                              marginTop: "2rem",
                            }}
                            onClick={() => remove(name)}
                            icon={<MinusOutlined />}
                          />
                        </Form.Item>
                      ) : (
                        ""
                      )}
                    </Space>
                  ))}

                  <Form.Item
                    style={{
                      marginLeft: "10px",
                      marginTop: "2rem",
                    }}
                  >
                    {fields.length === 1 ? (
                      <Button
                        type="primary"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      ></Button>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      ></Button>
                    )}
                  </Form.Item>
                </Row>
              )}
            </Form.List>
          </Col>

          {/* Advance Salary */}
          <Col xs={24} sm={24} md={10} lg={10} xl={6}>
            <Form.Item label="Advance Salary" name="advance_salary">
              <InputNumber
                type="number"
                placeholder="Enter Advance Salary"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* Provident Fund */}
          <Col xs={24} sm={24} md={10} lg={10} xl={6}>
            <Form.Item label="Provident Fund" name="provident_fund">
              <InputNumber
                type="number"
                placeholder="Enter Provident Fund"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex  justify-center">
          <Col xs={24} sm={24} md={8}>
            <div className="my-2">
              <h1 className="text-xl font-bold text-center font-serif">
                Additions
              </h1>
              <div className="flex space-x-10 justify-center">
                <hr className="my-5 w-60  border-gray-400" />
                <hr className="my-5 w-60  border-gray-400" />
              </div>
            </div>
          </Col>
        </div>
        {/* Additions */}
        <Row
          align={"middle"}
          justify={"start"}
          gutter={[20, 16]}
          style={{ width: "100%" }}
        >
          {/* Mobile Bill */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item label="Mobile Bill" name="mobile_bill">
              <InputNumber
                type="number"
                placeholder="Enter Mobile Bill"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* Feed Allowance*/}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item label="Feed Allowance" name="feed_allowance">
              <InputNumber
                type="number"
                placeholder="Enter Feed Allowance"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* Performance Bonus */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item label="Performance Bonus" name="perform_bonus">
              <InputNumber
                type="number"
                placeholder="Enter Performance Bonus"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* Festival Bonus */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item label="Festival Bonus" name="festival_bonus">
              <InputNumber
                type="number"
                placeholder="Enter Festival Bonus"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* Travel Allowance */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item label="Travel Allowance" name="travel_allowance">
              <InputNumber
                type="number"
                placeholder="Enter Travel Allowance"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* Health Allowance */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item label="Health Allowance" name="health_allowance">
              <InputNumber
                type="number"
                placeholder="Enter Health Allowance"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* Incentive */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item
              label="Incentive"
              name="incentive"
              style={{ width: "100%" }}
            >
              <InputNumber
                type="number"
                placeholder="Enter Incentive"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* House Rent */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item
              label="House Rent"
              name="house_rent"
              style={{ width: "100%" }}
            >
              <InputNumber
                type="number"
                placeholder="Enter House Rent"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={14}>
            <Form.List name="others" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <Row align={"middle"} justify={"start"}>
                  {fields.map(({ key, name, ...restField }, index: number) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                      }}
                      align="center"
                    >
                      {SALARY_TYPE &&
                      SALARY_TYPE === "hourly" &&
                      index === 0 ? (
                        <Form.Item
                          {...restField}
                          name={[name, "hours"]}
                          label="Total OT Hours"
                        >
                          <InputNumber
                            type="number"
                            placeholder={
                              SALARY_TYPE &&
                              SALARY_TYPE === "hourly" &&
                              index === 0
                                ? "Enter OT Hours"
                                : "Enter Other Amount"
                            }
                            min={0}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      ) : (
                        ""
                      )}

                      <Form.Item
                        {...restField}
                        name={[name, "other_amount"]}
                        label={
                          SALARY_TYPE && SALARY_TYPE === "hourly" && index === 0
                            ? "OT Payment "
                            : "Other Amount"
                        }
                      >
                        <InputNumber
                          type="number"
                          placeholder={
                            SALARY_TYPE &&
                            SALARY_TYPE === "hourly" &&
                            index === 0
                              ? "OT Payment"
                              : "Enter Other Amount"
                          }
                          min={0}
                          style={{ width: "100%" }}
                          readOnly={
                            SALARY_TYPE &&
                            SALARY_TYPE === "hourly" &&
                            index === 0
                              ? true
                              : false
                          }
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "other_details"]}
                        label={
                          SALARY_TYPE && SALARY_TYPE === "hourly" && index === 0
                            ? "OT Details"
                            : "Other Reasons"
                        }
                      >
                        <Input
                          type="text"
                          placeholder={
                            SALARY_TYPE &&
                            SALARY_TYPE === "hourly" &&
                            index === 0
                              ? "Enter OT Details"
                              : "Enter Other Reasons"
                          }
                        />
                      </Form.Item>
                      {index > 0 ? (
                        <Form.Item>
                          <Button
                            style={{
                              background: "red",
                              color: "#fff",
                              marginLeft: "1rem",
                              marginTop: "2rem",
                            }}
                            onClick={() => remove(name)}
                            icon={<MinusOutlined />}
                          />
                        </Form.Item>
                      ) : (
                        ""
                      )}
                    </Space>
                  ))}

                  <Form.Item
                    style={{
                      marginLeft: "10px",
                      marginTop: "2rem",
                    }}
                  >
                    {fields.length === 1 ? (
                      <Button
                        type="primary"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      ></Button>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      ></Button>
                    )}
                  </Form.Item>
                </Row>
              )}
            </Form.List>
          </Col>
        </Row>
        <div className="flex  justify-center">
          <Col xs={24} sm={24} md={8}>
            <div className="my-2">
              <h1 className="text-xl font-bold text-center font-serif">
                Net Total and Note
              </h1>
              <div className="flex space-x-10 justify-center">
                <hr className="my-5 w-60  border-gray-400" />
                <hr className="my-5 w-60  border-gray-400" />
              </div>
            </div>
          </Col>
        </div>
        {/* Net Total and Note
         */}
        <Row
          align={"middle"}
          // justify={"start"}
          gutter={[20, 16]}
          style={{ width: "100%" }}
        >
          {/* Salary Date*/}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item
              label="Salary Date"
              name="salary_date"
              rules={[
                {
                  required: true,
                  message: "Enter your Salary Date",
                },
              ]}
              style={{ width: "100%" }}
            >
              <DatePicker
                onChange={onChange}
                style={{ width: "100%" }}
                // disabledDate={disabledDate}
                // defaultValue={dayjs()}
              />
            </Form.Item>
          </Col>
          {SALARY_TYPE && SALARY_TYPE === "hourly" ? (
            <>
              {/* Total Salary*/}
              <Col xs={24} sm={24} md={10} lg={6}>
                <Form.Item
                  style={{ width: "100%" }}
                  label="Total Salary"
                  name="total_salary"
                  rules={[
                    {
                      required: true,
                      message: "Enter your Total Salary ",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Enter Total Salary"
                    defaultValue={totalSalary}
                    readOnly
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </>
          ) : (
            <>
              {/* Total Daily Salary*/}
              <Col xs={24} sm={24} md={10} lg={6}>
                <Form.Item
                  style={{ width: "100%" }}
                  label="Total Salary"
                  name="total_daily_salary"
                  rules={[
                    {
                      required: true,
                      message: "Enter your Total Salary ",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Enter Total Salary"
                    defaultValue={totalDailySalary}
                    readOnly
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </>
          )}

          {/* Upload Docs  */}
          <Col xs={24} sm={24} md={10} lg={6}>
            <Form.Item label="Upload Docs">
              <Upload
                onChange={(fileList: any) => {
                  setFileList(fileList?.fileList);
                }}
                action="/upload.do"
                listType="picture-card"
                onPreview={handlePreview}
                maxCount={5}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Col>
        </Row>
        <Row
          align={"middle"}
          justify={"start"}
          gutter={[20, 16]}
          style={{ width: "100%" }}
        >
          {/* Note*/}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item label="Note" name="note">
              <TextArea placeholder="Note Something" rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row align={"middle"} justify="end">
          <SubmitButton />
          {/* <SubmitButton loading={isLoading} /> */}
        </Row>
      </Form>
      {/* </Card> */}
    </>
  );
};

export default CreatePayroll;
