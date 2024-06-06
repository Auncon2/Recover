import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Descriptions,
  Table,
  Tag,
} from "antd";
import type { DescriptionsProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../../app/slice/baseQuery";
import dayjs from "dayjs";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { CiCircleList } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useGetHallBookingSingleDetailsQuery } from "../api/HallBookingEndPoints";
import { CommonHeaderStyles } from "../../../common/style/Style";

const HallBookingSingle = () => {
  const { id } = useParams();
  const { data: singleRoom, isLoading } = useGetHallBookingSingleDetailsQuery(
    Number(id)
  );
  const bookinghistory = singleRoom?.data?.booking_halls;
  console.log("singleRoom", singleRoom?.data);
  console.log("bookinghistory", bookinghistory);
  //   const [open, setOpen] = useState(false);

  //   const showDrawer = () => {
  //     setOpen(true);
  //   };

  //   const onClose = () => {
  //     setOpen(false);
  //   };

  const getStatusColor = (value: string) => {
    switch (value) {
      case "confirmed":
        return "green";
      case "pending":
        return "orange";
      case "canceled":
        return "volcano";
      default:
        return "default-color"; // You can specify a default color if needed
    }
  };

  const getStatusText = (value: string) => {
    switch (value) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending";
      case "canceled":
        return "Canceled";
      default:
        return "Unknown Status";
    }
  };
  const getHistoryStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "green";
      case "booked":
        return "orange";
      case "maintenance":
        return "blue";
      default:
        return "default-color"; // You can specify a default color if needed
    }
  };

  const getHistoryStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "booked":
        return "Booked";
      case "maintenance":
        return "Maintenance";
      default:
        return "Unknown Status";
    }
  };
  const columns: ColumnsType<any> = [
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
      title: "Booking No",
      dataIndex: "booking_no",
      key: "booking_no",

      //   render: () =>
      //     singleRoom?.data?.grand_total
      //       ? `${singleRoom?.data?.grand_total}`
      //       : "-",
      render: (text) => <span>{text}</span>,

      align: "center",
    },
  ];
  const columns1: ColumnsType<any> = [
    {
      title: "Hall ID",
      dataIndex: "hall_id",
      key: "hall_id",

      render: (text) => (
        <Link to={`/hall-details/${text}`} target="_blank">
          {text}
        </Link>
      ),
      align: "center",
    },
    {
      title: "Hall Name",
      dataIndex: "hall_name",
      key: "hall_name",

      render: (text, record) => (
        <Link to={`/hall-details/${record.hall_id}`} target="_blank">
          {text}
        </Link>
      ),
      align: "center",
    },

    {
      title: "Hall Size",
      dataIndex: "hall_size",
      key: "hall_size",
      render: (text) => <>{text}</>,
      align: "center",
    },
    {
      title: "Hall Location",
      dataIndex: "hall_location",
      key: "hall_location",

      render: (text) => <>{text}</>,
      align: "center",
    },
    {
      title: "Rate per Hour",
      dataIndex: "rate_per_hour",
      key: "rate_per_hour",

      render: (text) => <>{text}</>,
      align: "center",
    },
    {
      title: "Guest Capacity",
      dataIndex: "guest_capacity",
      key: "guest_capacity",

      render: (text) => <>{text}</>,
      align: "center",
    },
    {
      title: "Hall Status",
      dataIndex: "hall_status",
      key: "hall_status",

      render: (text) => (
        <>
          <Tag color={getHistoryStatusColor(text ?? "")}>
            {getHistoryStatusText(text ?? "")}
          </Tag>
        </>
      ),
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
      label: "Booking Date",
      children: (
        <div className="flex gap-1">
          <span>
            {dayjs(singleRoom?.data?.booking_date).format("DD-MM-YYYY ")
              ? dayjs(singleRoom?.data?.booking_date).format("DD-MM-YYYY ")
              : "-"}
          </span>

          {/* <span>
              &#40;
              {dayjs(singleRoom?.data?.booking_date)
                .subtract(6, "hour")
                .format("hh:mm A")
                ? dayjs(singleRoom?.data?.booking_date)
                    .subtract(6, "hour")
                    .format("hh:mm A")
                : "-"}
              &#41;
            </span> */}
        </div>
      ),
    },
    {
      key: "2",
      label: "Event Date",
      children: (
        <div className="flex gap-1">
          <span>
            {dayjs(singleRoom?.data?.event_date).format("DD-MM-YYYY ")
              ? dayjs(singleRoom?.data?.event_date).format("DD-MM-YYYY ")
              : "-"}
          </span>

          {/* <span>
              &#40;
              {dayjs(singleRoom?.data?.event_date)
                .subtract(6, "hour")
                .format("hh:mm A")
                ? dayjs(singleRoom?.data?.event_date)
                    .subtract(6, "hour")
                    .format("hh:mm A")
                : "-"}
              &#41;
            </span> */}
        </div>
      ),
    },
    {
      key: "3",
      label: "Start Time",
      children: (
        <>
          {singleRoom?.data?.start_time
            ? dayjs(singleRoom?.data?.start_time, "HH:mm:ss").format("hh:mm A")
            : "-"}
        </>
      ),
    },
    {
      key: "4",
      label: "End Time",
      children: (
        <>
          {singleRoom?.data?.end_time
            ? dayjs(singleRoom?.data?.end_time, "HH:mm:ss").format("hh:mm A")
            : "-"}
        </>
      ),
    },
    {
      key: "5",
      label: "Total Hours",
      children: (
        <>
          {singleRoom?.data?.number_of_hours === 0 ||
          singleRoom?.data?.number_of_hours === 1
            ? `${singleRoom?.data?.number_of_hours} Hour`
            : `${singleRoom?.data?.number_of_hours} Hours`}
        </>
      ),
      span: 2,
    },
    {
      key: "6",
      label: "Grand Total",
      children: (
        <>
          {/* {singleRoom?.data?.grand_total
              ? `${singleRoom?.data?.grand_total} `
              : "N/A"} */}
          {singleRoom?.data?.grand_total}
        </>
      ),
      span: 3,
    },
    {
      key: "7",
      label: "Status",
      children: (
        <>
          <Tag color={getStatusColor(singleRoom?.data?.booking_status ?? "")}>
            {getStatusText(singleRoom?.data?.booking_status ?? "")}
          </Tag>
        </>
      ),
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
  ];
  return (
    <div className="grid ">
      <div className="flex flex-col md:flex-row justify-between mt-3 mb-10">
        <Breadcrumb
          separator=">"
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
              href: "/hall-booking-list",
              title: (
                <div className="flex gap-1 items-center">
                  <CiCircleList size="15" />
                  <span>Hall Booking List</span>
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
        <div className="flex items-center gap-2">
          <Link to={`/hall-booking-list`}>
            <Button
              icon={<FaArrowLeftLong />}
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                width: "230px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Return to Hall Booikng List
            </Button>
          </Link>
        </div>
      </div>

      <h2 style={CommonHeaderStyles as any}>Guest Info</h2>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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

      <h2 style={CommonHeaderStyles as any}>Hall Booking Info</h2>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Descriptions
          size="small"
          bordered
          items={items_two}
          column={1}
          className="mt-5"
        />
      </Col>

      <h2 style={CommonHeaderStyles as any}>Guest Booking History</h2>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
    </div>
  );
};

export default HallBookingSingle;
