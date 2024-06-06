import { Card, Col, Row, Select, Table, Typography } from "antd";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { IViewAuditTrails } from "../types/AduitTrails";
import { useGetAuditTrailsQuery } from "../api/AduitTrailsEndPoints";

const aduitTrailsColumns: ColumnsType<IViewAuditTrails> = [
  {
    title: "User Id",
    dataIndex: "user_id",
    key: "user_id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Times Tamp",
    dataIndex: "Times Tamp",
    key: "Times Tamp",
    render: (text) => <a>{new Date(text).toLocaleString()}</a>,
  },

  {
    title: "Details",
    dataIndex: "details",
    key: "details",
    render: (text) => <a>{text.details1}</a>,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text) => <a>{text}</a>,
  },
];

const AuditTrail = () => {
  const [filterValue, setFilterValue] = useState("all");
  const { data } = useGetAuditTrailsQuery({ data: filterValue });
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
                columns={[...aduitTrailsColumns]}
                dataSource={data?.data && data.data.length > 0 ? data.data : []}
                // key={data?.data?.id}
                rowKey="AduitTrailsId"
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

export default AuditTrail;
