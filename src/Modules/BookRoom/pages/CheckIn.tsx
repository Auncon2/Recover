/*
Create Account
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  Card,
  Col,
  Row,
  Typography,
  Breadcrumb,
  Select,
  DatePicker,
} from "antd";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
// import { useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { DatePickerProps } from "antd/lib";
import {
  useCreateCheckInMutation,
  useGetAllRoomBookingListQuery,
  useGetRoomBookingGuestListQuery,
} from "../api/RoomBookingEndPoints";
import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";
import { useWatch } from "antd/es/form/Form";

const CheckIn = () => {
  // const navigate = useNavigate();
  // const [dummy, _setDummy] = useState<any>();
  const [guestValue, setGuestValue] = useState<any>("");

  const book: any = { status: "approved", user_id: guestValue };

  // const { data } = useGetCustomerListQuery(dummy);
  const { data } = useGetRoomBookingGuestListQuery();
  console.log("data", data?.data);

  const { data: bookingList } = useGetAllRoomBookingListQuery({ ...book });

  // console.log("asas", bookingList?.data);

  const [createCheckIn, { isSuccess }] = useCreateCheckInMutation();

  const [form] = Form.useForm();
  const NName = useWatch("name", form);
  console.log("NName", NName);
  const onChange: DatePickerProps["onChange"] = (
    _date: any,
    dateString: any
  ) => {
    console.log(dateString);
  };
  useEffect(() => {
    if (bookingList?.data?.length) {
      const accountId = Number(bookingList?.data[0]?.id);
      form.setFieldValue("booking_id", accountId);
    } else if (bookingList?.data?.length === 0) {
      form.resetFields(["booking_id"]);
    }
  }, [form, bookingList?.data]);
  const onFinish = (values: any) => {
    const bookingCheckIn = {
      check_in: dayjs(values.check_in).format("YYYY-MM-DD HH:mm:ss"),
      booking_id: values.booking_id ? values.booking_id : 0,
    };
    createCheckIn(bookingCheckIn);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // navigate(`/check-in-check-out`);
    }
  }, [form, isSuccess]);

  return (
    <>
      <div className="my-5">
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
                  <span>Create Check In</span>
                </>
              ),
            },
            // {
            //   title: <span className="text-[#1B9FA2]">Create Guest</span>,
            // },
          ]}
        />
      </div>

      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
              <Typography.Title level={4}>Check In</Typography.Title>
            </Row>
            <Form onFinish={onFinish} layout="vertical" form={form}>
              <Row align={"middle"} gutter={[20, 16]}>
                {/* Guest Name */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="name"
                    label="Guest Name"
                    rules={[{ required: true }]}
                  >
                    <Select
                      showSearch
                      placeholder="Select Guest Name"
                      optionFilterProp="children"
                      //   onChange={(e) => setFilterValue({ key: e.target.value })}
                      onChange={(value) => {
                        setGuestValue(value);
                        form.setFieldsValue({ booking_id: undefined }); // Reset booking_id when name changes
                      }}
                    >
                      {data?.data?.map((checkIn: any, _index: number) => (
                        <Select.Option
                          value={checkIn.id}
                          // value={`${checkIn.id}-${index + 1}`}
                          setGuestValue={checkIn.id}
                        >
                          {checkIn.name} / {checkIn.email}
                        </Select.Option>
                      ))}
                      {/* {bookingList?.data?.map((checkIn: any) => (
                        <Select.Option
                          value={checkIn.id}
                          setGuestValue={checkIn.user_id}
                          allowClear
                        >
                          {checkIn.name} / {checkIn.email}
                        </Select.Option>
                      ))} */}
                    </Select>
                  </Form.Item>
                </Col>

                {/* booking Number */}
                {guestValue && (
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      name="booking_id"
                      label="Booking Number"
                      style={{ width: "100%" }}
                      rules={[{ required: true }]}
                    >
                      <Select
                        showSearch
                        placeholder="Select Booking Number"
                        optionFilterProp="children"
                      >
                        {bookingList?.data?.map((checkIn: any) => (
                          <Select.Option value={checkIn.id}>
                            {checkIn.booking_no}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                )}

                {/* check_in date */}
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label="Check In"
                    name="check_in"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      // showTime={{ format: "HH:mm:ss" }}
                      showTime={{ format: "h:mm a" }}
                      format="YYYY-MM-DD HH:mm:ss" // Specify the overall format including date and time
                      onChange={onChange}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <SubmitButton />
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckIn;
