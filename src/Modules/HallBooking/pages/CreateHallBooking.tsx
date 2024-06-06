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
  TimePicker,
  message,
} from "antd";
// const { RangePicker } = DatePicker;
import { useForm, useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdRoomService } from "react-icons/md";
import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";
import { FaHotel } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiQuestionFill } from "react-icons/ri";
// import "./RoomBooking.css";
import { useGetPaymentlistQuery } from "../../Payment/api/PaymentMethodEndPoint";
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

  // const [payment, setPayment] = useState(true);
  const [dummy, _setDummyList] = useState<any>([]);
  const [bookingId, setBookingList] = useState<any>(null);
  const [selectedHall, setSelectedHall] = useState<any>(null);
  const [roomList, setRoomTypeList] = useState<any>([]);
  const [_paymentType, setPaymentTypeList] = useState<any>([]);
  const [bankList, setBankTypeList] = useState<any>([]);
  const [bookList, setBookList] = useState<any>([]);
  const [sum, setSumList] = useState<any>({});
  console.log("sum?.totalNetPrice", sum?.totalNetPrice);

  const [roomHistoryList, setRoomHistoryList] = useState<any[]>([]);
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
  const { data: paymenttype } = useGetPaymentlistQuery(dummy);
  const [form] = useForm();
  const tax_amount = useWatch("tax_amount", form);
  const start_date = useWatch("start_time", form);
  const end_time = useWatch("end_time", form);
  const discount_amount = useWatch("discount_amount", form);
  const Payment = useWatch("payment_method", form);
  const extra_charge = useWatch("extra_charge", form);

  // Function to calculate the difference in hours
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

  const handleRoomTypeChange = (_changeValue: any, allValues: any) => {
    if (allValues?.booking_halls) {
      const updatedBookingRooms = allValues.booking_halls.map((item: any) => {
        const matchingRoom: any | undefined = data?.data?.find(
          (room: any) => room.hall_id === item.room_type
        );

        if (matchingRoom) {
          return {
            ...item,
            occupancy: {
              id: matchingRoom?.hall_id,
              hall_name: matchingRoom?.hall_name,
              hall_size: matchingRoom?.hall_size,
              hall_status: matchingRoom?.hall_status,
              location: matchingRoom?.location,
              rate_per_hour: matchingRoom?.rate_per_hour,
              capacity: matchingRoom?.capacity,
            },
          };
        }
        return item;
      });
      setRoomHistoryList(
        updatedBookingRooms.map((item: any) => item.occupancy)
      );
    }
  };

  const updatedHallBooking = selectedHall?.map((item: any) => {
    data?.data?.find((room: any) => room.id === item.id);

    return item;
  });
  const totalCapacity = updatedHallBooking
    ? updatedHallBooking.reduce(
        (total: any, hall: any) => total + hall.capacity,
        0
      )
    : 0;

  const handleFilterChange = (_changeValue: any, allValues: any) => {
    const bookListValue = {
      name: allValues.name,
      email: allValues.email,
      phone: allValues.phone,
      booking_date: allValues.booking_date || "",
      event_date: allValues.event_date || "",
      ac_tr_ac_id: allValues.ac_tr_ac_id,
      tax_amount: allValues.tax_amount,
      discount_amount: allValues.discount_amount,
      payment_type: allValues.payment_type,
      total_occupancy: allValues.total_occupancy,
      extra_charge: allValues.extra_charge ? allValues.extra_charge : 0,
    };
    setBookList(bookListValue);
  };

  useEffect(() => {
    if (data) {
      const roomTypeList =
        data?.data?.map((value: any, index) => ({
          value: value.hall_id,
          label: value.hall_name,
          id: value.hall_id,
          key: `room_${value.hall_name}_${index}`,
        })) || [];
      setRoomTypeList(roomTypeList);
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

  useEffect(() => {
    if (paymenttype) {
      const PaymentTypeTypeList =
        paymenttype?.data?.map((value: any, index) => ({
          value: value.payment_method,
          label: value.payment_method,
          id: value.id,
          key: `room_${value.room_type}_${index}`,
        })) || [];
      setPaymentTypeList(PaymentTypeTypeList);
    }
  }, [paymenttype]);

  useEffect(() => {
    let totalCapacity = 1;
    let totalHallCost = 0;
    let totalPriceCost = 0;
    let totalNetPrice = 0;
    if (roomHistoryList) {
      totalCapacity = roomHistoryList?.reduce(
        (sum: number, item: any) => sum + item.capacity,
        0
      );

      if (roomHistoryList && roomHistoryList.length > 0) {
        totalHallCost = roomHistoryList.reduce(
          (totalCost: number, item: any) => {
            const ratePerHour = parseInt(item.rate_per_hour, 10) || 0;
            return totalCost + ratePerHour * (differenceInHours || 0);
          },
          0
        );
      } else if (updatedHallBooking && updatedHallBooking.length > 0) {
        totalHallCost = updatedHallBooking.reduce(
          (totalCost: number, item: any) => {
            const ratePerHour = parseInt(item?.rate_per_hour, 10) || 0;
            return totalCost + ratePerHour * (differenceInHours || 0);
          },
          0
        );
      }
    }

    totalPriceCost =
      totalHallCost +
      parseInt(extra_charge || 0) +
      parseInt(tax_amount || 0) -
      parseInt(discount_amount || 0);

    totalPriceCost = parseFloat(totalPriceCost.toFixed(2));
    totalNetPrice = parseFloat(
      totalPriceCost + (bookList?.totalPriceCost ?? 0)
    );
    const Calculation = {
      totalCapacity,
      totalHallCost,
      totalPriceCost,
      totalNetPrice,
    };
    setSumList(Calculation);
  }, [
    differenceInHours,
    discount_amount,
    extra_charge,
    roomHistoryList,
    tax_amount,
  ]);

  useEffect(() => {
    const filteredHall = data?.data?.filter(
      (room: any) => room.hall_id === parseInt(roomId)
    );

    setSelectedHall(filteredHall);
  }, [roomId, roomList]);
  useEffect(() => {
    if (roomId != "make-booking" && data?.data) {
      const filteredData = data?.data?.find(
        (item: any) => item.hall_id === parseInt(roomId)
      );

      setBookingList(filteredData?.hall_id);
    }
  }, [roomId, data?.data]);

  useEffect(() => {
    if (form) {
      const Full_payment =
        (sum?.totalPriceCost ?? 0) + (bookList?.totalPriceCost ?? 0);
      form.setFieldsValue({
        discount_amount: 0,
        tax_amount: 0,
        paid_amount_full: Number(Full_payment),
      });
    }
  }, [form]);
  useEffect(() => {
    if (sum && bookList) {
      const Full_payment =
        (sum?.totalPriceCost ?? 0) + (bookList?.totalPriceCost ?? 0);
      form.setFieldsValue({
        paid_amount_full: Number(Full_payment),
      });
    }
  }, [sum, bookList]);
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
    const totalGuest = sum?.totalCapacity || 0;

    if (
      Payment === 0 &&
      values.payment_type &&
      Number(values.ac_tr_ac_id) &&
      values.total_occupancy <= (totalGuest ? totalGuest : totalCapacity)
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
        booking_halls: values?.booking_halls?.map((item: any) => ({
          hall_id: Number(item.room_type),
        })),
      };
      hallBookingData(CreateHall_full as any);
    } else if (
      Payment === 2 &&
      values.payment_type &&
      Number(values.ac_tr_ac_id) &&
      values.total_occupancy <= (totalGuest ? totalGuest : totalCapacity)
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
        booking_halls: values?.booking_halls?.map((item: any) => ({
          hall_id: Number(item.room_type),
        })),
      };
      hallBookingData(CreateHall_partial as any);
    } else if (
      Payment === 1 &&
      values.total_occupancy <= (totalGuest ? totalGuest : totalCapacity)
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
        booking_halls: values?.booking_halls?.map((item: any) => ({
          hall_id: Number(item.room_type),
        })),
      };
      hallBookingData(CreateRoom_nopayment as any);
    } else if (
      values.total_occupancy >
      (roomId === "make-booking" ? totalGuest : totalCapacity)
    ) {
      message.error(
        `Total Number of Guests (${
          values.total_occupancy
        }) cannot exceed the Total no. of Hall Capacity (${
          totalGuest ? totalGuest : totalCapacity
        }).`
      );
    }
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setBookList([]);
      setRoomHistoryList([]);
      setRoomHistoryList([]);
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
          booking_halls: [{ room_type: parseInt(bookingId) }],
        });
      }
    } else if (roomId === "make-booking") {
      form.setFieldsValue({
        start_time: "",
        end_time: "",
        event_date: "",
        booking_halls: [{}],
      });
    }
    // else {
    //   form.setFieldsValue({
    //     booking_halls: [
    //       { room_type: "Hall is not available for this date and time" },
    //     ],
    //   });
    // }
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
                  {/* ...................check_in_out_date & time......................................... */}

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
                            onChange={(value) =>
                              handleFilterChange(
                                { email: value },
                                form.getFieldsValue()
                              )
                            }
                          />
                        ) : (
                          <Input
                            type="number"
                            placeholder="Enter valid phone number"
                            style={{ width: "100%" }}
                            onChange={(value) =>
                              handleFilterChange(
                                { phone: value },
                                form.getFieldsValue()
                              )
                            }
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
                          onChange={(value) =>
                            handleFilterChange(
                              { name: value },
                              form.getFieldsValue()
                            )
                          }
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
                          onChange={(value) =>
                            handleFilterChange(
                              { booking_date: value },
                              form.getFieldsValue()
                            )
                          }
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
                            handleFilterChange(
                              { event_date: value },
                              form.getFieldsValue()
                            );
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
                          onChange={(value) =>
                            handleFilterChange(
                              { total_occupancy: value },
                              form.getFieldsValue()
                            )
                          }
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
                          onChange={(value) =>
                            handleFilterChange(
                              { extra_charge: value },
                              form.getFieldsValue()
                            )
                          }
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
                          onChange={(value) =>
                            handleFilterChange(
                              { discount_amount: value },
                              form.getFieldsValue()
                            )
                          }
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
                          onChange={(value) =>
                            handleFilterChange(
                              { tax_amount: value },
                              form.getFieldsValue()
                            )
                          }
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
                <Col>
                  <Row>
                    {roomHistoryList.length === 1 ||
                    roomHistoryList.length === 0 ? (
                      <div className="flex items-center gap-2 mt-10">
                        <MdRoomService color="#22d3ee" size="20" />
                        <span className="text-cyan-500 font-semibold">
                          Select Hall
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-10">
                        <MdRoomService color="#22d3ee" size="20" />
                        <span className="text-cyan-500 font-semibold">
                          Select Hall
                        </span>
                      </div>
                    )}
                  </Row>
                  <div className="flex justify-center">
                    <div className="w-full">
                      <Form.List name="booking_halls" initialValue={[{}]}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields?.map(
                              ({ key, name, ...restField }, index: number) => {
                                return (
                                  <Badge.Ribbon
                                    key={key}
                                    text={`Hall ${name + 1}`}
                                    placement="start"
                                  >
                                    <Card
                                      size="small"
                                      extra={
                                        <div className="hover:cursor-pointer">
                                          {index > 0 && (
                                            <MdDeleteForever
                                              onClick={() => {
                                                remove(name);
                                                handleFilterChange(
                                                  {},
                                                  form.getFieldsValue()
                                                );
                                                handleRoomTypeChange(
                                                  {},
                                                  form.getFieldsValue()
                                                );
                                              }}
                                              size="25"
                                              color="#ff6666"
                                            />
                                          )}
                                        </div>
                                      }
                                      style={{
                                        marginTop: "30px",
                                        // borderWidth: "6px ",
                                      }}
                                    >
                                      <Row align={"middle"} justify={"start"}>
                                        <Col xs={24} sm={12} md={12} lg={24}>
                                          <Form.Item
                                            label={
                                              <span className="font-semibold">
                                                Select Hall
                                              </span>
                                            }
                                            {...restField}
                                            name={[name, "room_type"]}
                                            style={{ width: "100%" }}
                                            rules={[
                                              {
                                                required: true,
                                                message: "Please select a Hall",
                                              },
                                              ({
                                                getFieldValue,
                                                setFieldsValue,
                                              }) => ({
                                                validator(_, value) {
                                                  const selectedRoomId = value;
                                                  const otherRooms =
                                                    getFieldValue(
                                                      "booking_halls"
                                                    )
                                                      .filter(
                                                        (
                                                          _room: any,
                                                          index: number
                                                        ) => index !== name
                                                      )
                                                      .map(
                                                        (room: any) =>
                                                          room?.room_type
                                                      );

                                                  if (!selectedRoomId) {
                                                    setFieldsValue({
                                                      [`booking_rooms[${name}].room_type`]:
                                                        undefined,
                                                    });

                                                    return Promise.reject(
                                                      new Error(
                                                        "Hall must be selected"
                                                      )
                                                    );
                                                  }

                                                  if (
                                                    otherRooms.includes(
                                                      selectedRoomId
                                                    )
                                                  ) {
                                                    setFieldsValue({
                                                      [`booking_rooms[${name}].room_type`]:
                                                        undefined,
                                                    });

                                                    return Promise.reject(
                                                      new Error(
                                                        "Hall must be different from other Hall"
                                                      )
                                                    );
                                                  }

                                                  return Promise.resolve();
                                                },
                                              }),
                                            ]}
                                          >
                                            <Select
                                              onChange={(value) =>
                                                handleRoomTypeChange(
                                                  { room_type: value },
                                                  form.getFieldsValue()
                                                )
                                              }
                                              showSearch
                                              placeholder="Select a room "
                                              optionFilterProp="children"
                                              onSearch={onSearch}
                                              filterOption={filterOption}
                                              options={roomList}
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Card>
                                  </Badge.Ribbon>
                                );
                              }
                            )}

                            <Row align={"middle"} justify={"start"}>
                              <Col xs={24} sm={12} md={12} lg={7}>
                                {roomId === "make-booking" &&
                                roomHistoryList.length < 1 ? (
                                  <Form.Item
                                    style={{
                                      marginTop: "10px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <RiQuestionFill />
                                      <span className="font-semibold">
                                        You have to Select Hall to Add Hall
                                      </span>
                                    </div>
                                  </Form.Item>
                                ) : (
                                  <Form.Item className="mt-5">
                                    <Button
                                      onClick={() => {
                                        if (
                                          fields.length <
                                          (roomList?.length || 0)
                                        ) {
                                          add();
                                        }
                                      }}
                                      block
                                      icon={
                                        <PlusOutlined
                                          style={{ color: "white" }}
                                        />
                                      }
                                      style={{
                                        backgroundColor: "#01adad",
                                        color: "white",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Add Hall
                                    </Button>
                                  </Form.Item>
                                )}
                              </Col>
                            </Row>
                          </>
                        )}
                      </Form.List>
                    </div>

                    <div>
                      {roomHistoryList.length > 0 ? (
                        <>
                          {roomHistoryList?.map((value: any, index: number) => (
                            <Card
                              className="w-[330px] h-[150px] grid gap-5 ml-1 pb-4 mt-[29px]"
                              key={index}
                            >
                              <div className="flex flex-col gap-1">
                                <Link
                                  to={`/hall-details/${value.id}`}
                                  target="_blank"
                                >
                                  <div className="flex gap-2 items-baseline text-base font-bold">
                                    <span>{value.hall_name}</span>
                                    <span>-</span>
                                    <span>Hall Size : {value.hall_size}</span>
                                  </div>
                                </Link>
                                <Link
                                  to={`/hall-details/${value.id}`}
                                  target="_blank"
                                >
                                  <div className="flex gap-2 items-center text-base font-bold">
                                    <span>{value.location}</span>
                                    <span>-</span>
                                    <span>
                                      rate per hour : {value.rate_per_hour}
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            </Card>
                          ))}
                        </>
                      ) : (
                        <>
                          {updatedHallBooking?.map(
                            (value: any, index: number) => (
                              <Card
                                className="w-[330px] h-[150px] grid gap-5 ml-1 pb-4 mt-[29px]"
                                key={index}
                              >
                                <div className="flex flex-col gap-1">
                                  <Link
                                    to={`/hall-details/${value.id}`}
                                    target="_blank"
                                  >
                                    <div className="flex gap-2 items-baseline text-base font-bold">
                                      <span>{value.hall_name}</span>
                                      <span>-</span>
                                      <span>Hall Size : {value.hall_size}</span>
                                    </div>
                                  </Link>
                                  <Link
                                    to={`/hall-details/${value.id}`}
                                    target="_blank"
                                  >
                                    <div className="flex gap-2 items-center text-base font-bold">
                                      <span>{value.location}</span>
                                      <span>-</span>
                                      <span>
                                        rate per hour : {value.rate_per_hour}
                                      </span>
                                    </div>
                                  </Link>
                                </div>
                              </Card>
                            )
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Col>
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
                            <span>
                              {/* {sum?.totalRoomCharge
                                  ? sum?.totalRoomCharge.toLocaleString()
                                  : "0.00"} */}
                              {(sum?.totalPriceCost ?? 0) +
                                (bookList?.totalPriceCost ?? 0)}
                            </span>
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
                              {
                                validator: (_, value) => {
                                  if (
                                    parseFloat(value) >
                                    parseFloat(sum?.totalNetPrice)
                                  ) {
                                    return Promise.reject(
                                      `Paid Amount Can not exceed Total Cost ${parseFloat(
                                        sum?.totalNetPrice
                                      )}`
                                    );
                                  }
                                  return Promise.resolve();
                                },
                              },
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
                              onChange={(value) => {
                                form.getFieldValue("payment_method") === 0
                                  ? handleFilterChange(
                                      { paid_amount_full: value },
                                      form.getFieldsValue()
                                    )
                                  : handleFilterChange(
                                      { paid_amount_partial: value },
                                      form.getFieldsValue()
                                    );
                              }}
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
                                required:
                                  form.getFieldValue("payment_method") === 0,
                                message: "Please select payment type!",
                              },
                            ]}
                          >
                            <Select
                              style={{ width: "100%" }}
                              placeholder="Pay Type"
                              onChange={(value) => {
                                handleFilterChange(
                                  { payment_type_full: value },
                                  form.getFieldsValue()
                                );

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
                              onChange={(value) =>
                                handleFilterChange(
                                  { ac_tr_ac_id: value },
                                  form.getFieldsValue()
                                )
                              }
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
                      : roomHistoryList.length > 0
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
          roomId={roomId}
          start_date={start_date}
          end_time={end_time}
          bookList={bookList}
          form={form}
          roomHistoryList={roomHistoryList}
          sum={sum}
          differenceInHours={differenceInHours}
          tax_amount={tax_amount}
          discount_amount={discount_amount}
          updatedHallBooking={updatedHallBooking}
          totalCapacity={totalCapacity}
        />
      </div>
    </>
  );
};

export default CreateHallBooking;
