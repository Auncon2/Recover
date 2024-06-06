/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Table,
  Typography,
} from "antd";
import { useState } from "react";

import { auditTrailColumn } from "../utils/AudiTrailColoumn";
import dayjs from "dayjs";

import { FilterOutlined } from "@ant-design/icons";
import { useGetAuditTrailsQuery } from "../../AduitTrails/api/AduitTrailsEndPoints";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";

const { RangePicker } = DatePicker;

const AudiTrailList = () => {
  const [filter, setFilter] = useState<any>({
    limit: 10,
    skip: 0,
  });
  // const { Option } = Select;

  const { isLoading, data: adminData } = useGetAuditTrailsQuery({ ...filter });
  const onFinish = (values: any) => {
    const name = values["name"];
    const status = values["status"];
    const date = values["date"];

    // Create a base filter object
    const newFilter: any = {
      limit: 10,
      skip: 0,
    };

    // Check if title is not empty, and add it to the filter
    if (name) {
      newFilter.name = name;
    }
    // Check if status is not empty, and add it to the filter
    if (status) {
      newFilter.status = status;
    }

    // Check if date range is selected, and add it to the filter
    if (date && date.length === 2) {
      newFilter.from_date = dayjs(date[0]).format("YYYY-MM-DD");
      newFilter.to_date = dayjs(date[1]).format("YYYY-MM-DD");
    }

    // Update the filter state
    setFilter(newFilter);
  };
  return (
    <>
      <div>
        <Row align={"middle"} justify={"space-between"}>
          <Typography.Title level={5}>Audit Trail List</Typography.Title>
        </Row>
        <Card
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
        >
          <Form onFinish={onFinish}>
            <Row
              align={"middle"}
              style={{ alignItems: "center" }}
              gutter={[5, 5]}
            >
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item name="name">
                  <Input
                    placeholder="Search Admin Name"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item name="date">
                  <RangePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                {/* <Form.Item name='status'>
                  <Select placeholder='Select Status'>
                    <Option value='active'>Active</Option>
                    <Option value='pending'>Pending</Option>
                  </Select>
                </Form.Item> */}
              </Col>
              <Col xs={24} sm={12} md={10} lg={10} xl={6}>
                <Form.Item name="name" style={{ textAlign: "end" }}>
                  <SubmitButton icon={<FilterOutlined />} label="Filter" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
        >
          <div>
            <Table
              rowKey={"id"}
              columns={auditTrailColumn}
              dataSource={
                adminData?.data && adminData?.data?.length > 0
                  ? adminData?.data
                  : []
              }
              scroll={{ x: true }}
              loading={isLoading}
              onChange={(pagination) => {
                setFilter({
                  ...filter,
                  skip:
                    ((pagination.current || 1) - 1) *
                    (pagination.pageSize || 10),
                  limit: pagination.pageSize!,
                });
              }}
              pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                pageSizeOptions: ["10", "20", "30", "50", "100"],
                total: adminData?.total,
                showTotal: (total) => `Total ${total} `,
              }}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default AudiTrailList;
