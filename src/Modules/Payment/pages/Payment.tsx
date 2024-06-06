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
import { useState } from "react";
import Search from "antd/es/input/Search";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";
import {
  useDeletePaymentListMutation,
  useGetPaymentlistQuery,
} from "../api/PaymentMethodEndPoint";
import CreatePayment from "./CreatePayment";
import PaymentMethodUpdateModal from "./UpdatePayment";

const Payment = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 10,
  });
  const [updateData, setUpdateData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePayment, { isSuccess }] = useDeletePaymentListMutation();
  const { isLoading, data: paymentMethod } = useGetPaymentlistQuery({
    ...filter,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const cardshowModal = () => {
    setModalOpen(true);
  };

  const cardhandleCancel = () => {
    setModalOpen(false);
  };

  const handleUpdateBed = (data: any) => {
    setUpdateData(data);
    setIsModalOpen(true);
  };

  const deletePaymentData = async (id: string) => {
    try {
      const response = await deletePayment({
        id: Number(id),
      });
      if (isSuccess) {
        console.log("Update successful", response);
      }
    } catch (error) {
      // Handle error
      console.error("Update failed", error);
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

                <span>Settings</span>
              </div>
            ),
          },
          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">
                  Payment Method
                </span>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title={
          <Typography.Title level={5}>Add Payment Method</Typography.Title>
        }
        open={modalOpen}
        onCancel={cardhandleCancel}
        footer={false}
      >
        <CreatePayment cardhandleCancel={cardhandleCancel} />
      </Modal>
      <div className="flex justify-center ">
        <div className="w-[1000px]">
          <div className="flex flex-col lg:flex-row justify-between mb-4 mx-3">
            <Typography.Title style={{ fontSize: "20px" }}>
              Payment Method
            </Typography.Title>
            {/* <Link to="/expense/create-expense"> */}
            <Button
              icon={<IoMdAdd color="white" size="20" />}
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                width: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={cardshowModal}
            >
              Add Payment Method
            </Button>
          </div>

          <div>
            <Table
              bordered={true}
              rowKey={"id"}
              columns={[
                // ...ExpenseHeadColumn,
                {
                  title: (
                    <div className="flex justify-between items-center">
                      <span>Payment Method</span>
                      <Col xs={24} sm={12} md={12} lg={12}>
                        <Search
                          placeholder="Search by Payment Method"
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
                  ),
                  dataIndex: "payment_method",
                  key: "payment_method",
                },
                {
                  title: "Action",
                  key: "action",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  render: (record: any) => (
                    <div className="flex items-center gap-2">
                      <Tooltip title="Edit">
                        <Button
                          size="small"
                          // icon={<EditOutlined />}
                          style={{
                            backgroundColor: "#01adad",
                            color: "white",
                            borderRadius: "50px",
                            width: "50px",
                          }}
                          onClick={() => handleUpdateBed(record)}
                        >
                          Edit
                        </Button>
                      </Tooltip>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                          deletePaymentData(record.id);
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
                paymentMethod?.data && paymentMethod?.data?.length > 0
                  ? paymentMethod?.data
                  : []
              }
              scroll={{ x: true }}
              loading={isLoading}
              //   pagination={{
              //     showSizeChanger: true,
              //     defaultPageSize: 10,
              //     pageSizeOptions: ["10", "20", "30", "50", "100"],
              //   }}
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
                pageSizeOptions: ["10", "20", "30", "50", "100"],

                // current: filter.skip + 1,
                total: paymentMethod?.total,
                showTotal: (total) => `Total ${total} `,
              }}
            />
          </div>

          <PaymentMethodUpdateModal
            updateData={updateData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>
    </>
  );
};

export default Payment;
