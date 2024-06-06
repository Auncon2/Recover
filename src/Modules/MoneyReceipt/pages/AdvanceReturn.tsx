import { Breadcrumb, Button, Col, DatePicker, Form, Row, Table } from "antd";

import { useState } from "react";

import Search from "antd/es/input/Search";

import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";

import { IoMdAdd } from "react-icons/io";

import { useGetAdvanceReturnListQuery } from "../api/MoneyReceiptEndPoints";
import { AdvanceReturnColumn } from "../utils/MoneyReceiptColumn";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FaEye } from "react-icons/fa6";
import { Tooltip } from "antd/lib";

const { RangePicker } = DatePicker;

const AdvanceReturn = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 20,
  });

  const { isLoading, data: expenseHeadData } = useGetAdvanceReturnListQuery({
    ...filter,
  });

  return (
    <>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: "40px", marginTop: "20px" }}
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
            href: "/money-receipt/invoice-money-receipt",
            title: (
              <div className="flex items-center gap-1">
                {/* <UserOutlined /> */}

                <span>Money Receipt</span>
              </div>
            ),
          },
          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">
                  Advance Return
                </span>
              </div>
            ),
          },
        ]}
      />
      <Form layout="vertical" style={{ width: "100%" }}>
        <Row gutter={[12, 16]} justify={"space-between"} align={"middle"}>
          <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={4}>
            <Link to="/money-receipt/advance-return-add">
              <Button
                icon={<IoMdAdd color="white" size="20" />}
                style={{
                  backgroundColor: "#01adad",
                  color: "white",
                  borderRadius: "50px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Add Advance Return
              </Button>
            </Link>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={12}>
            <Row gutter={[7, 6]} justify={"end"}>
              <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                <Form.Item
                  label="Search by Guest Name "
                  style={{ width: "100%" }}
                >
                  <Search
                    placeholder="Search by Guest Name"
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        key: e.target.value ? e.target.value : "",
                      })
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                <Form.Item label="Search by Date" style={{ width: "100%" }}>
                  <RangePicker
                    onChange={(value: any) =>
                      setFilter({
                        ...filter,
                        from_date:
                          (value && dayjs(value[0]).format("YYYY-MM-DD")) || "",
                        to_date:
                          (value && dayjs(value[1]).format("YYYY-MM-DD")) || "",
                      })
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <Table
        size="small"
        bordered={true}
        rowKey={"id"}
        columns={[
          {
            title: "SL",
            dataIndex: "0",
            key: "0",
            render: (_text, _record, index) => (
              <span>{index + 1 + filter.skip}</span>
            ),
          },
          ...AdvanceReturnColumn,

          {
            title: "Action",
            key: "action",

            render: (record: any) => (
              <Link to={`/money-receipt/view-advance-return/${record?.id}`}>
                <Col xs={24} sm={20} md={16} lg={12} xl={10} xxl={8}>
                  <Tooltip title="View">
                    <Button
                      size="small"
                      icon={<FaEye size={15} />}
                      style={{
                        backgroundColor: "#01adad",
                        color: "white",

                        width: "100%",
                      }}
                    />
                  </Tooltip>
                </Col>
              </Link>
            ),
          },
        ]}
        dataSource={
          expenseHeadData?.data && expenseHeadData?.data?.length > 0
            ? expenseHeadData?.data
            : []
        }
        scroll={{ x: true }}
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
          total: expenseHeadData?.total,
          showTotal: (total) => `Total ${total} `,
        }}
      />
    </>
  );
};

export default AdvanceReturn;
