import { Col, Form, InputNumber, Row, Select } from "antd";

import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { useCreatePayRollMonthAndSalaryTypeMutation } from "../api/PayRollMonthAndSalaryEndPoints";
import { useWatch } from "antd/es/form/Form";

const CreatePayrollMonthAndHour = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [_totalWorkingHours, setTotalWorkingHours] = useState<
    number | undefined
  >(undefined);
  const [createPayRollMonthAndSalary, { isLoading, isSuccess }] =
    useCreatePayRollMonthAndSalaryTypeMutation();
  const Total_workings_days = useWatch("total_workings_days", form);
  const Hour_per_day = useWatch("hour_per_day", form);

  useEffect(() => {
    if (Total_workings_days && Hour_per_day) {
      const totalHours = Total_workings_days * Hour_per_day;
      setTotalWorkingHours(totalHours);
      form.setFieldsValue({ hours: totalHours });
    }
  }, [Total_workings_days, Hour_per_day]);
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // navigate(`/expense/expense-head-list`);
      cardhandleCancel();
    }
  }, [form, isSuccess]);
  const onFinish = (values: any) => {
    const CreatePayroolMonth = {
      name: values.name,
      hours: values.hours,
      days: values.total_workings_days,
    };

    createPayRollMonthAndSalary(CreatePayroolMonth as any);
  };
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ width: "100%" }}
      >
        <Row
          align={"middle"}
          // justify="end"
          gutter={[10, 16]}
          style={{ width: "100%" }}
        >
          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              name="name"
              label="Select Month"
              rules={[
                {
                  required: true,
                  message: "Please input your Account Name",
                  whitespace: true,
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                // showSearch
                placeholder="Search to Select"
                // optionFilterProp="children"
                // filterOption={(input, option) =>
                //   (option?.label ?? "").includes(input)
                // }
                // filterSort={(optionA, optionB) =>
                //   (optionA?.label ?? "")
                //     .toLowerCase()
                //     .localeCompare((optionB?.label ?? "").toLowerCase())
                // }
                options={[
                  {
                    value: "January",
                    label: "January",
                  },
                  {
                    value: "February",
                    label: "February",
                  },
                  {
                    value: "March",
                    label: "March",
                  },
                  {
                    value: "April",
                    label: "April",
                  },
                  {
                    value: "May",
                    label: "May",
                  },
                  {
                    value: "June",
                    label: "June",
                  },
                  {
                    value: "July",
                    label: "July",
                  },
                  {
                    value: "August",
                    label: "August",
                  },
                  {
                    value: "September",
                    label: "September",
                  },
                  {
                    value: "October",
                    label: "October",
                  },
                  {
                    value: "November",
                    label: "November",
                  },
                  {
                    value: "December",
                    label: "December",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              name="total_workings_days"
              label="Enter Total Working Days"
              rules={[
                {
                  required: true,
                  //   message: "Please input your Account Name",
                  //   whitespace: true,
                },
              ]}
            >
              <InputNumber
                min={1}
                max={31}
                style={{ width: "100%" }}
                placeholder="Enter Total Working Days"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              name="hour_per_day"
              label="Enter Total Work Hour Per Day"
              rules={[
                {
                  required: true,
                  //   message: "Please input your Account Name",
                  //   whitespace: true,
                },
              ]}
            >
              <InputNumber
                min={1}
                max={24}
                style={{ width: "100%" }}
                placeholder="Enter Total Work Hour Per Day"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              name="hours"
              label="Total Working Hours Per Month"
              rules={[
                {
                  required: true,
                  //   message: "Please input your Account Name",
                  //   whitespace: true,
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Total Working Hours Per Month"
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>
        <Row align={"middle"} justify="end">
          <SubmitButton loading={isLoading} />
        </Row>
      </Form>
      {/* </Card> */}
    </>
  );
};

export default CreatePayrollMonthAndHour;
