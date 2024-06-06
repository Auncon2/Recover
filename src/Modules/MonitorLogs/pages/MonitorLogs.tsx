import { Card, Col, Row, Select, Table, Typography } from "antd";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { IViewMonitorLogs } from "../types/MonitorLogs";
import { useGetMonitorLogsQuery } from "../api/MonitorLogsEndPoint";

const projectListColumns: ColumnsType<IViewMonitorLogs> = [
  {
    title: "Project Id",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Loading Time",
    dataIndex: "loading_time",
    key: "loading_time",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Page Name",
    dataIndex: "page_name",
    key: "page_name",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Procedure Execution Time",
    dataIndex: "procedure_execution_time",
    key: "procedure_execution_time",
    render: (text) => <a>{text.toFixed(4)}</a>,
  },
];

const MonitorLogs = () => {
  const [filterValue, setFilterValue] = useState("all");
  const { data } = useGetMonitorLogsQuery({ data: filterValue });
  console.log("object", data);

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography.Title level={5}>Developer List</Typography.Title>
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <Row align={"middle"} justify={"space-between"} gutter={[5, 16]}>
              {/* <Col xs={24} sm={12} md={12} lg={6}>
                      <Search
                        placeholder="Search by Company"
                        style={{ width: "100%" }}
                      />
                    </Col> */}
              <Col xs={24} sm={12} md={12} lg={2}>
                <Select
                  defaultValue="all"
                  style={{ width: "100%" }}
                  onChange={handleFilterChange}
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="property_list">
                    Property List
                  </Select.Option>
                  <Select.Option value="property_details">
                    Property Details
                  </Select.Option>
                  <Select.Option value="project_list">
                    Project List
                  </Select.Option>
                  <Select.Option value="project_details">
                    Project Details
                  </Select.Option>
                  <Select.Option value="login">Log In</Select.Option>
                  <Select.Option value="register">Register</Select.Option>
                  <Select.Option value="profile">Profile</Select.Option>
                </Select>
              </Col>
            </Row>
          </Card>

          {/* <TransactionForm /> */}
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <div>
              <Table
                columns={[
                  ...projectListColumns,
                  //   {
                  //     title: "View",
                  //     key: "action",
                  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  //     render: (record: any) => (
                  //       <Space size="middle">
                  //         <Link to={`/projectView/${record?.projectid}`}>
                  //           <Tooltip title="View">
                  //             <EditOutlined
                  //               style={{
                  //                 cursor: "pointer",
                  //                 paddingRight: "20px",
                  //               }}
                  //             />
                  //           </Tooltip>
                  //         </Link>

                  //         {/* More actions can be added here */}
                  //       </Space>
                  //     ),
                  //   },
                ]}
                dataSource={data?.data && data.data.length > 0 ? data.data : []}
                // key={data?.data?.id}
                rowKey="monitorLogsId"
                scroll={{ x: true }}
                pagination={{ showSizeChanger: true }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MonitorLogs;
