import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
// import debounce from "lodash/debounce";
import { FaArrowLeftLong, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetAllRoomBookingListQuery } from "../api/RoomBookingEndPoints";
import { IMemberParams } from "../Types/RoomBookingTypes";

import Search from "antd/es/input/Search";
import dayjs from "dayjs";
import { HomeOutlined } from "@ant-design/icons";
import { CiCircleList } from "react-icons/ci";
import { FcCancel } from "react-icons/fc";

import CheckinThirdVersion from "./CheckinThirdVersion";
import CheckOutVersionThree from "../components/CheckOutVersionThree";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";

const BookList = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [filter, setFilter] = useState<IMemberParams>({
    skip: 0,
    limit: 20,
  });
  const { data, isLoading } = useGetAllRoomBookingListQuery({ ...filter });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFilter: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setFilter({ ...filter, name: value ? value : "" });
  };

  const onStatusFilter = (value: string) => {
    setFilter({ ...filter, status: value });
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
        return "purple"; // You can specify a default color if needed
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
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Link to={`/single_book_list/${text}`}>{text ? text : "N/A"} </Link>
      ),
    },

    {
      title: "Booking No",
      dataIndex: "booking_no",
      key: "booking_no",
      render: (text, record) => (
        <Link to={`/single_book_list/${record?.id}`}>
          {text ? text : "N/A"}
        </Link>
      ),
    },
    {
      title: "Guest Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link
          to={`/guest/guest-list/${record?.user_id}`}
          className="flex gap-3"
        >
          {text ? text : "N/A"}
        </Link>
      ),
    },
    {
      title: "Email / Phone No",
      // dataIndex: "email",
      key: "email",
      render: (record) => (
        <Link
          to={`/guest/guest-list/${record?.user_id}`}
          className="flex gap-3"
        >
          {record?.email ? record?.email : record?.phone}
        </Link>
      ),
    },
    {
      title: "Total Occupancy",
      dataIndex: "total_occupancy",
      key: "total_occupancy",
      // render: (text) => <>{text > 1 ? text + " Persons" : text + " Person"}</>,
      render: (text) => <>{text ? text + " Person" : "N/A"}</>,
    },
    {
      title: "Number Of Nights",
      dataIndex: "number_of_nights",
      key: "number_of_nights",

      render: (text) => <>{text > 1 ? text + " Days" : text + " Day"}</>,
    },

    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",
      render: (text) => <>{text ? text : "N/A"} </>,
    },

    {
      title: "Check in Date & Time",
      dataIndex: "check_in_time",
      key: "check_in_time",

      render: (text) => (
        <div className="flex gap-1">
          <span className="font-semibold">
            {dayjs(text).format("DD-MM-YYYY ")}
          </span>
          <span>&#40;{dayjs(text).format("hh:mm A")}&#41;</span>
          {/* <span>
            &#40;{dayjs(text).subtract(6, "hour").format("hh:mm A")}&#41;
          </span> */}
        </div>
      ),
    },
    {
      title: "Check out Date & Time",
      dataIndex: "check_out_time",
      key: "check_out_time",
      render: (text) => (
        <div className="flex gap-1">
          <span className="font-semibold">
            {dayjs(text).format("DD-MM-YYYY ")}
          </span>
          <span>&#40;{dayjs(text).format("hh:mm A")}&#41; </span>
          {/* <span>
            &#40;{dayjs(text).subtract(6, "hour").format("hh:mm A")}&#41;
          </span> */}
        </div>
      ),
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          <Tag
            color={getStatusColor(status ?? "")}
            style={{ width: "70px", textAlign: "center" }}
          >
            {getStatusText(status ?? "")}
          </Tag>
        </>
      ),
    },

    {
      title: "Check In & Out Status",

      render: (_, record) => {
        if (record?.check_in_out_status === null) {
          return record?.status === "refunded" ? (
            <Tooltip
              title={
                <div className="flex items-center gap-2">
                  <IoIosCheckmarkCircle color="green" /> This Booking Has Been
                  <span>Refunded</span>
                </div>
              }
            >
              <Tag
                color="cyan"
                icon={<IoIosCheckmarkCircle color="green" />}
                style={{
                  display: "flex",
                  gap: "2px",
                  alignItems: "center",
                  width: "150px",
                }}
              >
                Refunded Successfully
              </Tag>
            </Tooltip>
          ) : (
            // <Popconfirm
            //   title="Make Refund"
            //   description="Are you sure to Refund this task?"
            //   onConfirm={() => {
            //     deleteBedDataData(record?.id);
            //   }}
            //   okText="Yes"
            //   cancelText="No"
            // >
            //   <Button
            //     size="small"
            //     style={{
            //       backgroundColor: "#01adad",
            //       color: "white",
            //       borderRadius: "40px",
            //       borderColor: "#01adad",
            //       fontSize: "small",
            //       width: "150px",
            //     }}
            //   >
            //     Make Refund
            //   </Button>
            // </Popconfirm>
            <Tag
              style={{
                width: "150px",
                textAlign: "center",
              }}
            >
              Make Check In
            </Tag>
          );
        } else {
          return (
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Tag
                color={getCheckIn_outColor(record?.check_in_out_status ?? "")}
                style={{ width: "100%", textAlign: "center" }}
              >
                {getCheckIn_out_text(record?.check_in_out_status ?? "")}
              </Tag>
            </Col>
          );
        }
      },
    },

    // {
    //   title: "Room Check In / Check Out",
    //   key: "Room Check In / Check Out",
    //   render: (_, record) => {
    //     if (record?.check_in_out_status === null) {
    //       return (
    //         <Button
    //           size="middle"
    //           // type="primary"
    //           onClick={() => handleUpdateCheckOut(record.id)}
    //           style={{
    //             borderRadius: "50px",
    //             backgroundColor: "#01adad",
    //             color: "white",
    //           }}
    //         >
    //           Room Check In
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
    //               onClick={() => handleUpdateCheckOutID(record?.check_in_id)}
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
      title: "Room Check In / Check Out",
      key: "Room Check In / Check Out",
      render: (_, record) => {
        if (record?.status !== "refunded") {
          if (record?.check_in_out_status === null) {
            return (
              <CheckinThirdVersion
                bookingId={record?.id}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
              />
            );
          } else {
            return (
              <>
                {record.check_in_out_status !== "checked-in" ? (
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#D04848",
                        color: "white",
                        borderRadius: "50px",
                        // width: "160px",
                        width: "100%",
                        fontSize: "small",
                      }}
                    >
                      Checked Out
                    </Button>
                  </Col>
                ) : (
                  <CheckOutVersionThree
                    updateData={record?.check_in_id}
                    checkoutdate={record?.check_out_time}
                    GuestId={record?.user_id}
                    invoiceid={record?.room_booking_inv_id}
                    due={record?.due}
                  />
                )}
              </>
            );
          }
        } else {
          // Handle the case when record?.status is "refunded"
          return (
            <Tooltip
              title={
                <div className="grid">
                  <span>You can not make</span>
                  <span>
                    <strong>Check In</strong> or <strong>Check Out.</strong>
                  </span>
                  <span>
                    Because this <strong>Booking</strong> has
                  </span>
                  <span>
                    been <strong>Refunded.</strong>
                  </span>
                </div>
              }
            >
              <Tag
                color="cyan"
                className="grid"
                icon={<FcCancel />}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  width: "160px",
                }}
              >
                <span>
                  <strong>Check In</strong> or <strong>Check Out</strong>
                </span>
                {/* <span>not avalaible.</span> */}
              </Tag>
            </Tooltip>
          ); // Or any other appropriate handling
        }
      },
    },

    // {
    //   title: "Make Refund",
    //   key: "MakeRefund",
    //   render: (_, record) => {
    //     if (record?.check_in_out_status === null) {
    //       return (
    //         <Popconfirm
    //           title="Delete the task"
    //           description="Are you sure to Refund this task?"
    //           onConfirm={() => {
    //             deleteBedDataData(record?.id);
    //           }}
    //           okText="Yes"
    //           cancelText="No"
    //         >
    //           <Button
    //             size="small"
    //             style={{
    //               backgroundColor: "#01adad",
    //               color: "white",
    //               borderRadius: "50px",
    //               borderColor: "#01adad",
    //             }}
    //           >
    //             Make Refund
    //           </Button>
    //         </Popconfirm>
    //       );
    //     } else if (
    //       record?.check_in_out_status !== "checked-in" &&
    //       record?.check_in_out_status !== "checked-out"
    //     ) {
    //       return <Tag color="red">Can Not Make Refund</Tag>;
    //     }

    //     return <Tag color="red">Can Not Make Refund</Tag>; // Return null if none of the conditions are met
    //   },
    // },

    {
      title: "Action",
      key: "id",

      render: (_, record) => (
        <Space size="middle">
          <Link to={`/single_book_list/${record?.id}`}>
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
                  Booking List
                </span>
              </div>
            ),
          },
        ]}
      />
      <Card
        style={{
          marginTop: "30px",
          // backgroundImage: `url('/bg/svg (3).png')`,
          backgroundImage:
            themeGlobal.theme === theme.defaultAlgorithm
              ? `url('/bg/svg (3).png')`
              : `url('/bg/svg (4).png')`,

          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col lg:flex-row  justify-between items-center">
          <Form
            layout="vertical"
            className="flex flex-col md:flex-row  justify-start gap-3 items-center w-full"
          >
            <Col xs={24} sm={12} md={12} lg={10} xl={7}>
              <Form.Item
                label="Search By Guest Name, E-mail, Phone No."
                style={{ width: "100%" }}
              >
                <Search
                  placeholder="Search by Guest Name, E-mail, Phone No."
                  onChange={onFilter}

                  // onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                  // enterButton
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={10} xl={7}>
              <Form.Item
                label="Search Booking By Status"
                style={{ width: "100%" }}
              >
                <Select
                  placeholder="Search by status (All, Pending, Approved, Rejected)"
                  onChange={onStatusFilter}
                  defaultValue=""
                  // onChange={(e) =>
                  //   setFilter({ ...filter, status: e.target.value })
                  // }
                  style={{ width: "100%" }}
                  options={[
                    {
                      value: "",
                      label: "All",
                    },
                    {
                      value: "pending",
                      label: "Pending",
                    },
                    {
                      value: "approved",
                      label: "Approved ",
                    },
                    {
                      value: "rejected",
                      label: "Rejected",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Form>
          <Link to={`/create_room_booking/make-booking/from/to`}>
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
              Return to Create Booking
            </Button>
          </Link>
        </div>
      </Card>

      <Table
        size="small"
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
        scroll={{ x: 1400 }}
      />
    </>
  );
};

export default BookList;
