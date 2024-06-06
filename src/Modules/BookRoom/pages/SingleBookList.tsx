import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Descriptions,
  Drawer,
  Table,
  Tag,
} from "antd";
import type { DescriptionsProps } from "antd";

import { ColumnsType } from "antd/es/table";
import { useGetRoomBookingSingleDetailsQuery } from "../api/RoomBookingEndPoints";
import { Link, useParams } from "react-router-dom";
import {
  SingleBookingRooms,
  SingleRoomBookingData,
} from "../Types/RoomBookingTypes";
import { imageURL } from "../../../app/slice/baseQuery";
import dayjs from "dayjs";
import { EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { CiCircleList } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaArrowLeftLong } from "react-icons/fa6";
import UpdateSingleBooking from "../components/UpdateSingleBooking";
import { useState } from "react";

const SingleBookList = () => {
  const { id } = useParams();
  const { data: singleRoom, isLoading } = useGetRoomBookingSingleDetailsQuery(
    Number(id)
  );
  const bookinghistory = singleRoom?.data?.booking_rooms;
  console.log("singleRoom", singleRoom?.data);
  console.log("bookinghistory", bookinghistory);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getStatusColor = (value: string) => {
    switch (value) {
      case "approved":
        return "green";
      case "pending":
        return "orange";
      case "rejected":
        return "volcano";
      case "refunded":
        return "cyan";
      case "left":
        return "magenta";
      default:
        return "default-color"; // You can specify a default color if needed
    }
  };

  const getStatusText = (value: string) => {
    switch (value) {
      case "approved":
        return "Approved";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      case "refunded":
        return "Refunded";
      case "left":
        return "Left";
      default:
        return "N/A";
    }
  };
  const columns: ColumnsType<SingleRoomBookingData> = [
    {
      title: "Guest ID",
      dataIndex: "user_id",
      key: "user_id",

      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Guest Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            {singleRoom?.data?.photo ? (
              <img
                src={`${imageURL}${singleRoom?.data?.photo}`}
                alt="guest_logo"
                width={25}
                height={25}
                className="rounded-full"
              />
            ) : (
              <Avatar size={25} icon={<UserOutlined />} />
            )}
            <span>{text}</span>
          </div>
        </div>
      ),
      align: "center",
    },

    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",

      render: () =>
        singleRoom?.data?.grand_total
          ? `${singleRoom?.data?.grand_total} `
          : "-",

      align: "center",
    },
  ];
  const columns1: ColumnsType<SingleBookingRooms> = [
    {
      title: "Room ID",
      dataIndex: "room_id",
      key: "room_id",

      render: (text) => (
        <Link to={`/room_detail/${text}`} target="_blank">
          {text}
        </Link>
      ),
      align: "center",
    },
    {
      title: "Room Number",
      dataIndex: "room_number",
      key: "room_number",

      render: (text, record) => (
        <Link to={`/room_detail/${record.room_id}`} target="_blank">
          {text}
        </Link>
      ),
      align: "center",
    },

    {
      title: "Bed Type",
      dataIndex: "bed_type",
      key: "bed_type",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Room Type",
      dataIndex: "room_type",
      key: "room_type",

      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Rate Per Night",
      dataIndex: "rate_per_night",
      key: "rate_per_night",

      render: (text) => <span>{text}</span>,
      align: "center",
    },
  ];

  const items_two: DescriptionsProps["items"] = [
    // {
    //   key: "1",
    //   label: "Hotel name",
    //   children: (
    //     <>
    //       <div className="flex items-baseline gap-1">
    //         <img src="/logo/hotel.jpg" alt="hotel_logo" width={20} />
    //         <span className="font-semibold">InterContinental</span>
    //       </div>
    //       <br />
    //       Dhaka 1 Minto Road GPO Box 504, Dhaka, Bangladesh
    //     </>
    //   ),
    // },

    {
      key: "1",
      label: "Check in Date",
      children: (
        <div className="flex gap-1">
          <span>
            {dayjs(singleRoom?.data?.check_in_time).format("DD-MM-YYYY ")
              ? dayjs(singleRoom?.data?.check_in_time).format("DD-MM-YYYY ")
              : "-"}
          </span>

          <span>
            &#40;
            {dayjs(singleRoom?.data?.check_in_time).format("hh:mm A")
              ? dayjs(singleRoom?.data?.check_in_time).format("hh:mm A")
              : "-"}
            &#41;
          </span>
        </div>
      ),
    },
    {
      key: "2",
      label: "Check out Date",
      children: (
        <div className="flex gap-1">
          <span>
            {dayjs(singleRoom?.data?.check_out_time).format("DD-MM-YYYY ")
              ? dayjs(singleRoom?.data?.check_out_time).format("DD-MM-YYYY ")
              : "-"}
          </span>

          <span>
            &#40;
            {dayjs(singleRoom?.data?.check_out_time).format("hh:mm A")
              ? dayjs(singleRoom?.data?.check_out_time).format("hh:mm A")
              : "-"}
            &#41;
          </span>
        </div>
      ),
    },
    {
      key: "3",
      label: "Number of Nights",
      children: (
        <>
          {Number(singleRoom?.data?.number_of_nights) > 1
            ? singleRoom?.data?.number_of_nights + " Days"
            : singleRoom?.data?.number_of_nights + " Day"}
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          {Number(singleRoom?.data?.total_extended_nights) > 1
            ? "Extended Nights"
            : "Extended Night"}
        </>
      ),
      children: (
        <>
          {Number(singleRoom?.data?.total_extended_nights) > 1
            ? singleRoom?.data?.total_extended_nights + " Days"
            : singleRoom?.data?.total_extended_nights + " Day"}
        </>
      ),
    },
    {
      key: "4",
      label: "Total Occupancy",
      children: (
        <>
          {singleRoom?.data?.total_occupancy &&
          singleRoom?.data?.total_occupancy <= 1
            ? singleRoom?.data?.total_occupancy + " Person"
            : singleRoom?.data?.total_occupancy + " Persons"}
        </>
      ),
    },
    {
      key: "44",
      label: "Extra Charge",
      children: (
        <>
          {singleRoom?.data?.extra_charge
            ? singleRoom?.data?.extra_charge
            : "N/A"}
        </>
      ),
    },

    {
      key: "6",
      label: "Grand Total",
      children: (
        <>
          {singleRoom?.data?.grand_total
            ? `${singleRoom?.data?.grand_total}`
            : "-"}
        </>
      ),
      span: 3,
    },
    {
      key: "7",
      label: "Status",
      children: (
        <>
          <Tag
            color={getStatusColor(singleRoom?.data?.status ?? "")}
            style={{ width: "70px", textAlign: "center" }}
          >
            {getStatusText(singleRoom?.data?.status ?? "")}
          </Tag>
        </>
      ),
    },
    {
      key: "88",
      label: "Created By",
      children: <span>{singleRoom?.data?.created_by_name}</span>,
    },
    // {
    //   key: "8",
    //   label: "Created Date",
    //   children: (
    //     <div className="flex gap-1">
    //       <span>
    //         {dayjs(singleRoom?.data?.created_at).format("DD-MM-YYYY ")}
    //       </span>

    //       <span>
    //         &#40;{dayjs(singleRoom?.data?.created_at).format("hh:mm A")}
    //         &#41;
    //       </span>
    //     </div>
    //   ),
    // },
    // {
    //   key: "9",
    //   label: "Updated Date",
    //   children: (
    //     <div className="flex gap-1">
    //       <span>
    //         {dayjs(singleRoom?.data?.updated_at).format("DD-MM-YYYY ")
    //           ? dayjs(singleRoom?.data?.updated_at).format("DD-MM-YYYY ")
    //           : "-"}
    //       </span>

    //       <span>
    //         &#40;
    //         {dayjs(singleRoom?.data?.updated_at).format("hh:mm A")
    //           ? dayjs(singleRoom?.data?.updated_at).format("hh:mm A")
    //           : "-"}
    //         &#41;
    //       </span>
    //     </div>
    //   ),
    // },
    // {
  ];

  return (
    <div className="grid ">
      <div className="flex flex-col lg:flex-row justify-between mt-3 mb-10 gap-5">
        <Breadcrumb
          separator=">"
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "/book_list",
              title: (
                <>
                  <span>Dashboard</span>
                </>
              ),
            },
            {
              href: "/book_list",
              title: (
                <div className="flex gap-1 items-center">
                  <CiCircleList size="15" />
                  <span>Booking List</span>
                </div>
              ),
            },
            {
              href: "",
              title: (
                <div className="flex gap-1 items-center text-[#20a09e] font-semibold">
                  <CgProfile size="15" color="#20a09e" />
                  <span>Guest's Booking Info</span>
                </div>
              ),
            },
          ]}
        />
        <div className="flex flex-col md:flex-row items-center gap-2 justify-center xl:justify-normal">
          <Link to={`/book_list`}>
            <Button
              icon={<FaArrowLeftLong />}
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                width: "190px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Return to Booikng List
            </Button>
          </Link>

          <Button
            icon={<EditOutlined />}
            onClick={showDrawer}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Extend Booking
          </Button>
        </div>
      </div>

      <h2 className="text-base font-semibold mb-5">Guest Info</h2>
      <Col xs={18} sm={18} md={18} lg={24} xl={24}>
        <Table
          size="small"
          columns={columns}
          dataSource={[singleRoom?.data] as any}
          pagination={false}
          bordered={true}
          loading={isLoading}
          scroll={{ x: true }}
        />
      </Col>
      <Col xs={18} sm={18} md={18} lg={24} xl={24}>
        <Descriptions
          size="small"
          title="Room Booking Info"
          bordered
          items={items_two}
          column={1}
          className="mt-5"
        />
      </Col>

      <h2 className="text-base font-semibold my-5">
        Guest Booking Room History
      </h2>
      <Col xs={18} sm={18} md={18} lg={24} xl={24}>
        <Table
          size="small"
          columns={columns1}
          dataSource={bookinghistory}
          pagination={false}
          bordered={true}
          loading={isLoading}
          scroll={{ x: true }}
        />
      </Col>

      <Drawer title="Extend Booking" width={500} onClose={onClose} open={open}>
        <UpdateSingleBooking singleRoom={singleRoom} onClose={onClose} />
      </Drawer>
    </div>
  );
};

export default SingleBookList;
