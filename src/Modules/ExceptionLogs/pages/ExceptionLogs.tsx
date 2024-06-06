import { Card, Col, Row, Select, Table, Typography } from "antd";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { IViewExceptionLogs } from "../types/ExceptionLogs";
import {
  useGetExceptionLogsFilterQuery,
  useGetExceptionLogsQuery,
} from "../api/ExceptionLogsEndPoint";

const exceptionColumns: ColumnsType<IViewExceptionLogs> = [
  {
    title: "Line Number",
    dataIndex: "line_number",
    key: "line_number",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => <a>{new Date(text).toLocaleString()}</a>,
  },
  {
    title: "Exception Message",
    dataIndex: "exception_message",
    key: "exception_message",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Exception Type",
    dataIndex: "exception_type",
    key: "exception_type",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Stack Trace",
    dataIndex: "stack_trace",
    key: "stack_trace",
    render: (text) => <a>{text}</a>,
  },
];

const ExceptionLogs = () => {
  const [filterValue, setFilterValue] = useState("all");
  const { data } = useGetExceptionLogsQuery({ data: filterValue });
  const { data: exceptionItem } = useGetExceptionLogsFilterQuery({
    data: filterValue,
  });
  console.log("object", exceptionItem?.data);

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
                  {exceptionItem?.data?.map((ex: any, i: number) => (
                    <Select.Option key={i} value={ex}>
                      {ex}
                    </Select.Option>
                  ))}
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
                columns={[...exceptionColumns]}
                dataSource={data?.data && data.data.length > 0 ? data.data : []}
                // key={data?.data?.id}
                rowKey="expectionLogsId"
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

export default ExceptionLogs;
