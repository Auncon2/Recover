import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Tag,
  TimePicker,
  message,
} from "antd";

import { useForm, useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";
import { FaHotel, FaMoneyBillWave } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin2Fill } from "react-icons/ri";

import { useCreateHallBookingMutation } from "../api/HallBookingEndPoints";
import moment from "moment";
import { useGetHallAvailableListQuery } from "../../HallModule/api/HallEndPoints";
import YourHallSelection from "../components/YourHallSelection";
import { useGetMeQuery } from "../../../app/api/userApi/userApi";

const CreateHallBooking = () => {
  const { roomId = "", date_Id, from_Id, to_Id } = useParams();
  const { data: user } = useGetMeQuery();
  const UserId = user?.data?.id;

  function disabledDate(current: any) {
    // Disable dates before today
    return current && current < moment().startOf("day");
  }
  const navigate = useNavigate();
  const [hallBookingData, { isSuccess, isLoading }] =
    useCreateHallBookingMutation();

  const [bookingId, setBookingList] = useState<any>(null);

  const [hallList, setHallTypeList] = useState<any>([]);

  const [bankList, setBankTypeList] = useState<any>([]);

  const [filteredHalls, setFilteredHalls] = useState<any[]>([]);

  const [total, setTotal] = useState<any>({});
  const [totalV2, setTotalV2] = useState<any>({});
  console.log("total", total, "totalV2", totalV2);
  const [filter, setFilter] = useState<any>({
    admin_id: Number(UserId),
    status: 1,
  });
  const [filterValue, setFilterValue] = useState<any>({
    start_time:
      roomId === "make-booking"
        ? dayjs().startOf("day").format("HH:mm:ss")
        : from_Id,
    end_time:
      roomId === "make-booking"
        ? dayjs().endOf("day").format("HH:mm:ss")
        : to_Id,
    event_date:
      roomId === "make-booking" ? dayjs().format("YYYY-MM-DD") : date_Id,
  });
  const [value, setValue] = useState(1);

  const { data } = useGetHallAvailableListQuery(filterValue);

  const { data: accountlistData } = useGetAccountListQuery({ ...filter });

  const [form] = useForm();

  const start_date = useWatch("start_time", form);
  const end_time = useWatch("end_time", form);
  const BOOKING_DATE = useWatch("booking_date", form);
  const EVENT_DATE = useWatch("event_date", form);
  const NAME = useWatch("name", form);
  const EMAIL = useWatch("email", form);
  const PHONE = useWatch("phone", form);
  const TOTAL_OCCUPANCY = useWatch("total_occupancy", form);
  const Payment = useWatch("payment_method", form);
  const DISCOUNT_AMOUNT = useWatch("discount_amount", form);
  const TAX_AMOUNT = useWatch("tax_amount", form);
  const EXTRA_CHARGE = useWatch("extra_charge", form);
  const HALLS = useWatch("halls", form);
  console.log("HALLS", HALLS);
  // Function to calculate the difference in hours start
  const calculateHourDifference = (
    start: moment.Moment | undefined,
    end: moment.Moment | undefined,
    precision: number
  ) => {
    if (!start || !end) {
      return 0;
    }

    // Ensure end time is after start time
    if (end.isBefore(start)) {
      return 0;
    }

    const diffInMilliseconds = end.diff(start);
    const diffInHours = moment.duration(diffInMilliseconds).asHours();
    const roundedDiff = Math.abs(parseFloat(diffInHours.toFixed(precision)));
    const roundedDiffCeiled = Math.round(roundedDiff);
    return roundedDiffCeiled;
  };

  const precision = 2; // Example precision
  const differenceInHours = calculateHourDifference(
    start_date,
    end_time,
    precision
  );
  // Function to calculate the difference in hours end. Use differenceInHours
  console.log("filteredHalls", filteredHalls);
  useEffect(() => {
    if (HALLS && data?.data) {
      const filtered = data?.data.filter((hall: any) =>
        HALLS.includes(hall.hall_id)
      );
      setFilteredHalls(filtered);
    }
  }, [HALLS, data]);
  const Delete_Room = (id: number) => {
    setFilteredHalls(filteredHalls.filter((hall: any) => hall.hall_id !== id));
    // Update the form field value
    form.setFieldsValue({
      halls: HALLS.filter((hallId: number) => hallId !== id),
    });
  };
  useEffect(() => {
    if (HALLS && data?.data) {
      const filtered = data?.data.filter((hall: any) =>
        HALLS.includes(hall.hall_id)
      );
      setFilteredHalls(filtered);

      // Filter out unmatched values from Rooms
      const matchedHallIds = filtered.map((hall: any) => hall.hall_id);
      const updatedHalls = HALLS.filter((hallId: any) =>
        matchedHallIds.includes(hallId)
      );

      // If there are unmatched values, update the form field
      if (updatedHalls.length !== HALLS.length) {
        form.setFieldsValue({ halls: updatedHalls });
      }
    }
  }, [HALLS, data, form]);

  useEffect(() => {
    if (data) {
      const hallTypeList =
        data?.data?.map((value: any, index: any) => ({
          value: value.hall_id,
          label: value.hall_name,
          id: value.hall_id,
          key: `room_${value.hall_name}_${index}`,
        })) || [];
      setHallTypeList(hallTypeList);
    }
  }, [data]);

  useEffect(() => {
    if (accountlistData) {
      const BankType =
        accountlistData?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: value.name,
          id: value.id,
          key: `room_${value.name}_${index}`,
        })) || [];
      setBankTypeList(BankType);
    }
  }, [accountlistData]);
  // .................Rate per hour & total Occupancy Calculation.......................
  useEffect(() => {
    if (filteredHalls) {
      const totalCapacity = filteredHalls.reduce(
        (sum, hall) => sum + hall?.capacity,
        0
      );

      const totalRatePerHour = filteredHalls.reduce(
        (sum, hall) => sum + parseInt(hall?.rate_per_hour, 10),
        0
      );

      setTotal({
        totalCapacity: totalCapacity,

        total_ratePerHour: totalRatePerHour,

        totalSelectedRoomCharge: totalRatePerHour * (differenceInHours || 0),
        totalHallCharge:
          Number(totalRatePerHour * (differenceInHours || 0)) +
          Number(TAX_AMOUNT || 0) +
          Number(EXTRA_CHARGE || 0) -
          Number(DISCOUNT_AMOUNT || 0),
        allSelectedHalls: filteredHalls,
      });
    }
  }, [
    filteredHalls,
    differenceInHours,
    TAX_AMOUNT,
    DISCOUNT_AMOUNT,
    EXTRA_CHARGE,
  ]);
  useEffect(() => {
    setTotalV2({
      email: EMAIL,
      name: NAME,
      phone: PHONE,
      booking_date: BOOKING_DATE,
      event_date: EVENT_DATE,
      inputOccupancy: TOTAL_OCCUPANCY,
      tax: TAX_AMOUNT,
      discount: DISCOUNT_AMOUNT,
      extraCharge: EXTRA_CHARGE,
      modeOfPayment: Payment,
    });
  }, [
    TAX_AMOUNT,
    EXTRA_CHARGE,
    DISCOUNT_AMOUNT,
    EVENT_DATE,
    EMAIL,
    NAME,
    PHONE,
    BOOKING_DATE,
    TOTAL_OCCUPANCY,
    Payment,
  ]);
  useEffect(() => {
    if (roomId != "make-booking" && data?.data) {
      const filteredData = data?.data?.find(
        (item: any) => item.hall_id === parseInt(roomId)
      );

      setBookingList(filteredData?.hall_id);
    }
  }, [roomId, data?.data]);
  useEffect(() => {
    form.setFieldsValue({
      paid_amount_full: Number(total?.totalHallCharge),
    });
  }, [form, total]);
  useEffect(() => {
    if (accountlistData?.data?.length) {
      const accountId = Number(accountlistData?.data[0]?.id);
      form.setFieldValue("ac_tr_ac_id", accountId);
    } else if (accountlistData?.data?.length === 0) {
      form.resetFields(["ac_tr_ac_id"]);
    }
  }, [form, accountlistData?.data]);

  const onFinish = (values: any) => {
    console.log("Success:", values);

    if (
      Payment === 0 &&
      Number(values.ac_tr_ac_id) &&
      values.total_occupancy <= (total?.totalCapacity && total?.totalCapacity)
    ) {
      const CreateHall_full = {
        name: values.name,
        email: values.email || "",
        phone: values.phone || "",
        start_time: dayjs(values.start_time).format("HH:mm:ss"),
        end_time: dayjs(values.end_time).format("HH:mm:ss"),
        booking_date: dayjs(values.booking_date).format("YYYY-MM-DD"),
        event_date: dayjs(values.event_date).format("YYYY-MM-DD"),
        discount_amount: values.discount_amount ? values.discount_amount : 0,
        tax_amount: values.tax_amount ? values.tax_amount : 0,
        check_in: values.check_in ? values.check_in : "0",
        paid_amount: values.paid_amount_full ? values.paid_amount_full : 0,
        payment_type: values.payment_type,
        ac_tr_ac_id: Number(values.ac_tr_ac_id),
        total_occupancy: values.total_occupancy ? values.total_occupancy : 0,
        extra_charge: values.extra_charge ? values.extra_charge : 0,
        booking_halls: values?.halls?.map((item: any) => ({
          hall_id: Number(item),
        })),
      };
      hallBookingData(CreateHall_full as any);
    } else if (
      Payment === 2 &&
      Number(values.ac_tr_ac_id) &&
      values.total_occupancy <= (total?.totalCapacity && total?.totalCapacity)
    ) {
      const CreateHall_partial = {
        name: values.name,
        email: values.email || "",
        phone: values.phone || "",
        start_time: dayjs(values.start_time).format("HH:mm:ss"),
        end_time: dayjs(values.end_time).format("HH:mm:ss"),
        booking_date: dayjs(values.booking_date).format("YYYY-MM-DD"),
        event_date: dayjs(values.event_date).format("YYYY-MM-DD"),
        discount_amount: values.discount_amount ? values.discount_amount : 0,
        tax_amount: values.tax_amount ? values.tax_amount : 0,
        check_in: values.check_in ? values.check_in : "0",
        paid_amount: values.paid_amount_partial
          ? values.paid_amount_partial
          : 0,
        payment_type: values.payment_type,
        ac_tr_ac_id: Number(values.ac_tr_ac_id),
        total_occupancy: values.total_occupancy ? values.total_occupancy : 0,
        extra_charge: values.extra_charge ? values.extra_charge : 0,
        booking_halls: values?.halls?.map((item: any) => ({
          hall_id: Number(item),
        })),
      };
      hallBookingData(CreateHall_partial as any);
    } else if (
      Payment === 1 &&
      values.total_occupancy <= (total?.totalCapacity && total?.totalCapacity)
    ) {
      const CreateRoom_nopayment = {
        name: values.name,
        email: values.email || "",
        phone: values.phone || "",
        start_time: dayjs(values.start_time).format("HH:mm:ss"),
        end_time: dayjs(values.end_time).format("HH:mm:ss"),
        booking_date: dayjs(values.booking_date).format("YYYY-MM-DD"),
        event_date: dayjs(values.event_date).format("YYYY-MM-DD"),
        discount_amount: values.discount_amount ? values.discount_amount : 0,
        tax_amount: values.tax_amount ? values.tax_amount : 0,
        check_in: values.check_in ? values.check_in : "0",
        paid_amount: 0,
        // payment_type: values.payment_type,
        // ac_tr_ac_id: Number(values.ac_tr_ac_id_full),
        total_occupancy: values.total_occupancy ? values.total_occupancy : 0,
        extra_charge: values.extra_charge ? values.extra_charge : 0,
        booking_halls: values?.halls?.map((item: any) => ({
          hall_id: Number(item),
        })),
      };
      hallBookingData(CreateRoom_nopayment as any);
    } else {
      message.error(
        `Total Number of Guests (${
          values.total_occupancy
        }) cannot exceed the Total no. of Hall Capacity (${
          total?.totalCapacity && total?.totalCapacity
        }).`
      );
    }
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();

      navigate(`/hall-booking-list`);
    }
  }, [form, isSuccess, navigate]);

  const onSearch = (_value: string) => {};

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  useEffect(() => {
    if (roomId !== "make-booking" && bookingId) {
      if (from_Id && to_Id) {
        const [hours, minutes, seconds] = from_Id.split(":").map(Number);
        const [hours_to_Id, minutes_to_Id, seconds_to_Id] = to_Id
          .split(":")
          .map(Number);

        const startTime = dayjs().hour(hours).minute(minutes).second(seconds);
        const endTime = dayjs()
          .hour(hours_to_Id)
          .minute(minutes_to_Id)
          .second(seconds_to_Id);

        form.setFieldsValue({
          start_time: startTime,
          end_time: endTime,
          event_date: dayjs(date_Id),
          halls: [parseInt(bookingId)],
        });
      }
    } else if (roomId === "make-booking") {
      form.setFieldsValue({
        start_time: "",
        end_time: "",
        event_date: "",
        bookinhallsg_halls: [],
      });
    }
  }, [roomId, bookingId, from_Id, to_Id, date_Id]);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: "40px" }}
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "/",
            title: (
              <>
                <span>Dashboard</span>
              </>
            ),
          },
          {
            href: "",
            title: (
              <div className="flex gap-1 items-center text-[#01ADAD]">
                <FaHotel size="11" />
                <span>Hall Booking</span>
              </div>
            ),
          },
        ]}
      />
      <div className="flex  gap-5 ">
        <div className="flex flex-col gap-5 w-full ">
          <h2
            className="text-lg font-bold text-[#01adad]"
            style={{ textTransform: "uppercase" }}
          >
            Hall Booking
          </h2>
          <Form
            name="Hall Booking"
            form={form}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            className="w-full"
          >
            <div className="flex gap-4 w-full">
              <div className="flex flex-col w-full">
                {/* ..........................Check in & checkout........................................................... */}
                <Card style={{ marginBottom: "30px", height: "120px" }}>
                  <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={
                          <span className="font-semibold">Start Time</span>
                        }
                        name="start_time"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Select Start time!",
                          },
                        ]}
                      >
                        <TimePicker
                          use12Hours
                          format="h:mm a"
                          style={{ width: "100%" }}
                          onChange={(value) => {
                            handleFilterChange(
                              { start_time: value },
                              form.getFieldsValue()
                            );
                            setFilterValue({
                              ...filterValue,
                              start_time:
                                (value && dayjs(value).format("HH:mm:ss")) ||
                                "",
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={<span className="font-semibold">End Time</span>}
                        name="end_time"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Select End time!",
                          },
                        ]}
                      >
                        <TimePicker
                          use12Hours
                          format="h:mm a"
                          style={{ width: "100%" }}
                          onChange={(value) => {
                            handleFilterChange(
                              { end_time: value },
                              form.getFieldsValue()
                            );
                            setFilterValue({
                              ...filterValue,
                              end_time:
                                (value && dayjs(value).format("HH:mm:ss")) ||
                                "",
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                {/* .................................Guest Informmation........................................................... */}
                <Card
                  style={{
                    boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
                    marginBottom: "1rem",
                  }}
                  // className="mx-[80px] mt-[30px]"
                >
                  {/* .....................name & email................................................... */}
                  <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={
                          <span className="font-semibold">
                            <Radio.Group onChange={onChange} value={value}>
                              <Radio value={1}>Phone</Radio>
                              <Radio value={2}>E-mail</Radio>
                            </Radio.Group>
                          </span>
                        }
                        name={value != 1 ? "email" : "phone"}
                        style={{ width: "100%" }}
                        rules={
                          value != 1
                            ? [
                                {
                                  type: "email",
                                  message: "The input is not valid E-mail!",
                                },
                                {
                                  required: true,
                                  message: "Please input your E-mail!",
                                },
                              ]
                            : [
                                {
                                  required: true,
                                  message: "Please input your Phone!",
                                },
                              ]
                        }
                      >
                        {value != 1 ? (
                          <Input
                            placeholder="Enter valid E-mail"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <Input
                            type="number"
                            placeholder="Enter valid phone number"
                            style={{ width: "100%" }}
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={<span className="font-semibold"> Name</span>}
                        name="name"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input  name!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter  Name"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={
                          <span className="font-semibold">Booking Date</span>
                        }
                        name="booking_date"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Select booking date!",
                          },
                        ]}
                      >
                        <DatePicker
                          format="YYYY-MM-DD"
                          style={{ width: "100%" }}
                          disabledDate={disabledDate}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={
                          <span className="font-semibold">Event Date</span>
                        }
                        name="event_date"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Select booking date!",
                          },
                        ]}
                      >
                        <DatePicker
                          format="YYYY-MM-DD"
                          style={{ width: "100%" }}
                          onChange={(value) => {
                            setFilterValue({
                              ...filterValue,
                              event_date:
                                (value && dayjs(value).format("YYYY-MM-DD")) ||
                                "",
                            });
                          }}
                          disabledDate={disabledDate}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={
                          <span className="font-semibold">Number of Guest</span>
                        }
                        name="total_occupancy"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Number of Guest!",
                          },
                        ]}
                      >
                        <InputNumber
                          placeholder="Enter Number of Guest"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={
                          <span className="font-semibold">Extra Charge</span>
                        }
                        name="extra_charge"
                        style={{ width: "100%" }}
                      >
                        <InputNumber
                          placeholder="Enter extra charge"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={
                          <span className="font-semibold">Discount Amount</span>
                        }
                        name="discount_amount"
                        style={{ width: "100%" }}
                      >
                        <InputNumber
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                          placeholder="Enter discount amount in"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={
                          <span className="font-semibold">Tax Amount</span>
                        }
                        name="tax_amount"
                        style={{ width: "100%" }}
                      >
                        <InputNumber
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                          placeholder="Enter tax amount in"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={
                          <span className="font-semibold">Mode of Payment</span>
                        }
                        name="payment_method"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please select payment!",
                          },
                        ]}
                      >
                        <Select
                          // style={{ width: "400px" }}

                          placeholder="Select Payment"
                          options={[
                            { value: 1, label: "No Payment" },
                            {
                              value: 2,
                              label: "Partial Payment",
                            },
                            {
                              value: 0,
                              label: "Full Payment",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12}>
                      <Form.Item
                        label={
                          <span className="font-semibold">Make Check In</span>
                        }
                        name="check_in"
                        style={{ width: "100%" }}
                      >
                        <Select
                          // style={{ width: "400px" }}
                          defaultValue={"0"}
                          placeholder="Select The Make Check In"
                          options={[
                            {
                              value: "0",
                              label: "No Check In",
                            },
                            {
                              value: "1",
                              label: "Make Check In",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                {/* ..............................................Select Room.................................................................................            */}
                <Card>
                  <Row align={"middle"} justify={"start"}>
                    <Col xs={24} sm={12} md={12} lg={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold">Select Hall</span>
                        }
                        name="halls"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please select a Hall",
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          showSearch
                          placeholder="Select Hall"
                          optionFilterProp="children"
                          onSearch={onSearch}
                          filterOption={filterOption}
                          options={hallList}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[15, 15]}>
                    {filteredHalls &&
                      filteredHalls.map((hall: any, index: any) => (
                        <Col xl={8} xxl={8} key={index}>
                          <Badge.Ribbon
                            text={<h3>Hall : {index + 1}</h3>}
                            color="cyan"
                            placement="start"
                          >
                            <Card
                              extra={
                                <RiDeleteBin2Fill
                                  color="red"
                                  size={20}
                                  onClick={() => Delete_Room(hall.hall_id)}
                                />
                              }
                            >
                              <div className="flex flex-col gap-1">
                                <p
                                  className="text-lg font-bold
                                  
                                  "
                                >
                                  {hall?.hall_name}
                                </p>
                                <div className="flex gap-2 items-baseline text-base font-bold">
                                  <span>Hall Size</span>
                                  <span>{hall?.hall_size}</span>
                                </div>

                                <div className="flex gap-2 items-center text-base font-bold">
                                  <span>
                                    <MdPeopleAlt />
                                  </span>
                                  <span className="font-semibold">
                                    Max {hall?.capacity} People
                                  </span>
                                </div>
                                <div className="flex gap-2 items-center text-base font-bold">
                                  <span>
                                    <MdPeopleAlt />
                                  </span>
                                  <span className="font-semibold">
                                    Location : {hall?.location}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-base font-bold">
                                  <span>
                                    <FaMoneyBillWave />
                                  </span>
                                  <span>Rate Per Hour</span>
                                  <span className="font-bold">-</span>
                                  <span className=" text-slate-500">
                                    {hall?.rate_per_hour &&
                                      hall?.rate_per_hour?.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </Card>
                          </Badge.Ribbon>
                        </Col>
                      ))}
                  </Row>
                </Card>
                {/* .............................................Full/Partial payment............................................................................. */}
                {form.getFieldValue("payment_method") === 0 ||
                form.getFieldValue("payment_method") === 2 ? (
                  <Card style={{ marginBottom: "20px" }}>
                    <div className="flex justify-start  gap-4 border-b-2 border-[#01adad] mb-7 ">
                      <span className=" py-2 text-[#2d9292] font-semibold">
                        {form.getFieldValue("payment_method") === 0
                          ? "Full Payment"
                          : "Partial Payment"}
                      </span>
                    </div>
                    <>
                      <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                        <Col xs={24} sm={12} md={12} lg={12}>
                          <div className="flex gap-3 font-semibold mt-2 mb-5">
                            <span className="font-semibold">Total Cost :</span>
                            <span>{total?.totalHallCharge || 0}</span>
                          </div>
                        </Col>
                      </Row>

                      <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                        <Col xs={24} sm={12} md={12} lg={12}>
                          <Form.Item
                            label={
                              <span className="font-semibold">Paid Amount</span>
                            }
                            name={
                              form.getFieldValue("payment_method") === 0
                                ? "paid_amount_full"
                                : "paid_amount_partial"
                            }
                            style={{ width: "100%" }}
                            rules={[
                              // {
                              //   validator: (_, value) => {
                              //     if (
                              //       parseFloat(value) >
                              //       parseFloat(sum?.totalNetPrice)
                              //     ) {
                              //       return Promise.reject(
                              //         `Paid Amount Can not exceed Total Cost ${parseFloat(
                              //           sum?.totalNetPrice
                              //         )}`
                              //       );
                              //     }
                              //     return Promise.resolve();
                              //   },
                              // },
                              {
                                required: true,
                                message: "Please enter paid amount!",
                              },
                              // {
                              //   validator: validatePaidAmount,
                              // },
                            ]}
                          >
                            <InputNumber
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value!.replace(/\$\s?|(,*)/g, "")
                              }
                              placeholder="Enter paid ammount in"
                              style={{ width: "100%" }}
                              readOnly={
                                form.getFieldValue("payment_method") === 0
                                  ? true
                                  : false
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                          <Form.Item
                            label={
                              <span className="font-semibold">
                                Payment Type
                              </span>
                            }
                            name="payment_type"
                            style={{ width: "100%" }}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Select
                              style={{ width: "100%" }}
                              placeholder="Pay Type"
                              onChange={(value) => {
                                setFilter({
                                  ...filter,
                                  ac_type: value,
                                });

                                // onStatusFilter;
                              }}
                            >
                              <Select.Option value="bank">Bank</Select.Option>
                              <Select.Option value="cash">Cash</Select.Option>
                              <Select.Option value="cheque">
                                Cheque
                              </Select.Option>
                              <Select.Option value="mobile-banking">
                                Mobile Banking
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                        <Col xs={24} sm={12} md={12} lg={12}>
                          <Form.Item
                            label={
                              <span className="font-semibold">
                                Account Name
                              </span>
                            }
                            name="ac_tr_ac_id"
                            style={{ width: "100%" }}
                            rules={[
                              {
                                required:
                                  form.getFieldValue("payment_method") === 0,
                                message: "Please select account name!",
                              },
                            ]}
                          >
                            <Select
                              // style={{ width: "400px" }}

                              placeholder="Select Account Name"
                              options={bankList}
                              disabled={!form.getFieldValue("payment_type")}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  </Card>
                ) : (
                  <Divider />
                )}
              </div>
            </div>

            <Row align={"middle"} justify={"center"} gutter={[4, 15]}>
              <Form.Item wrapperCol={{ offset: 0, span: 18 }} className="ml-1">
                <Button
                  style={{
                    backgroundColor: "#01adad",
                    color: "white",
                    borderRadius: "50px",
                    width: "150px",
                  }}
                  // type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={
                    roomId === "make-booking"
                      ? false
                      : bookingId
                      ? false
                      : filteredHalls.length > 0
                      ? false
                      : true
                  }
                >
                  Confirm Booking
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>

        {/* ..........................Your Selection............................................................... */}

        <YourHallSelection
          total={total}
          totalV2={totalV2}
          start_date={start_date}
          end_time={end_time}
          differenceInHours={differenceInHours}
        />
      </div>
    </>
  );
};

export default CreateHallBooking;
