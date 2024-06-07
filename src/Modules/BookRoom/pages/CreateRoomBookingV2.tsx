import { HomeOutlined } from "@ant-design/icons";
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
  message,
} from "antd";

// const { RangePicker } = DatePicker;

import { useForm, useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { useGetAvailableHotelRoomListQuery } from "../../RoomModule/api/HotelRoomEndPoints";
import { useCreateRoomBookingMutation } from "../api/RoomBookingEndPoints";
import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";

import { FaHotel, FaMoneyBillWave } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

import moment from "moment";
import YourSelection from "../components/YourSelection";

import { useGetCustomerListQuery } from "../../Customer/api/CustomerEndPoints";
import { useGetMeQuery } from "../../../app/api/userApi/userApi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";

const CreateRoomBookingV2 = () => {
  const { roomId = "", from_Id, to_Id } = useParams();

  // function disabledDate(current: any) {
  //   return current && current < moment().startOf("day");
  // }
  const { data: user } = useGetMeQuery();
  const UserId = user?.data?.id;

  const navigate = useNavigate();
  const [roomBookingData, { isSuccess, isLoading }] =
    useCreateRoomBookingMutation();

  // Assuming `data?.data` is your array of objects and `value.id` is the ID you want to filter out

  // const [payment, setPayment] = useState(true);
  const [dummy, _setDummyList] = useState<any>([]);

  const [roomList, setRoomTypeList] = useState<any>([]);

  const [bankList, setBankTypeList] = useState<any>([]);

  const [bookingId, setBookingList] = useState<any>(null);
  const [guestEmail, setGuestEmailList] = useState<any>(null);

  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
  const [total, setTotal] = useState<any>({
    totalAdults: 0,
    totalChildren: 0,
    totalRatePerNight: 0,
    totalOccupancy: 0,
    totalRoomCharge: 0,
  });

  const [filter, setFilter] = useState<any>({
    admin_id: Number(UserId),
    status: 1,
  });

  const [filterValue, setFilterValue] = useState<any>({
    // availability: 1,
    from_date:
      roomId === "make-booking"
        ? dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss")
        : from_Id,
    to_date:
      roomId === "make-booking"
        ? dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss")
        : to_Id,
  });

  const [value, setValue] = useState(1);

  const { data } = useGetAvailableHotelRoomListQuery(filterValue);
  const { data: accountlistData } = useGetAccountListQuery({ ...filter });

  const { data: guestlist } = useGetCustomerListQuery(dummy);

  const [form] = useForm();

  const date = useWatch("check_in_time", form);
  const date_out = useWatch("check_out_time", form);
  const Payment = useWatch("payment_method", form);
  const NAME = useWatch("name", form);
  const EMAIL = useWatch("email", form);
  const DISCOUNT_AMOUNT = useWatch("discount_amount", form);
  const TAX_AMOUNT = useWatch("tax_amount", form);
  const TOTAL_OCCUPANCY = useWatch("total_occupancy", form);
  const NID_NO = useWatch("nid_no", form);
  const PASSPORT_NO = useWatch("passport_no", form);
  const EXTRA_CHARGE = useWatch("extra_charge", form);
  const PHONE = useWatch("phone", form);
  const Rooms = useWatch("room", form);

  // number of nights step
  const checkInTime: any = new Date(date);
  const checkOutTime: any = new Date(date_out);

  const timeDifference = checkOutTime - checkInTime;

  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const numberOfNights = Math.floor(timeDifference / millisecondsInADay);
  console.log("Rooms", Rooms);
  console.log("data", data?.data);
  useEffect(() => {
    if (Rooms && data?.data) {
      const filtered = data?.data.filter((room) => Rooms.includes(room.id));
      setFilteredRooms(filtered);
    }
  }, [Rooms, data]);
  const Delete_Room = (id: number) => {
    setFilteredRooms(filteredRooms.filter((room: any) => room.id !== id));
    // Update the form field value
    form.setFieldsValue({
      room: Rooms.filter((roomId: number) => roomId !== id),
    });
  };
  useEffect(() => {
    if (Rooms && data?.data) {
      const filtered = data?.data.filter((room) => Rooms.includes(room.id));
      setFilteredRooms(filtered);

      // Filter out unmatched values from Rooms
      const matchedRoomIds = filtered.map((room) => room.id);
      const updatedRooms = Rooms.filter((roomId: any) =>
        matchedRoomIds.includes(roomId)
      );
      console.log(
        "matchedRoomIds",
        matchedRoomIds,
        "updatedRooms",
        updatedRooms
      );
      // If there are unmatched values, update the form field
      if (updatedRooms.length !== Rooms.length) {
        form.setFieldsValue({ room: updatedRooms });
      }
    }
  }, [Rooms, data, form]);
  console.log("Filtered Rooms: ", filteredRooms);
  console.log("total", total);
  console.log("numberOfNights", numberOfNights);
  // ...................disable Date................
  // function disabledDate(current: any) {
  //   return current && current < date;
  // }
  function disabledDate(current: any) {
    if (!date) {
      return false; // If no check-in date is selected, do not disable any dates
    }
    // Disable all dates before the check-in date
    return current && current < dayjs(date).startOf("day");
  }

  useEffect(() => {
    if (EMAIL && guestlist?.data) {
      const filteredGuestData = guestlist?.data.find(
        (item: any) => item?.email === EMAIL
      );

      setGuestEmailList(filteredGuestData?.name);
    } else if (PHONE && guestlist?.data) {
      const filteredGuestData = guestlist?.data.find(
        (item: any) => item?.phone === PHONE
      );

      setGuestEmailList(filteredGuestData?.name);
    }
  }, [EMAIL, PHONE, guestlist?.data]);

  useEffect(() => {
    if (roomId != "make-booking" && data?.data) {
      const filteredData = data?.data?.find(
        (item: any) => item.id === parseInt(roomId)
      );

      setBookingList(filteredData?.id);
    }
  }, [roomId, data?.data]);

  useEffect(() => {
    if (data) {
      const roomTypeList =
        data?.data?.map((value: any, index: any) => ({
          value: value?.id,
          label: `${value?.room_number} - (${value?.room_type} - ${value?.bed_type})`,
          id: value?.id,
          key: `room_${value?.room_type}_${index}`,
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
    if (filteredRooms && filteredRooms.length > 0) {
      const totalAdults = filteredRooms.reduce(
        (sum, room) => sum + room?.adult,
        0
      );
      const totalChildren = filteredRooms.reduce(
        (sum, room) => sum + room?.child,
        0
      );
      const totalRatePerNight = filteredRooms.reduce(
        (sum, room) => sum + parseInt(room?.rate_per_night, 10),
        0
      );

      setTotal({
        ...total,
        totalAdults: totalAdults,
        totalChildren: totalChildren,
        totalRatePerNight: totalRatePerNight,
        totalOccupancy: totalAdults + totalChildren,
        totalSelectedRoomCharge:
          totalRatePerNight * numberOfNights != 0
            ? totalRatePerNight * numberOfNights
            : totalRatePerNight * 1,
        totalRoomCharge:
          Number(
            totalRatePerNight * numberOfNights != 0
              ? totalRatePerNight * numberOfNights
              : totalRatePerNight * 1
          ) +
          Number(TAX_AMOUNT || 0) +
          Number(EXTRA_CHARGE || 0) -
          Number(DISCOUNT_AMOUNT || 0),
        allSelectedRooms: filteredRooms,
      });
    }
  }, [
    total,
    filteredRooms,
    numberOfNights,
    TAX_AMOUNT,
    DISCOUNT_AMOUNT,
    EXTRA_CHARGE,
  ]);
  useEffect(() => {
    setTotal({
      check_in_time: date,
      check_out_time: date_out,
      email: EMAIL,
      name: NAME,
      phone: PHONE,
      nid: NID_NO,
      passport: PASSPORT_NO,
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
    date,
    date_out,
    EMAIL,
    NAME,
    PHONE,
    NID_NO,
    PASSPORT_NO,
    TOTAL_OCCUPANCY,
    Payment,
  ]);

  useEffect(() => {
    if (accountlistData?.data?.length) {
      const accountId = Number(accountlistData?.data[0]?.id);
      form.setFieldValue("ac_tr_ac_id_full", accountId);
    } else if (accountlistData?.data?.length === 0) {
      form.resetFields(["ac_tr_ac_id_full"]);
    }
  }, [form, accountlistData?.data]);
  useEffect(() => {
    if (accountlistData?.data?.length) {
      const accountId = Number(accountlistData?.data[0]?.id);
      form.setFieldValue("ac_tr_ac_id_partial", accountId);
    } else if (accountlistData?.data?.length === 0) {
      form.resetFields(["ac_tr_ac_id_partial"]);
    }
  }, [form, accountlistData?.data]);

  useEffect(() => {
    if (guestEmail) {
      const guestEMAIL = guestEmail;
      form.setFieldValue("name", guestEMAIL);
    } else {
      form.setFieldValue("name", "");
    }
  }, [form, guestEmail]);
  useEffect(() => {
    form.setFieldsValue({
      discount_amount_full: 0,
      tax_amount_full: 0,
      paid_amount_full: Number(total?.totalRoomCharge),
    });
  }, [form, total]);
  useEffect(() => {
    form.setFieldsValue({
      discount_amount_partial: 0,
      tax_amount_partial: 0,
      paid_amount_partial: 0,
    });
  }, [form]);

  const onFinish = (values: any) => {
    console.log("values");

    const TOTAL_OCCUPANCY = Number(total?.totalOccupancy);

    if (
      Payment === 0 &&
      values.payment_type_partial &&
      Number(values.ac_tr_ac_id_partial) &&
      TOTAL_OCCUPANCY &&
      values.total_occupancy <= TOTAL_OCCUPANCY
    ) {
      const CreateRoom_partial = {
        name: values.name,
        email: values.email || "",
        phone: values.phone || "",
        check_in: values.check_in ? values.check_in : "0",
        check_in_time: dayjs(values.check_in_time).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        check_out_time: dayjs(values.check_out_time).format(
          "YYYY-MM-DD HH:mm:ss"
        ),

        discount_amount: values.discount_amount ? values.discount_amount : 0,
        tax_amount: values.tax_amount ? values.tax_amount : 0,
        paid_amount: values.paid_amount_partial
          ? values.paid_amount_partial
          : 0,
        payment_type: values.payment_type_partial,
        ac_tr_ac_id: Number(values.ac_tr_ac_id_partial),

        total_occupancy: values.total_occupancy,
        nid_no: values.nid_no ? values.nid_no : "",
        passport_no: values.passport_no ? values.passport_no : "",
        extra_charge: values.extra_charge ? values.extra_charge : 0,

        booking_rooms: values?.room?.map((item: any) => ({
          room_id: Number(item),
        })),
      };
      roomBookingData(CreateRoom_partial as any);
    } else if (
      Payment === 2 &&
      values.payment_type_full &&
      Number(values.ac_tr_ac_id_full) &&
      TOTAL_OCCUPANCY &&
      values.total_occupancy <= TOTAL_OCCUPANCY
    ) {
      const CreateRoom_full = {
        name: values.name,
        email: values.email || "",
        phone: values.phone || "",
        check_in: values.check_in ? values.check_in : "0",
        check_in_time: dayjs(values.check_in_time).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        check_out_time: dayjs(values.check_out_time).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        // discount_amount: values.discount_amount_full
        //   ? values.discount_amount_full
        //   : 0,
        // tax_amount: values.tax_amount_full ? values.tax_amount_full : 0,
        discount_amount: values.discount_amount ? values.discount_amount : 0,
        tax_amount: values.tax_amount ? values.tax_amount : 0,
        paid_amount: values.paid_amount_full ? values.paid_amount_full : 0,
        payment_type: values.payment_type_full,
        ac_tr_ac_id: Number(values.ac_tr_ac_id_full),

        total_occupancy: values.total_occupancy,
        nid_no: values.nid_no ? values.nid_no : "",
        passport_no: values.passport_no ? values.passport_no : "",
        extra_charge: values.extra_charge ? values.extra_charge : 0,

        booking_rooms: values?.room?.map((item: any) => ({
          room_id: Number(item),
        })),
      };
      roomBookingData(CreateRoom_full as any);
    } else if (
      Payment === 1 &&
      TOTAL_OCCUPANCY &&
      values.total_occupancy <= TOTAL_OCCUPANCY
    ) {
      const CreateRoom_nopayment = {
        name: values.name,
        email: values.email || "",
        phone: values.phone || "",
        check_in: values.check_in ? values.check_in : "0",
        check_in_time: dayjs(values.check_in_time).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        check_out_time: dayjs(values.check_out_time).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        discount_amount: values.discount_amount ? values.discount_amount : 0,
        tax_amount: values.tax_amount ? values.tax_amount : 0,
        paid_amount: values.paid_amount ? values.paid_amount : 0,
        nid_no: values.nid_no ? values.nid_no : "",
        passport_no: values.passport_no ? values.passport_no : "",

        total_occupancy: values.total_occupancy,
        extra_charge: values.extra_charge ? values.extra_charge : 0,

        booking_rooms: values?.room?.map((item: any) => ({
          room_id: Number(item),
        })),
      };

      roomBookingData(CreateRoom_nopayment as any);
    } else {
      message.error(
        `Total Number of Guests (${values.total_occupancy}) cannot exceed the Total no. of Room Capacity (${TOTAL_OCCUPANCY}).`
      );
    }
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setFilteredRooms([]);

      setTotal({});
      navigate(`/book_list`);
    }
  }, [form, isSuccess]);

  const onSearch = (_value: string) => {};

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  useEffect(() => {
    if (roomId !== "make-booking" && bookingId) {
      form.setFieldsValue({
        check_in_time: dayjs(from_Id),
        check_out_time: dayjs(to_Id),
        room: [parseInt(bookingId)],
      });
    } else if (roomId === "make-booking") {
      form.setFieldsValue({
        check_in_time: dayjs().startOf("day"),
        check_out_time: dayjs().endOf("day"),
        room: [],
      });
    }
  }, [roomId, bookingId, from_Id, to_Id]);

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
                <span>Room Booking</span>
              </div>
            ),
          },
        ]}
      />
      <div className="flex  gap-5 ">
        <div className="w-full">
          <div className="flex flex-col gap-5 w-full ">
            <h2
              className="text-lg font-bold text-[#01adad]"
              style={{ textTransform: "uppercase" }}
            >
              Room Booking
            </h2>

            <Form
              name="property Status"
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
                            <span className="font-semibold">
                              Check in - Date and Time
                            </span>
                          }
                          name="check_in_time"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Select check in - date & time!",
                            },
                          ]}
                        >
                          <DatePicker
                            // use12Hours
                            // showTime={{ format: "h:mm a" }}
                            // format="YYYY-MM-DD HH:mm"
                            use12Hours={false} // Set to false to use 24-hour format
                            showTime={{ format: "HH:mm" }} // Set time format to 24-hour format
                            format="YYYY-MM-DD HH:mm"
                            style={{ width: "100%" }}
                            onChange={(value) => {
                              setFilterValue({
                                ...filterValue,
                                from_date:
                                  (value &&
                                    dayjs(value).format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )) ||
                                  "",
                              });
                            }}
                            // disabledDate={disabledDate}
                            disabledDate={(current) =>
                              current && current < moment().startOf("day")
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={12}>
                        <Form.Item
                          label={
                            <span className="font-semibold">
                              Check out - Date and Time
                            </span>
                          }
                          name="check_out_time"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Select check out - date & time!",
                            },
                          ]}
                        >
                          <DatePicker
                            // use12Hours
                            // showTime={{
                            //   format: "h:mm a",
                            //   hideDisabledOptions: true,
                            // }}
                            // format="YYYY-MM-DD HH:mm"
                            use12Hours={false} // Set to false to use 24-hour format
                            showTime={{
                              format: "HH:mm",
                              hideDisabledOptions: true,
                            }}
                            format="YYYY-MM-DD HH:mm"
                            style={{ width: "100%" }}
                            onChange={(value) => {
                              setFilterValue({
                                ...filterValue,
                                to_date:
                                  (value &&
                                    dayjs(value).format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )) ||
                                  "",
                              });
                            }}
                            disabledDate={disabledDate}
                            disabled={date ? false : true}
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
                          label={
                            <span className="font-semibold">Guest Name</span>
                          }
                          name="name"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Please input guest name!",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter Guest Name"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                      <Col xs={24} sm={12} md={12} lg={12}>
                        <Form.Item
                          label={
                            <span className="font-semibold">NID Number</span>
                          }
                          name="nid_no"
                          style={{ width: "100%" }}
                          // rules={[
                          //   {
                          //     required: true,

                          //   },
                          // ]}
                        >
                          <Input
                            type="number"
                            placeholder="Enter NID Number"
                            style={{ width: "100%" }}
                            maxLength={100}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={12} lg={12}>
                        <Form.Item
                          label={
                            <span className="font-semibold">
                              Passport / Iqama Number
                            </span>
                          }
                          name="passport_no"
                          style={{ width: "100%" }}
                        >
                          <Input
                            type="text"
                            placeholder="Enter passport_no"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                      <Col xs={24} sm={12} md={12} lg={12}>
                        <Form.Item
                          label={
                            <span className="font-semibold">
                              Total Number of Guests
                            </span>
                          }
                          name="total_occupancy"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Please enter total no. of guests!",
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="Enter total no. of guests"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={12}>
                        <Form.Item
                          label={
                            <span className="font-semibold">Extra Charge</span>
                            // <span className="font-semibold">Damage Charge</span>
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
                            <span className="font-semibold">
                              Discount Amount
                            </span>
                          }
                          name="discount_amount"
                          style={{ width: "100%" }}
                        >
                          <InputNumber
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) =>
                              value!.replace(/\$\s?|(,*)/g, "")
                            }
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
                            parser={(value) =>
                              value!.replace(/\$\s?|(,*)/g, "")
                            }
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
                            <span className="font-semibold">
                              Mode of Payment
                            </span>
                          }
                          name="payment_method"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Please select the payment mode!",
                            },
                          ]}
                        >
                          <Select
                            // style={{ width: "400px" }}

                            placeholder="Select The Payment Mode"
                            options={[
                              { value: 1, label: "No Payment" },
                              {
                                value: 0,
                                label: "Partial Payment",
                              },
                              {
                                value: 2,
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
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item
                          label={
                            <span className="font-semibold">Select Rooms</span>
                          }
                          name="room"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            showSearch
                            placeholder="Select a room "
                            optionFilterProp="children"
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={roomList}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[15, 15]}>
                      {filteredRooms &&
                        filteredRooms.map((room: any, index: any) => (
                          <Col xl={8} xxl={8} key={index}>
                            <Badge.Ribbon
                              text={<h3>Room: {index + 1}</h3>}
                              color="cyan"
                              placement="start"
                            >
                              <Card
                                extra={
                                  <RiDeleteBin2Fill
                                    color="red"
                                    size={20}
                                    onClick={() => Delete_Room(room.id)}
                                  />
                                }
                              >
                                <div className="flex flex-col gap-1">
                                  <p
                                    className="text-lg font-bold
                                  
                                  "
                                  >
                                    {room?.room_number}
                                  </p>
                                  <div className="flex gap-2 items-baseline text-base font-bold">
                                    <span>{room?.room_type}</span>
                                    <span>-</span>
                                    <span>{room?.bed_type}</span>
                                  </div>

                                  <div className="flex gap-2 items-center text-base font-bold">
                                    <span>
                                      <MdPeopleAlt />
                                    </span>
                                    <span className="font-semibold">
                                      Max {room?.adult} Adluts | {room?.child}{" "}
                                      child Per Room
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-base font-bold">
                                    <span>
                                      <FaMoneyBillWave />
                                    </span>
                                    <span>Rate Per Night</span>
                                    <span className="font-bold">-</span>
                                    <span className=" text-slate-500">
                                      {room?.rate_per_night &&
                                        room?.rate_per_night?.toLocaleString()}
                                    </span>
                                  </div>

                                  <div className="flex gap-2 text-base font-bold">
                                    <span>
                                      {room?.refundable &&
                                      room?.refundable === 1 ? (
                                        <Tag color="green">Refundable</Tag>
                                      ) : (
                                        <Tag color="red">Non-refundable</Tag>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </Card>
                            </Badge.Ribbon>
                          </Col>
                        ))}
                    </Row>
                  </Card>

                  {/* ..........................Partial/Full payment............................................................................. */}
                  {form.getFieldValue("payment_method") === 0 ||
                  form.getFieldValue("payment_method") === 2 ? (
                    <Card style={{ marginBottom: "20px", marginTop: "20px" }}>
                      <div className="flex justify-start  gap-4 border-b-2 border-[#01adad] mb-7 ">
                        <span className=" py-2 text-[#2d9292] font-semibold">
                          {form.getFieldValue("payment_method") === 0
                            ? "Partial Payment"
                            : "Full Payment"}
                        </span>
                      </div>
                      <>
                        <Row
                          align={"middle"}
                          justify={"start"}
                          gutter={[15, 15]}
                        >
                          <Col xs={24} sm={12} md={12} lg={12}>
                            <div className="flex gap-3 font-semibold mt-2 mb-5">
                              <span className="font-semibold">
                                Total Cost :
                              </span>

                              <span>
                                {total?.totalRoomCharge
                                  ? total?.totalRoomCharge
                                  : "N/A"}
                              </span>
                            </div>
                          </Col>
                        </Row>

                        <Row
                          align={"middle"}
                          justify={"start"}
                          gutter={[15, 15]}
                        >
                          <Col xs={24} sm={12} md={12} lg={12}>
                            <Form.Item
                              label={
                                <span className="font-semibold">
                                  Paid Amount
                                </span>
                              }
                              name={
                                form.getFieldValue("payment_method") === 0
                                  ? "paid_amount_partial"
                                  : "paid_amount_full"
                              }
                              style={{ width: "100%" }}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter paid amount!",
                                },
                              ]}
                            >
                              <InputNumber
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                parser={(value) =>
                                  value!.replace(/\$\s?|(,*)/g, "")
                                }
                                placeholder="Enter paid ammount in"
                                style={{ width: "100%" }}
                                disabled={
                                  form.getFieldValue("payment_method") === 0
                                    ? false
                                    : true
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
                              name={
                                form.getFieldValue("payment_method") === 0
                                  ? "payment_type_partial"
                                  : "payment_type_full"
                              }
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
                        <Row
                          align={"middle"}
                          justify={"start"}
                          gutter={[15, 15]}
                        >
                          <Col xs={24} sm={12} md={12} lg={12}>
                            <Form.Item
                              label={
                                <span className="font-semibold">
                                  Account Name
                                </span>
                              }
                              name={
                                form.getFieldValue("payment_method") === 0
                                  ? "ac_tr_ac_id_partial"
                                  : "ac_tr_ac_id_full"
                              }
                              style={{ width: "100%" }}
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Select
                                // style={{ width: "400px" }}

                                placeholder="Select Account Name"
                                options={bankList}
                                disabled={
                                  form.getFieldValue("payment_method") === 0
                                    ? !form.getFieldValue(
                                        "payment_type_partial"
                                      )
                                    : !form.getFieldValue("payment_type_full")
                                }
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
                <Form.Item
                  wrapperCol={{ offset: 0, span: 18 }}
                  className="ml-1"
                >
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
                        : filteredRooms && filteredRooms.length > 0
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
        </div>
        {/* ..........................Your Selection............................................................... */}
        <YourSelection total={total} numberOfNights={numberOfNights} />
      </div>
    </>
  );
};

export default CreateRoomBookingV2;
