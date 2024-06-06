/*
Accountlist
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumb, Button, Col, Row, Space, Table, Tag, Tooltip } from "antd";
import Search from "antd/es/input/Search";
import type { ColumnsType } from "antd/es/table";
import { useGetAccountListQuery } from "../api/AccountEndPoint";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { FaEdit } from "react-icons/fa";
import UpdateSingleAccount from "../components/UpdateSingleAccount";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../../app/api/userApi/userApi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import TransBalanceModal from "../components/TransBalanceModal";

const Accountlist = () => {
  const { data: user } = useGetMeQuery();
  const userId = user?.data?.id;

  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 20,
    admin_id: userId,
  });
  const [updateData, setUpdateData] = useState({});
  const [accountData, setAccountData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferIsModalOpen] = useState(false);

  const { data } = useGetAccountListQuery(filter);

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Account Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Account Type",
      dataIndex: "ac_type",
      key: "ac_type",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Account Number",
      dataIndex: "account_number",
      key: "account_number",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Available Balance",
      dataIndex: "available_balance",
      key: "available_balance",
      align: "center",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Transfer Balance",
      key: "transfer_balance",
      align: "center",
      render: (record: any) => (
        <Space size="middle">
          <Tooltip title="Transfer Balance">
            <Button
              disabled={record?.status === 1 ? false : true}
              icon={<FaMoneyBillTransfer size="20" color="#01adad" />}
              style={{
                width: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleTransferBalance(record)}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (text) => <span>{dayjs(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text) => (
        <Tag color={text === 1 ? "green" : "red"}>
          {text === 1 ? "Active" : "Deactive"}
        </Tag>
      ),
    },
  ];

  const handleUpdateAccount = (data: any) => {
    setUpdateData(data);
    setIsModalOpen(true);
  };
  const handleTransferBalance = (data: any) => {
    setAccountData(data);
    setTransferIsModalOpen(true);
  };

  return (
    <>
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
                <span>Account</span>
              </>
            ),
          },
          {
            href: "",
            title: (
              <span className="text-[#1B9FA2] font-semibold">Account List</span>
            ),
          },
        ]}
      />

      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="mb-4">
            <Row align={"middle"} justify={"space-between"} gutter={[8, 16]}>
              <Link to="/account/create-account">
                <Button
                  icon={<PlusOutlined />}
                  style={{
                    backgroundColor: "#01adad",
                    color: "white",
                    borderRadius: "50px",
                    width: "200px",
                  }}
                >
                  Add Account
                </Button>
              </Link>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Search
                  placeholder="Search by Account Name"
                  style={{ width: "95%" }}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      key: e.target.value ? e.target.value : "",
                    })
                  }
                />
              </Col>
            </Row>
          </div>

          <Table
            bordered={true}
            size="small"
            columns={[
              ...columns,

              {
                title: "Update Account",
                key: "action",
                align: "center",
                render: (record: any) => (
                  <Space size="middle">
                    <Tooltip title="Update Account">
                      <Button
                        icon={<FaEdit size="18" color="#01adad" />}
                        style={{
                          width: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => handleUpdateAccount(record)}
                      ></Button>
                    </Tooltip>
                  </Space>
                ),
              },
            ]}
            dataSource={data?.data as any}
            key={"id"}
            rowKey="id"
            scroll={{ x: true }}
            onChange={(pagination) => {
              setFilter({
                ...filter,
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
            }}
          />
        </Col>
      </Row>

      <UpdateSingleAccount
        updateData={updateData}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <TransBalanceModal
        accountData={accountData}
        setIsModalOpen={setTransferIsModalOpen}
        isModalOpen={isTransferModalOpen}
      />
    </>
  );
};

export default Accountlist;
