/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumb,
  Button,
  Col,
  Modal,
  Popconfirm,
  Table,
  Tooltip,
  Typography,
} from "antd";
// import { ExpenseHeadColumn } from "../utils/ExpenseColoumn";
import {
  useDeleteExpenseMutation,
  useGetExpenseHeadlistQuery,
} from "../api/ExpenseEndPoint";

import { useState } from "react";
import ExpenseUpdateModal from "../components/ExpenseUpdateModal";
import Search from "antd/es/input/Search";

import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import CreateExpenseHead from "../components/CreateExpenseHead";

import { IoMdAdd } from "react-icons/io";
import { CommonAllSettings } from "../../../common/style/Style";

const ExpenseHeadlist = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 30,
  });
  const [updateData, setUpdateData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteHead, { isSuccess }] = useDeleteExpenseMutation();
  const { isLoading, data: expenseHeadData } = useGetExpenseHeadlistQuery({
    ...filter,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const cardshowModal = () => {
    setModalOpen(true);
  };

  const cardhandleCancel = () => {
    setModalOpen(false);
  };

  const handleUpdateExpense = (data: any) => {
    setUpdateData(data);
    setIsModalOpen(true);
  };

  const deleteExpenseData = async (id: string) => {
    try {
      const response = await deleteHead({
        id: Number(id),
      });
      if (isSuccess) {
        console.log("Update successful", response);
      }
    } catch (error) {
      // Handle error
      // console.error("Update failed", error);
    }
  };

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
            href: "",
            title: (
              <div className="flex items-center gap-1">
                {/* <UserOutlined /> */}

                <span>Expense</span>
              </div>
            ),
          },
          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">
                  Expense Head
                </span>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title={<Typography.Title level={5}>Add Expense Head</Typography.Title>}
        open={modalOpen}
        onCancel={cardhandleCancel}
        footer={false}
      >
        <CreateExpenseHead cardhandleCancel={cardhandleCancel} />
      </Modal>
      <div className="flex justify-center">
        <div className="w-[300px] md:w-[768px] lg:w-[1000px]">
          <Typography.Title style={CommonAllSettings as any}>
            Expense Head
          </Typography.Title>
          <div className="flex flex-col lg:flex-row justify-between mb-4 mx-1 gap-5 lg:gap-0">
            <Button
              icon={<IoMdAdd color="white" size="20" />}
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={cardshowModal}
            >
              Add Expense Head
            </Button>
            <Col xs={24} sm={12} md={24} lg={12} xl={12} xxl={12}>
              <Search
                placeholder="Search by Expense Head"
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    name: e.target.value ? e.target.value : "",
                  })
                }
                style={{ width: "100%" }}
              />
            </Col>
          </div>

          <Table
            size="small"
            bordered={true}
            rowKey={"id"}
            columns={[
              // ...ExpenseHeadColumn,
              {
                title: (
                  <div className="flex justify-between items-center">
                    <span>Expense Head</span>
                  </div>
                ),
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Action",
                key: "action",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                render: (record: any) => (
                  <div className="flex items-center gap-2">
                    <Tooltip title="View">
                      {/* <EditOutlined
                          onClick={() => handleUpdateExpense(record)}
                          style={{
                            cursor: "pointer",
                            paddingRight: "20px",
                          }}
                        /> */}
                      <Button
                        size="small"
                        // icon={<EditOutlined />}
                        style={{
                          backgroundColor: "#01adad",
                          color: "white",
                          borderRadius: "50px",
                          width: "50px",
                        }}
                        onClick={() => handleUpdateExpense(record)}
                      >
                        Edit
                      </Button>
                    </Tooltip>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => {
                        deleteExpenseData(record.id);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        size="small"
                        style={{
                          backgroundColor: "#ff4d4d",
                          color: "white",
                          borderRadius: "50px",
                          width: "70px",
                          borderColor: "#ff4d4d",
                        }}
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                    {/* More actions can be added here */}
                  </div>
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
                skip:
                  ((pagination.current || 1) - 1) * (pagination.pageSize || 30),
                limit: pagination.pageSize!,
              });
            }}
            pagination={{
              size: "default",
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "50", "100"],
              defaultPageSize: 30,
              total: expenseHeadData?.total,
              showTotal: (total) => `Total ${total} `,
            }}
          />

          <ExpenseUpdateModal
            updateData={updateData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>
    </>
  );
};

export default ExpenseHeadlist;
