import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
// import debounce from "lodash/debounce";
import { FaArrowLeftLong, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

import Search from "antd/es/input/Search";
import dayjs from "dayjs";
import { HomeOutlined } from "@ant-design/icons";
import { CiCircleList } from "react-icons/ci";
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Select,
  Space,
  Table,
  Tag,
  theme,
} from "antd";

import { useGetAllHallBookingListQuery } from "../api/HallBookingEndPoints";

import HallCheckInThirdVersion from "./HallCheckInThirdVersion";
import HallCheckOutModalThirdVersion from "../components/HallCheckOutModalThirdVersion";
import { useAppSelector } from "../../../app/store/store";
import { globalTheme } from "../../../app/slice/themeSlice";
const HallBookingList = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 20,
  });
  const { data, isLoading } = useGetAllHallBookingListQuery({ ...filter });
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalOpenCheckOut, setIsModalOpenCheckOut] = useState(false);
  // const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
  //   null
  // );
  // const [selectedCheckOutId, setSelectedCheckOutId] = useState<number | null>(
  //   null
  // );

  // const handleUpdateCheckOut = (id: any) => {
  //   setSelectedBookingId(id);
  //   setIsModalOpen(true);
  // };

  // const handleUpdateCheckOutID = (id: any) => {
  //   setSelectedCheckOutId(id);
  //   setIsModalOpenCheckOut(true);
  // };

  const onFilter: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setFilter({ ...filter, key: value ? value : "" });
  };

  const onStatusFilter = (value: string) => {
    setFilter({ ...filter, booking_status: value });
  };
  const getStatusColor = (value: string) => {
    switch (value) {
      case "confirmed":
        return "green";
      case "pending":
        return "orange";
      case "canceled":
        return "volcano";
      case "left":
        return "magenta";

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
      case "left":
        return "Left";

      default:
        return "Unknown Status";
    }
  };

  const getCheckIn_outColor = (value: string) => {
    // console.log("getCheckIn_outColor", value);

    switch (value) {
      case "checked-in":
        return "green";
      case "checked-out":
        return "red";
      case undefined:
        return "orange";
      default:
        return ""; // You can specify a default color if needed
    }
  };

  const getCheckIn_out_text = (value: string) => {
    // console.log("getCheckIn_out_text", value);
    switch (value) {
      case "checked-in":
        return "Checked In";
      case "checked-out":
        return "Checked Out";
      case undefined:
        return "Pending";
      default:
        return "Make Check In";
    }
  };

  const columns1: ColumnsType<any> = [
    // {
    //   title: "Guest ID",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Link to={`/single-hall-booked-info/${text}`}>
          {text ? text : "N/A"}
        </Link>
      ),
    },
    {
      title: "Booking ID",
      dataIndex: "booking_no",
      key: "booking_no",
      render: (text, record) => (
        <Link to={`/single-hall-booked-info/${record?.id}`}>
          {text ? text : "N/A"}
        </Link>
      ),
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
      render: (text, record) => (
        <Link to={`/guest/guest-list/${record?.user_id}`}>{text}</Link>
      ),
    },
    {
      title: "Client Email / Phone No",
      // dataIndex: "client_mail",
      key: "client_mail",
      render: (record) => (
        <Link to={`/guest/guest-list/${record?.user_id}`}>
          {record?.client_mail ? record?.client_mail : record?.phone}
        </Link>
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "booking_date",
      key: "booking_date",

      render: (text) => (
        <div className="flex gap-1">
          <span className="font-semibold">
            {dayjs(text).format("DD-MM-YYYY ")}
          </span>
          {/* <span>&#40;{dayjs(text).format("hh:mm A")}&#41;</span> */}
          {/* <span>
            &#40;{dayjs(text).subtract(6, "hour").format("hh:mm A")}&#41;
          </span> */}
        </div>
      ),
    },

    {
      title: "Number Of Hours",
      dataIndex: "number_of_hours",
      key: "number_of_hours",
      render: (text) => (
        <span>
          {text === 1 || text === 0 ? `${text} Hour` : `${text} Hours`}
        </span>
      ),
    },
    {
      title: "Total Guests",
      dataIndex: "total_occupancy",
      key: "total_occupancy",
      // render: (text) => (

      //   <span>
      //     {text === 1 || text === 0 ? `${text} Hour` : `${text} Hours`}
      //   </span>
      // ),
      render: (text) => <a>{text ? text + " Persons" : "N/A"}</a>,
    },

    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Status",
      key: "booking_status",
      dataIndex: "booking_status",
      render: (_, { booking_status }) => (
        <>
          <Tag
            color={getStatusColor(booking_status ?? "")}
            style={{ width: "70px", textAlign: "center" }}
          >
            {getStatusText(booking_status ?? "")}
          </Tag>
        </>
      ),
    },

    {
      title: "Event Date",
      dataIndex: "event_date",
      key: "event_date",
      // render: (text) => (
      //   <div className="flex gap-1">
      //     <span className="font-semibold">
      //       {dayjs(text).format("DD-MM-YYYY ")}
      //     </span>
      //     <span>&#40;{dayjs(text).format("hh:mm A")}&#41;</span>
      //   </div>
      // ),
      render: (text) => (
        <div className="flex gap-1">
          <span className="font-semibold">
            {dayjs(text).format("DD-MM-YYYY ")}
          </span>
          {/* <span>&#40;{dayjs(text).format("hh:mm A")}&#41;</span> */}
          {/* <span>
            &#40;{dayjs(text).subtract(6, "hour").format("hh:mm A")}&#41;
          </span> */}
        </div>
      ),
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      render: (text) => (
        <>
          {/* {dayjs(text, "HH:mm:ss").subtract(6, "hour").format("hh:mm A")} */}
          {dayjs(text, "HH:mm:ss").format("hh:mm A")}
        </>
      ),
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      render: (text) => (
        <>
          {/* {dayjs(text, "HH:mm:ss").subtract(6, "hour").format("hh:mm A")} */}
          {dayjs(text, "HH:mm:ss").format("hh:mm A")}
        </>
      ),
    },
    {
      title: "Check In / Out Status",
      key: "check_in_out_status",
      dataIndex: "check_in_out_status",
      render: (_, { check_in_out_status }) => (
        <>
          <Tag
            color={getCheckIn_outColor(check_in_out_status ?? "")}
            style={{ width: "150px", textAlign: "center" }}
          >
            {getCheckIn_out_text(check_in_out_status ?? "")}
          </Tag>
        </>
      ),
    },
    // {
    //   title: "Hall Check In / Check Out",
    //   key: "hall_check_in",
    //   render: (_, record) => {
    //     if (record?.check_in_out_status === null) {
    //       return (
    //         <Button
    //           size="middle"
    //           // type="primary"
    //           style={{
    //             borderRadius: "50px",
    //             backgroundColor: "#01adad",
    //             color: "white",
    //           }}
    //           onClick={() => handleUpdateCheckOut(record.id)}
    //         >
    //           Hall Check In
    //         </Button>
    //       );
    //     } else {
    //       return (
    //         <Space size="middle">
    //           {record.check_in_out_status !== "checked-in" ? (
    //             <Button
    //               size="small"
    //               // icon={<EditOutlined />}
    //               style={{
    //                 backgroundColor: "#D04848",
    //                 color: "white",
    //                 borderRadius: "50px",
    //                 width: "160px",
    //               }}
    //             >
    //               Already Checked Out
    //             </Button>
    //           ) : (
    //             <Button
    //               size="small"
    //               // icon={<EditOutlined />}
    //               style={{
    //                 backgroundColor: "#33cc00",
    //                 color: "white",
    //                 borderRadius: "50px",
    //                 width: "150px",
    //               }}
    //               onClick={() => handleUpdateCheckOutID(record?.hall_check_in)}
    //             >
    //               Make Check Out
    //             </Button>
    //           )}
    //         </Space>
    //       ); // Return null if the status is not "confirmed"
    //     }
    //   },
    // },
    {
      title: "Hall Check In / Check Out",
      key: "hall_check_in",
      render: (_, record) => {
        if (record?.check_in_out_status === null) {
          return (
            <HallCheckInThirdVersion
              bookingId={record.id}
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              event_date={record.event_date}
              start_time={record.start_time}
              end_time={record.end_time}
            />
          );
        } else {
          return (
            <Space size="middle">
              {record.check_in_out_status !== "checked-in" ? (
                <Button
                  size="small"
                  // icon={<EditOutlined />}
                  style={{
                    backgroundColor: "#D04848",
                    color: "white",
                    borderRadius: "50px",
                    width: "160px",
                  }}
                >
                  Checked Out
                </Button>
              ) : (
                <HallCheckOutModalThirdVersion
                  updateData={record?.hall_check_in}
                  event_date={record.event_date}
                  start_time={record.start_time}
                  end_time={record.end_time}
                  GuestId={record?.user_id}
                  invoiceid={record?.hall_booking_inv_id}
                  due={record.due}
                />
              )}
            </Space>
          ); // Return null if the status is not "confirmed"
        }
      },
    },
    {
      title: "Action",
      key: "id",

      render: (_, record) => (
        <Space size="middle">
          <Link to={`/single-hall-booked-info/${record?.id}`}>
            <FaEye />
          </Link>
        </Space>
      ),
    },
  ];

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
              <div className="flex items-center gap-1">
                <CiCircleList color="#20a09e" size="15" />
                <span className="text-[#20a09e] font-semibold">
                  Hall Booking List
                </span>
              </div>
            ),
          },
        ]}
      />
      <Card
        style={{
          marginTop: "30px",
          backgroundImage:
            themeGlobal.theme === theme.defaultAlgorithm
              ? `url('/bg/svg (3).png')`
              : `url('/bg/svg (4).png')`,

          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col xl:flex-row justify-between items-center">
          <Form
            layout="vertical"
            className="flex flex-col lg:flex-row justify-center xl:justify-start gap-3 items-cente w-[200px] md:w-[450px] lg:w-[700px] 2xl:w-[900px]"
          >
            <Form.Item
              label="Search by Client Name, E-mail, Phone No."
              style={{ width: "100%" }}
            >
              <Search
                placeholder="Search by Client Name, E-mail, Phone No."
                onChange={onFilter}

                // onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                // enterButton
              />
            </Form.Item>

            <Form.Item label="Search by status" style={{ width: "100%" }}>
              <Select
                placeholder="Search by status"
                onChange={onStatusFilter}
                defaultValue="All"
                //   onChange={(e) =>
                //     setFilter({ ...filter, status: e.target.value })
                //   }
                style={{ width: "100%" }}
                options={[
                  {
                    value: "",
                    label: "All",
                  },
                  {
                    value: "confirmed",
                    label: "Confirmed ",
                  },
                  {
                    value: "pending",
                    label: "Pending",
                  },

                  {
                    value: "canceled",
                    label: "Canceled",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Search By Event Date" style={{ width: "100%" }}>
              <DatePicker
                onChange={(value: any) =>
                  setFilter({
                    ...filter,
                    event_date:
                      (value && dayjs(value).format("YYYY-MM-DD")) || "",
                  })
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
            {/*       
            <Col xs={24} sm={12} md={12} lg={7} xl={7}>
        
            </Col> */}
          </Form>
          <Link to={`/create-hall-booking/make-booking/date/from/to`}>
            <Button
              icon={<FaArrowLeftLong />}
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                width: "210px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Return to Hall Booking
            </Button>
          </Link>
        </div>
      </Card>

      {/* <Typography.Title level={5}>Book List</Typography.Title> */}
      <Table
        size="small"
        scroll={{ x: 1400 }}
        style={{ marginTop: "20px" }}
        columns={columns1}
        dataSource={data?.data?.length ? data?.data : []}
        bordered={true}
        loading={isLoading}
        onChange={(pagination) => {
          setFilter({
            ...filter,
            skip: ((pagination.current || 1) - 1) * (pagination.pageSize || 20),
            limit: pagination.pageSize!,
          });
        }}
        pagination={{
          size: "default",
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "50", "100"],
          defaultPageSize: 20,
          // current: filter.skip + 1,
          total: data?.total,
          showTotal: (total) => `Total ${total} `,
        }}
      />

      {/* <HallCheckInSec
        bookingId={selectedBookingId}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <HallCheckOutModal
        updateData={selectedCheckOutId}
        setIsModalOpen={setIsModalOpenCheckOut}
        isModalOpen={isModalOpenCheckOut}
      /> */}
    </>
  );
};

export default HallBookingList;
