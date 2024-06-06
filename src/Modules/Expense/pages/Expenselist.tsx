/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Row,
  Space,
  Table,
  Tooltip,
  theme,
} from "antd";
import { ExpenseColumn } from "../utils/ExpenseColoumn";
import { useGetExpenselistQuery } from "../api/ExpenseEndPoint";
import Search from "antd/es/input/Search";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";

import { RiAddFill } from "react-icons/ri";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";

const Expenselist = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 20,
  });
  const { isLoading, data: expenseData } = useGetExpenselistQuery({
    // ...filterValue,
    ...filter,
  });

  return (
    <>
      {/* <Card
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
        >
          {" "}
          <Typography.Title level={5}>Expense List</Typography.Title>
        </Card> */}

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
            href: "",
            title: (
              <>
                {/* <UserOutlined /> */}
                <span>Expense</span>
              </>
            ),
          },

          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">
                  Expense History
                </span>
              </div>
            ),
          },
        ]}
      />

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
        <Row align={"middle"} justify={"space-between"} gutter={[6, 15]}>
          <Col xs={24} sm={12} md={12} lg={3}>
            <Link to={`/expense/create-expense`}>
              <Button
                icon={<RiAddFill color="white" size="20" />}
                style={{
                  backgroundColor: "#01adad",
                  color: "white",
                  borderRadius: "50px",
                  width: "180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Add Expense
              </Button>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={12} lg={7}>
            <Search
              placeholder="Search by Expense Name / Account Name"
              style={{ width: "100%" }}
              // onChange={(e) => setFilterValue({ key: e.target.value })}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  key: e.target.value ? e.target.value : "",
                })
              }
            />
          </Col>
        </Row>
      </Card>

      <Table
        size="small"
        bordered={true}
        rowKey={"id"}
        columns={[
          ...ExpenseColumn,
          {
            title: "View",
            key: "action",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (record: any) => (
              <Space size="middle">
                <Link to={`/expense/expense-view/${record.id}`}>
                  <Tooltip title="View">
                    <FaEye />
                  </Tooltip>
                </Link>
              </Space>
            ),
          },
        ]}
        dataSource={
          expenseData?.data && expenseData?.data?.length > 0
            ? expenseData?.data
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

          total: expenseData?.total,
          showTotal: (total) => `Total ${total} `,
        }}
      />
    </>
  );
};

export default Expenselist;
