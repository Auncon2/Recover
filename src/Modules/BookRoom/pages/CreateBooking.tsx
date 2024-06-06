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
  message,
} from "antd";

// const { RangePicker } = DatePicker;

import { useForm, useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { MdDeleteForever, MdRoomService } from "react-icons/md";
import { useGetAvailableHotelRoomListQuery } from "../../RoomModule/api/HotelRoomEndPoints";
import { useCreateRoomBookingMutation } from "../api/RoomBookingEndPoints";
import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";

import { IVewHotelRoom } from "../../RoomModule/Types/HotelRoomTypes";
import { FaHotel } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

import moment from "moment";
import YourSelection from "../components/YourSelection";
import RoomBookingDetails from "../components/RoomBookingDetails";
import { useGetCustomerListQuery } from "../../Customer/api/CustomerEndPoints";
import { useGetMeQuery } from "../../../app/api/userApi/userApi";
import { RiQuestionFill } from "react-icons/ri";

const CreateBooking = () => {
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
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [roomList, setRoomTypeList] = useState<any>([]);

  const [bankList, setBankTypeList] = useState<any>([]);
  const [bookList, setBookList] = useState<any>([]);
  const [bookListPartial, setBookPartialList] = useState<any>([]);
  const [sum, setSumList] = useState<any>({});
  const [bookingId, setBookingList] = useState<any>(null);
  const [guestEmail, setGuestEmailList] = useState<any>(null);

  const [roomHistoryList, setRoomHistoryList] = useState<any>([]);
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
  const EMAIL = useWatch("email", form);
  const NAME = useWatch("name", form);
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
    }
  }, [EMAIL, guestlist?.data]);

  useEffect(() => {
    if (roomId != "make-booking" && data?.data) {
      const filteredData = data?.data?.find(
        (item: any) => item.id === parseInt(roomId)
      );

      setBookingList(filteredData?.id);
    }
  }, [roomId, data?.data]);

  // number of nights step
  const checkInTime: any = new Date(date);
  const checkOutTime: any = new Date(date_out);

  const timeDifference = checkOutTime - checkInTime;

  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const numberOfNights = Math.floor(timeDifference / millisecondsInADay);

  const handleRoomTypeChange = (_changeValue: any, allValues: any) => {
    if (allValues?.booking_rooms) {
      const updatedBookingRooms = allValues?.booking_rooms.map((item: any) => {
        const matchingRoom: any | undefined = data?.data?.find(
          (room: any) => room?.id === item?.room_type
        );

        if (matchingRoom) {
          return {
            ...item,

            occupancy: {
              id: matchingRoom?.id,
              adult: matchingRoom?.adult,
              child: matchingRoom?.child,
              bed_type: matchingRoom?.bed_type,
              room_type: matchingRoom?.room_type,
              rate_per_night: matchingRoom?.rate_per_night,
              refundable: matchingRoom?.refundable,
              availability: matchingRoom?.availability,
              room_number: matchingRoom?.room_number,
              discount_percent: matchingRoom?.discount_percent,
              discout_amount:
                matchingRoom?.rate_per_night *
                (matchingRoom?.discount_percent / 100),
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

  const updatedBookingRooms = selectedRoom?.map((item: any) => {
    const matchingRoom: IVewHotelRoom | undefined = data?.data?.find(
      (room: any) => room?.id === item?.id
    );

    if (matchingRoom) {
      return {
        ...item,

        occupancy: {
          id: matchingRoom?.id,
          adult: matchingRoom?.adult,
          child: matchingRoom?.child,
          bed_type: matchingRoom?.bed_type,
          room_type: matchingRoom?.room_type,
          rate_per_night: matchingRoom?.rate_per_night,
          refundable: matchingRoom?.refundable,
          availability: matchingRoom?.availability,
          room_number: matchingRoom?.room_number,
          discount_percent: matchingRoom?.discount_percent,
          discout_amount:
            matchingRoom?.rate_per_night *
            (matchingRoom?.discount_percent / 100),
        },
      };
    }

    return item;
  });

  const handleFilterChange = (_changeValue: any, allValues: any) => {
    const bookListValue = {
      name: allValues.name,
      email: allValues.email,
      // discount_amount: allValues.discount_amount_full || 0,
      // tax_amount: allValues.tax_amount_full || 0,
      discount_amount: allValues.discount_amount || 0,
      tax_amount: allValues.tax_amount || 0,

      paid_amount: Number(allValues.paid_amount_full) || 0,
      ac_tr_ac_id: allValues.ac_tr_ac_id_full || 0,
      payment_type: allValues.payment_type_full || 0,
      total_occupancy: allValues.total_occupancy,
      nid_no: allValues.nid_no ? allValues.nid_no : "N/A",
      passport_no: allValues.passport_no ? allValues.passport_no : "N/A",
      extra_charge: allValues.extra_charge ? allValues.extra_charge : 0,
      phone: allValues.phone ? allValues.phone : "N/A",
    };
    setBookList(bookListValue);
  };
  const handleFilterPartialChange = (_changeValue: any, allValues: any) => {
    const bookListValue = {
      name: allValues.name,
      email: allValues.email,
      // discount_amount: allValues.discount_amount_partial || 0,
      // tax_amount: allValues.tax_amount_partial,
      discount_amount: allValues.discount_amount || 0,
      tax_amount: allValues.tax_amount || 0,

      paid_amount: allValues.paid_amount_partial || 0,
      ac_tr_ac_id: allValues.ac_tr_ac_id_partial || 0,
      payment_type: allValues.payment_type_full || 0,
      total_occupancy: allValues.total_occupancy,
      nid_no: allValues.nid_no ? allValues.nid_no : "N/A",
      passport_no: allValues.passport_no ? allValues.passport_no : "N/A",
      extra_charge: allValues.extra_charge ? allValues.extra_charge : 0,
    };
    setBookPartialList(bookListValue);
  };

  useEffect(() => {
    if (data) {
      const roomTypeList =
        data?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: value.room_number,
          id: value.id,
          key: `room_${value.room_type}_${index}`,
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
    let totaladults = 0;
    let totalchild = 0;
    let totalRoomCharge = 0;
    let totalDiscoutPercent = 0;
    if (roomHistoryList) {
      totaladults = roomHistoryList?.reduce(
        (sum: number, item: any) => sum + item?.adult,
        0
      );
      totalchild = roomHistoryList?.reduce(
        (sum: number, item: any) => sum + item?.child,
        0
      );
      totalRoomCharge = roomHistoryList?.reduce(
        (sum: number, item: any) =>
          sum + (parseInt(item?.rate_per_night, 10) || 0),
        0
      );
      totalDiscoutPercent = roomHistoryList?.reduce(
        (sum: number, item: any) =>
          sum +
          ((parseInt(item?.rate_per_night, 10) || 0) *
            (parseInt(item?.discount_percent ? item?.discount_percent : 0, 10) ||
              0)) /
            100,
        0
      );
    }
    const totalGuest = totaladults + totalchild;
    const totalCostWithDiscount =
      (numberOfNights != 0
        ? totalRoomCharge * numberOfNights
        : totalRoomCharge * 1) -
      (numberOfNights != 0
        ? totalDiscoutPercent * numberOfNights
        : totalDiscoutPercent * 1);
    // const totalDiscountAmmount =
    //   (totalRoomCharge * diffInDays ? totalRoomCharge * diffInDays : 0) *
    //   (totalDiscoutPercent / 100);

    const Calculation = {
      totaladults,
      totalchild,
      totalGuest: totalGuest ? totalGuest : 0,
      totalRoomCharge:
        totalRoomCharge * numberOfNights != 0
          ? totalRoomCharge * numberOfNights
          : totalRoomCharge * 1,
      totaldiscountAmmount:
        numberOfNights != 0
          ? totalDiscoutPercent * numberOfNights
          : totalDiscoutPercent * 1,
      totalcostwithdiscount: totalCostWithDiscount ? totalCostWithDiscount : 0,
    };
    setSumList(Calculation);
  }, [roomHistoryList, numberOfNights]);

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
      // discount_amount_full: sum?.totaldiscountAmmount,
      discount_amount_full: 0,
      tax_amount_full: 0,
      paid_amount_full: 0,
    });
  }, [form]);
  useEffect(() => {
    form.setFieldsValue({
      // discount_amount_full: sum?.totaldiscountAmmount,
      discount_amount_partial: 0,
      tax_amount_partial: 0,
      paid_amount_partial: 0,
    });
  }, [form]);
  // [form, sum?.totaldiscountAmmount]);

  useEffect(() => {
    const filteredRoom = data?.data?.filter(
      (room: any) => room.id === parseInt(roomId)
    );

    setSelectedRoom(filteredRoom);
  }, [roomId, roomList]);

  const onFinish = (values: any) => {
    console.log("values");
    const totalGuest = sum?.totalGuest || 0;

    // const isAllRoomsMatching = values?.booking_rooms?.every(
    //   (bookingRoom: any) =>
    //     bookingRoom &&
    //     bookingRoom?.room_type &&
    //     roomList.some(
    //       (room: any) => room && room?.room_type === bookingRoom?.room_type
    //     )
    // );

    if (
      Payment === 0 &&
      values.payment_type_partial &&
      Number(values.ac_tr_ac_id_partial) &&
      values.total_occupancy <=
        (totalGuest
          ? totalGuest
          : selectedRoom && selectedRoom.length > 0
          ? selectedRoom?.[0]?.adult + selectedRoom?.[0]?.child
          : 0)
      //     &&
      // isAllRoomsMatching
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

        booking_rooms: values?.booking_rooms?.map((item: any) => ({
          room_id: Number(item.room_type),
        })),
      };
      roomBookingData(CreateRoom_partial as any);
    } else if (
      Payment === 2 &&
      values.payment_type_full &&
      Number(values.ac_tr_ac_id_full) &&
      values.total_occupancy <=
        (totalGuest
          ? totalGuest
          : selectedRoom && selectedRoom.length > 0
          ? selectedRoom?.[0]?.adult + selectedRoom?.[0]?.child
          : 0)
      //     &&
      // isAllRoomsMatching
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

        booking_rooms: values?.booking_rooms?.map((item: any) => ({
          room_id: Number(item?.room_type),

          // quantity: 1,
        })),
      };
      roomBookingData(CreateRoom_full as any);
    } else if (
      Payment === 1 &&
      // values.total_occupancy <= totalGuest
      values.total_occupancy <=
        (totalGuest
          ? totalGuest
          : selectedRoom && selectedRoom.length > 0
          ? selectedRoom?.[0]?.adult + selectedRoom?.[0]?.child
          : 0)
      //      &&
      // isAllRoomsMatching
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

        booking_rooms: values?.booking_rooms?.map((item: any) => ({
          room_id: Number(item?.room_type),
        })),
      };

      roomBookingData(CreateRoom_nopayment as any);
    }
    // (
    //   values.total_occupancy >
    //   (totalGuest
    //     ? totalGuest
    //     : selectedRoom && selectedRoom.length > 0
    //     ? selectedRoom?.[0]?.adult + selectedRoom?.[0]?.child
    //     : 0)
    // )
    else {
      message.error(
        `Total Number of Guests (${
          values.total_occupancy
        }) cannot exceed the Total no. of Room Capacity (${
          totalGuest
            ? totalGuest
            : selectedRoom && selectedRoom.length > 0
            ? selectedRoom?.[0]?.adult + selectedRoom?.[0]?.child
            : 0
        }).`
      );
    }
    // else {
    //   message.error(
    //     "All the rooms have to be available at this date and time! "
    //   );
    // }
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setBookList([]);
      setRoomHistoryList([]);
      setRoomHistoryList([]);

      navigate(`/book_list`);
    }
  }, [form, isSuccess]);
  useEffect(() => {
    const defaultValue = sum?.totalRoomCharge
      ? (sum?.totalRoomCharge ?? 0) +
        (bookList?.extra_charge ?? 0) +
        (bookList?.tax_amount ?? 0) -
        (bookList?.discount_amount ?? 0)
      : numberOfNights !== 0
      ? numberOfNights *
        (Number(
          (selectedRoom &&
            selectedRoom.length > 0 &&
            selectedRoom?.[0]?.rate_per_night) ??
            0
        ) +
          Number(bookList?.extra_charge ?? 0) +
          Number(bookList?.tax_amount ?? 0) -
          Number(bookList?.discount_amount ?? 0))
      : 1 *
        (Number(
          (selectedRoom &&
            selectedRoom.length > 0 &&
            selectedRoom?.[0]?.rate_per_night) ??
            0
        ) +
          Number(bookList?.extra_charge ?? 0) +
          Number(bookList?.tax_amount ?? 0) -
          Number(bookList?.discount_amount ?? 0));

    // Set the default value for 'paid_amount_full' field
    form.setFieldsValue({ paid_amount_full: Number(defaultValue) });
  }, [sum, bookList, numberOfNights, selectedRoom, form]);

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
        booking_rooms: [{ room_type: parseInt(bookingId) }],
      });
    } else if (roomId === "make-booking") {
      form.setFieldsValue({
        check_in_time: "",
        check_out_time: "",
        booking_rooms: [{}],
      });
    }
    // else {
    //   form.setFieldsValue({
    //     booking_rooms: [
    //       { room_type: "Room is not available for this date and time" },
    //     ],
    //   });
    // }
  }, [roomId, bookingId, from_Id, to_Id]);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  console.log(
    "roomList",
    roomList,
    "roomHistoryList",
    roomHistoryList,
    "updatedBookingRooms",
    updatedBookingRooms
  );
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
              // initialValues={{
              //   booking_rooms: [{  }],
              // }}
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
                              handleFilterChange(
                                { check_in_time: value },
                                form.getFieldsValue()
                              );
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
                              handleFilterChange(
                                { check_out_time: value },
                                form.getFieldsValue()
                              );
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
                            onChange={(value) =>
                              handleFilterChange(
                                { nid_no: value },
                                form.getFieldsValue()
                              )
                            }
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
                            onChange={(value) =>
                              handleFilterChange(
                                { passport_no: value },
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
                            // <span className="font-semibold">Damage Charge</span>
                          }
                          name="extra_charge"
                          style={{ width: "100%" }}
                        >
                          <InputNumber
                            placeholder="Enter extra charge"
                            style={{ width: "100%" }}
                            onChange={(value) => {
                              handleFilterChange(
                                { extra_charge: value },
                                form.getFieldsValue()
                              );
                              handleFilterPartialChange(
                                { extra_charge: value },
                                form.getFieldsValue()
                              );
                            }}
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
                            onChange={(value) => {
                              handleFilterPartialChange(
                                { discount_amount: value },
                                form.getFieldsValue()
                              );
                              handleFilterChange(
                                { discount_amount: value },
                                form.getFieldsValue()
                              );
                            }}
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
                            onChange={(value) => {
                              handleFilterPartialChange(
                                { tax_amount: value },
                                form.getFieldsValue()
                              ),
                                handleFilterChange(
                                  { tax_amount: value },
                                  form.getFieldsValue()
                                );
                            }}
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
                  <Col>
                    <Row>
                      {roomHistoryList.length === 1 ||
                      roomHistoryList.length === 0 ? (
                        <div className="flex items-center gap-2 mt-10">
                          <MdRoomService color="#22d3ee" size="20" />
                          <span className="text-cyan-500 font-semibold">
                            Select Room
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mt-10">
                          <MdRoomService color="#22d3ee" size="20" />
                          <span className="text-cyan-500 font-semibold">
                            Select Rooms
                          </span>
                        </div>
                      )}
                    </Row>
                    <div className="flex justify-center items-center lg:items-stretch">
                      <div className="w-full">
                        <Form.List name="booking_rooms" initialValue={[{}]}>
                          {(fields, { add, remove }) => (
                            <>
                              {fields?.map(
                                (
                                  { key, name, ...restField },
                                  index: number
                                ) => {
                                  return (
                                    <Badge.Ribbon
                                      key={key}
                                      text={`Room ${name + 1}`}
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
                                          <Col xs={24} sm={24} md={24} lg={24}>
                                            <Form.Item
                                              label={
                                                <span className="font-semibold">
                                                  Select Room
                                                </span>
                                              }
                                              {...restField}
                                              name={[name, "room_type"]}
                                              style={{ width: "100%" }}
                                              rules={[
                                                {
                                                  required: true,
                                                  message:
                                                    "Please select a room",
                                                },
                                                ({
                                                  getFieldValue,
                                                  setFieldsValue,
                                                }) => ({
                                                  validator(_, value) {
                                                    const selectedRoomId =
                                                      value;
                                                    const otherRooms =
                                                      getFieldValue(
                                                        "booking_rooms"
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
                                                          "Room must be selected"
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
                                                          "Room must be different from other rooms"
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
                                                    {
                                                      room_type: value,
                                                    },
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
                                          You have to Select Room to Add Room
                                        </span>
                                      </div>
                                    </Form.Item>
                                  ) : (
                                    <>
                                      {fields.length <
                                      (roomList?.length || 0) ? (
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
                                              width: "240px",
                                            }}
                                          >
                                            Add Room
                                          </Button>
                                        </Form.Item>
                                      ) : (
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
                                              You can not add more room because
                                              total number of room is{" "}
                                              {roomList?.length}
                                            </span>
                                          </div>
                                        </Form.Item>
                                      )}
                                    </>
                                  )}
                                </Col>
                              </Row>
                            </>
                          )}
                        </Form.List>
                      </div>
                      <div className="hidden lg:block">
                        <RoomBookingDetails
                          roomHistoryList={roomHistoryList}
                          updatedBookingRooms={updatedBookingRooms}
                        />
                      </div>
                    </div>
                  </Col>
                  {/* ..........................Partial/Full payment............................................................................. */}
                  {form.getFieldValue("payment_method") === 0 ||
                  form.getFieldValue("payment_method") === 2 ? (
                    <Card style={{ marginBottom: "20px" }}>
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
                                {sum?.totalRoomCharge
                                  ? (sum?.totalRoomCharge ?? 0) +
                                    (bookListPartial?.extra_charge ?? 0) +
                                    (bookListPartial?.tax_amount
                                      ? bookListPartial?.tax_amount
                                      : 0) -
                                    (bookListPartial?.discount_amount
                                      ? bookListPartial?.discount_amount
                                      : 0)
                                  : numberOfNights != 0
                                  ? numberOfNights *
                                    (Number(
                                      (selectedRoom &&
                                        selectedRoom.length > 0 &&
                                        selectedRoom?.[0]?.rate_per_night) ??
                                        0
                                    ) +
                                      Number(
                                        bookListPartial?.extra_charge ?? 0
                                      ) +
                                      Number(
                                        bookListPartial?.tax_amount
                                          ? bookListPartial?.tax_amount
                                          : 0
                                      ) -
                                      Number(
                                        bookListPartial?.discount_amount
                                          ? bookListPartial?.discount_amount
                                          : 0
                                      ))
                                  : 1 *
                                    (Number(
                                      (selectedRoom &&
                                        selectedRoom.length > 0 &&
                                        selectedRoom?.[0]?.rate_per_night) ??
                                        0
                                    ) +
                                      Number(bookList?.extra_charge ?? 0) +
                                      Number(
                                        bookListPartial?.tax_amount
                                          ? bookListPartial?.tax_amount
                                          : 0
                                      ) -
                                      Number(
                                        bookListPartial?.discount_amount
                                          ? bookListPartial?.discount_amount
                                          : 0
                                      ))}
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
                                onChange={(value) => {
                                  form.getFieldValue("payment_method") === 0
                                    ? handleFilterPartialChange(
                                        { paid_amount_full: value },
                                        form.getFieldsValue()
                                      )
                                    : handleFilterChange(
                                        { paid_amount_full: value },
                                        form.getFieldsValue()
                                      );
                                }}
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
                                  form.getFieldValue("payment_method") === 0
                                    ? handleFilterPartialChange(
                                        { payment_type_partial: value },
                                        form.getFieldsValue()
                                      )
                                    : handleFilterChange(
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
                                onChange={(value) => {
                                  form.getFieldValue("payment_method") === 0
                                    ? handleFilterPartialChange(
                                        { ac_tr_ac_id_partial: value },
                                        form.getFieldsValue()
                                      )
                                    : handleFilterChange(
                                        { ac_tr_ac_id_full: value },
                                        form.getFieldsValue()
                                      );
                                }}
                                // disabled={
                                //   !form.getFieldValue("payment_type_partial")
                                // }
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
        </div>
        {/* ..........................Your Selection............................................................... */}

        <YourSelection
          date={date}
          date_out={date_out}
          bookList={bookList}
          form={form}
          roomHistoryList={roomHistoryList}
          updatedBookingRooms={updatedBookingRooms}
          sum={sum}
          selectedRoom={selectedRoom}
          numberOfNights={numberOfNights}
          Payment={Payment}
          bookListPartial={bookListPartial}
          EMAIL={EMAIL}
          NAME={NAME}
        />
      </div>
    </>
  );
};

export default CreateBooking;
