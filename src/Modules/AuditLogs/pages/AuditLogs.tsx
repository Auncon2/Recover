import { Card, Col, Row, Select, Table, Typography } from "antd";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { IViewAuditLogs } from "../types/AuditLogs";
import { useGetAuditLogsQuery } from "../api/AuditLogsEndPoints";

const projectListColumns: ColumnsType<IViewAuditLogs> = [
  {
    title: "Project Id",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Query",
    dataIndex: "query",
    key: "query",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Event Time",
    dataIndex: "event_time",
    key: "event_time",
    render: (text) => <a>{new Date(text).toLocaleString()}</a>,
  },

  {
    title: "Table Name",
    dataIndex: "table_name",
    key: "table_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text) => <a>{text}</a>,
  },
];

const AuditLogs = () => {
  const [filterValue, setFilterValue] = useState("all");
  const { data } = useGetAuditLogsQuery({ data: filterValue });
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
                  <Select.Option value="INSERT">Insert</Select.Option>
                  <Select.Option value="DELETE">Delete</Select.Option>
                  <Select.Option value="UPDATE">Update</Select.Option>
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
                rowKey="auditLogsId"
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

export default AuditLogs;
