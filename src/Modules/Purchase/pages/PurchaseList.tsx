import React from "react";
import { PurchaseType } from "../types/purchaseTypes";
import { Breadcrumb, Button, Col, Input, Row, Table, TableProps } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PurchaseList: React.FC = (): JSX.Element => {
  const columns: TableProps<PurchaseType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Supplier Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Invoice No.",
      dataIndex: "ac_type",
      key: "ac_type",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Date",
      dataIndex: "ac_type",
      key: "ac_type",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Pay Amount",
      dataIndex: "ac_type",
      key: "ac_type",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Discount",
      dataIndex: "ac_type",
      key: "ac_type",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Paid Amount",
      dataIndex: "ac_type",
      key: "ac_type",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Due Amount",
      dataIndex: "ac_type",
      key: "ac_type",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
  ];

  return (
    <React.Fragment>
      <Breadcrumb
        className="mt-5 mb-[40px]"
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
                <span>Purchase</span>
              </>
            ),
          },
          {
            href: "",
            title: (
              <span className="text-[#1B9FA2] font-semibold">
                Purchase List
              </span>
            ),
          },
        ]}
      />

      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="mb-4">
            <Row align={"middle"} justify={"space-between"} gutter={[8, 16]}>
              <Link to="/purchase/create-purchase/">
                <Button
                  icon={<PlusOutlined />}
                  style={{
                    backgroundColor: "#01adad",
                    color: "white",
                    borderRadius: "50px",
                    width: "200px",
                  }}
                >
                  Add Purchase
                </Button>
              </Link>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Input.Search
                  placeholder="Search by Purchase Name"
                  style={{ width: "95%" }}
                  onChange={(e) => {
                    console.log(e);

                    // setFilter({
                    //   ...filter,
                    //   key: e.target.value ? e.target.value : "",
                    // });
                  }}
                />
              </Col>
            </Row>
          </div>

          <Table
            bordered={true}
            size="small"
            columns={columns}
            // dataSource={data?.data as any}
            key={"id"}
            rowKey="id"
            scroll={{ x: true }}
            onChange={(pagination) => {
              console.log(pagination);

              // setFilter({
              //   ...filter,
              //   skip:
              //     ((pagination.current || 1) - 1) * (pagination.pageSize || 20),
              //   limit: pagination.pageSize!,
              // });
            }}
            pagination={{
              size: "default",
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "50", "100"],
              defaultPageSize: 20,
            }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PurchaseList;
