import {
  Breadcrumb,
  Card,
  Col,
  Form,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  theme,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";

import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { useGetCustomerListQuery } from "../api/CustomerEndPoints";
import moment from "moment";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";

const Customer = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [filterValue, setFilterValue] = useState<any>({
    key: "",
    skip: 0,
    limit: 20,
  });

  const { data } = useGetCustomerListQuery(filterValue);

  const getHistoryStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "inactive":
        return "orange";
      case "blocked":
        return "red";
      default:
        return "default-color"; // You can specify a default color if needed
    }
  };

  const getHistoryStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "inactive":
        return "Inactive";
      case "blocked":
        return "blocked";
      default:
        return "Unknown Status";
    }
  };

  const bookingInvoiceColumns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },

    {
      title: "Last Balance",
      dataIndex: "last_balance",
      key: "last_balance",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render: (text) => <span>{text ? text : "N/A"}</span>,
      render: (text) => (
        <span className="uppercase">
          <Tag color={getHistoryStatusColor(text ?? "")}>
            {getHistoryStatusText(text ?? "")}
          </Tag>
        </span>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (
        <span>{moment(text).format("MMMM Do YYYY (h:mm a)")}</span>
      ),
    },
  ];
  return (
    <div>
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
                  <span>Guest</span>
                </>
              ),
            },
            {
              title: <span className="text-[#1B9FA2]">Guest List</span>,
            },
          ]}
        />
      </div>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {/* <Typography.Title level={5}>Booking Invoice</Typography.Title> */}

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
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <Form
                layout="vertical"
                className="flex flex-col xl:flex-row justify-start gap-3 items-center w-[200px] md:w-[400px] lg:w-[800px] 2xl:w-[900px]"
              >
                <Form.Item
                  label="Search by Guest Name"
                  style={{ width: "100%" }}
                >
                  <Search
                    placeholder="Search by Guest Name"
                    style={{ width: "100%" }}
                    onChange={(e) => setFilterValue({ key: e.target.value })}
                  />
                </Form.Item>

                <Form.Item label="Search by Status" style={{ width: "100%" }}>
                  <Select
                    placeholder="Search by status"
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      setFilterValue({
                        // ...filterValue,
                        user_type: value ? value : "",
                      })
                    }
                    defaultValue="All"
                    options={[
                      {
                        value: "",
                        label: "All",
                      },
                      {
                        value: "room-guest",
                        label: "Room Guest",
                      },
                      {
                        value: "hall-guest",
                        label: "Hall Guest",
                      },

                      {
                        value: "user",
                        label: "Website User",
                      },
                      // {
                      //   value: "guest",
                      //   label: "guest",
                      // },
                    ]}
                  />
                </Form.Item>
              </Form>
              <div className="flex items-center justify-around w-full xl:w-32">
                <img
                  src="/bg/bgremove (2).png"
                  alt="forgot"
                  className="w-[100px] h-[100px] object-cover object-center "
                />
                <img
                  src="/bg/bgremove (3).png"
                  alt="forgot"
                  className="w-[100px] h-[100px] block xl:hidden "
                />
                <img
                  src="/bg/bgremove (4).png"
                  alt="forgot"
                  className="w-[100px] h-[100px] hidden md:block xl:hidden"
                />
              </div>
            </div>
          </Card>

          <Table
            size="small"
            columns={[
              ...bookingInvoiceColumns,
              {
                title: "View",
                key: "action",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                render: (record: any) => (
                  <Space size="middle">
                    <Link to={`/guest/guest-list/${record.id}`}>
                      <Tooltip title="View">
                        <FaEye />
                      </Tooltip>
                    </Link>
                    {/* More actions can be added here */}
                  </Space>
                ),
              },
            ]}
            bordered={true}
            dataSource={data?.data && data.data.length > 0 ? data.data : []}
            key={"user_id"}
            rowKey="user_id"
            scroll={{ x: true }}
            onChange={(pagination) => {
              setFilterValue({
                ...filterValue,
                skip:
                  ((pagination.current || 1) - 1) * (pagination.pageSize || 20),
                limit: pagination.pageSize!,
                // skip: ((pagination.current || 1) - 1) * 50,
                // limit: 50,
              });
            }}
            pagination={{
              size: "default",
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
              defaultPageSize: 20,
              total: data?.total,
              showTotal: (total) => `Total ${total} `,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
