import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  theme,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useGetHotelRoomListQuery } from "../api/HotelRoomEndPoints";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";

import { MdAdd } from "react-icons/md";
import { useAppSelector } from "../../../app/store/store";
import { globalTheme } from "../../../app/slice/themeSlice";

// interface FilterState {
//   room_number: string;
//   room_type: string;
//   room_size: string;
//   bed_type: string;
//   availability: string;
//   refundable_time: string;
// }
// const { RangePicker } = DatePicker;
const AllRoomList = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [filterValue, setFilterValue] = useState<any>({
    key: "",
    // availability: "",
    refundable: "",
    skip: 0,
    limit: 20,
  });

  const valuesWithData: any = {} as any;

  for (const key of Object.keys(filterValue)) {
    // eslint-disable-next-line no-prototype-builtins
    if (filterValue.hasOwnProperty(key) && filterValue[key]) {
      valuesWithData[key] = filterValue[key];
    }
  }

  const { data } = useGetHotelRoomListQuery(valuesWithData);

  //   const [deleteProjectData, { isSuccess }] = useDeleteProjectListMutation();

  const handleFilterChange = (name: string, value: string) => {
    setFilterValue((prevFilterValue: any) => ({
      ...prevFilterValue,
      [name]: value,
    }));
  };

  const roomListColumns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Room Number",
      dataIndex: "room_number",
      key: "room_number",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Room Type",
      dataIndex: "room_type",
      key: "room_type",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Bed Type",
      dataIndex: "bed_type",
      key: "bed_type",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Rate Per Night",
      dataIndex: "rate_per_night",
      key: "rate_per_night",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Discount Percent",
      dataIndex: "discount_percent",
      key: "discount_percent",
      render: (text) => <span>{text ? text + " %" : "N/A"}</span>,
    },
    {
      title: "Tax Percent",
      dataIndex: "tax_percent",
      key: "tax_percent",
      render: (text) => <span>{text ? text + " %" : "N/A"}</span>,
    },
    {
      title: "Occupancy",
      dataIndex: "occupancy",
      key: "occupancy",
      render: (text) => (
        <span>{text > 1 ? text + " Persons" : text + " Person"}</span>
      ),
    },
    {
      title: "Refundable",
      dataIndex: "refundable",
      key: "refundable",

      render: (text) => (
        <span>
          <Tag color={text === 0 ? "orange" : "green"}>
            {text === 0 ? "Non-Refundable " : "Refundable"}
          </Tag>
        </span>
      ),
    },
    // {
    //   title: "Availability",
    //   dataIndex: "available_status",
    //   key: "available_status",
    //   render: (text) => (
    //     <span>
    //       <Tag color={text === 0 ? "orange" : "green"}>
    //         {text === 0 ? "Unavailable" : " Availabale"}
    //       </Tag>
    //     </span>
    //   ),
    // },
  ];

  return (
    <>
      <div className="mt-5 mb-[40px]">
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
                  <span>Room</span>
                </>
              ),
            },
            {
              title: <span className="text-[#119B9D]">Room List</span>,
            },
          ]}
        />
      </div>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {/* <Typography.Title level={5}>Room List</Typography.Title> */}
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
              backgroundImage:
                themeGlobal.theme === theme.defaultAlgorithm
                  ? `url('/bg/svg (3).png')`
                  : `url('/bg/svg (4).png')`,

              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-center w-full">
              <Form
                layout="vertical"
                className="flex flex-col lg:flex-row gap-2 items-center w-full"
              >
                <Col xs={24} sm={12} md={12} lg={10} xl={6}>
                  <Form.Item
                    label="Search By Room Number / Room Type"
                    style={{ width: "100%" }}
                  >
                    <Input
                      onChange={(e) =>
                        handleFilterChange("key", e.target.value)
                      }
                      type="text"
                      placeholder="Search By Room Number / Room Type"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={10} xl={6}>
                  <Form.Item
                    label="Search Rooms By Refundable / Non-refundable"
                    style={{ width: "100%" }}
                  >
                    <Select
                      defaultValue={""}
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleFilterChange("refundable", value.toString())
                      }
                    >
                      <Select.Option value="">All</Select.Option>
                      <Select.Option value="1">Refundable</Select.Option>
                      <Select.Option value="0">Non-refundable</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/* <Col xs={24} sm={12} md={12} lg={15}>
                  <Select
                    defaultValue={""}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleFilterChange("availability", value.toString())
                    }
                  >
                    <Select.Option value="">All</Select.Option>
                    <Select.Option value="1">Available</Select.Option>
                    <Select.Option value="0">Unavailable</Select.Option>
                  </Select>
                </Col> */}
                {/* <Col xs={24} sm={12} md={12} lg={8}>
                  <RangePicker
                    // showTime={{ format: "HH:mm" }}
                    showTime={{
                      format: "HH:mm A", // Specify the format including AM/PM
                      use12Hours: true, // Set to true to enable 12-hour format
                    }}
                    format="YYYY-MM-DD HH:mm"
                  />
                </Col> */}
              </Form>

              <Link to={`/hotel/room-create`}>
                <Button
                  icon={<MdAdd size="18px" />}
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
                  Add New Room
                </Button>
              </Link>
            </div>
          </Card>

          <Table
            size="small"
            bordered={true}
            columns={[
              ...roomListColumns,
              {
                title: "View",
                key: "action",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                render: (record: any) => (
                  <Space size="middle">
                    <Link to={`/room_detail/${record?.id}`}>
                      <Tooltip title="View">
                        <FaEye />
                      </Tooltip>
                    </Link>
                    {/* More actions can be added here */}
                  </Space>
                ),
              },
            ]}
            onChange={(pagination) => {
              setFilterValue({
                ...filterValue,
                skip:
                  ((pagination.current || 1) - 1) * (pagination.pageSize || 20),
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
            dataSource={data?.data && data.data.length > 0 ? data.data : []}
            key={"room_id"}
            rowKey="room_id"
            scroll={{ x: true }}
            // pagination={{ showSizeChanger: true }}
          />
        </Col>
      </Row>
    </>
  );
};

export default AllRoomList;
