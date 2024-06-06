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
  Tooltip,
  theme,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useGetHallListQuery } from "../api/HallEndPoints";
import { MdAdd } from "react-icons/md";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";

const HallList = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [filterValue, setFilterValue] = useState<any>({
    key: "",
    hall_status: "",
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
  const { data } = useGetHallListQuery(valuesWithData);

  //   const [deleteProjectData, { isSuccess }] = useDeleteProjectListMutation();

  const handleFilterChange = (name: string, value: string) => {
    setFilterValue((prevFilterValue: any) => ({
      ...prevFilterValue,
      [name]: value,
    }));
  };

  // const getHistoryStatusColor = (status: string) => {
  //   switch (status) {
  //     case "available":
  //       return "green";
  //     case "booked":
  //       return "orange";
  //     case "maintenance":
  //       return "blue";
  //     default:
  //       return "default-color"; // You can specify a default color if needed
  //   }
  // };

  // const getHistoryStatusText = (status: string) => {
  //   switch (status) {
  //     case "available":
  //       return "Available";
  //     case "booked":
  //       return "Booked";
  //     case "maintenance":
  //       return "Maintenance";
  //     default:
  //       return "Unknown Status";
  //   }
  // };
  const hallListColumns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Hall Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Hall Size",
      dataIndex: "hall_size",
      key: "hall_size",
      render: (text) => <span>{text ? text + " sqft" : "N/A"}</span>,
    },
    {
      title: "Rate Per Hour",
      dataIndex: "rate_per_hour",
      key: "rate_per_hour",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      render: (text) => (
        <span>{text > 0 ? text + " Persons" : text + " Person"}</span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => <span>{text}</span>,
    },
    // {
    //   title: "Hall Status",
    //   dataIndex: "hall_status",
    //   key: "hall_status",
    //   render: (text) => (
    //     <span className="uppercase">
    //       <Tag color={getHistoryStatusColor(text ?? "")}>
    //         {getHistoryStatusText(text ?? "")}
    //       </Tag>
    //     </span>
    //   ),
    // },
  ];

  return (
    <>
      <Breadcrumb
        separator=">"
        className="mt-5 mb-[40px]"
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
                <span>Hall</span>
              </>
            ),
          },
          {
            title: <span className="text-[#119B9D]">Hall List</span>,
          },
        ]}
      />

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
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <Form
                layout="vertical"
                className="flex flex-col md:flex-row justify-start items-center gap-3"
              >
                <Col xs={24} sm={24} md={12} lg={18} xl={24}>
                  <Form.Item
                    label="Search by Hall Name"
                    style={{ width: "100%" }}
                  >
                    <Input
                      onChange={(e) =>
                        handleFilterChange("key", e.target.value)
                      }
                      type="text"
                      placeholder="Search by Hall Name"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={18} xl={24}>
                  <Form.Item
                    // label="Search by status (All, Available, Booked, Maintenance)"
                    label="Search by status"
                    style={{ width: "100%" }}
                  >
                    <Select
                      // defaultValue="all"
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleFilterChange("hall_status", value.toString())
                      }
                      placeholder="Hall Status"
                      defaultValue="All"
                    >
                      <Select.Option value="">All</Select.Option>
                      <Select.Option value="available">Available</Select.Option>
                      <Select.Option value="booked">Booked</Select.Option>
                      <Select.Option value="maintenance">
                        Maintenance
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Form>
              <Link to={`/hall/hall-create`}>
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
                  Add New Hall
                </Button>
              </Link>
            </div>
          </Card>

          <Table
            size="small"
            bordered={true}
            columns={[
              ...hallListColumns,
              {
                title: "View",
                key: "action",
                render: (record: any) => (
                  <Space size="middle">
                    <Link to={`/hall-details/${record?.id}`}>
                      <Tooltip title="View">
                        <FaEye />
                      </Tooltip>
                    </Link>
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
              // showTotal: (total) => `Total ${total} `,
            }}
            dataSource={data?.data}
            key={"hall_id"}
            rowKey="hall_id"
            scroll={{ x: true }}
            // pagination={{ showSizeChanger: true }}
          />
        </Col>
      </Row>
    </>
  );
};

export default HallList;
