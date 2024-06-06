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

import CreatePayrollMonthAndHour from "../components/CreatePayrollMonthAndHour";
import UpdatePayrollMonthAndDate from "../components/UpdatePayrollMonthAndDate";
import {
  useDeletePayRollMonthAndSalaryTypeMutation,
  useGetPayRollMonthAndSalaryTypelistQuery,
} from "../api/PayRollMonthAndSalaryEndPoints";
import { CommonAllSettings } from "../../../common/style/Style";
const HotelPayrollMonthAndHourSelect = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 30,
  });
  const [updateData, setUpdateData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePayRollMonthAndSalaryTypes, { isSuccess }] =
    useDeletePayRollMonthAndSalaryTypeMutation();
  const { isLoading, data: payrollMonthAndSalaryData } =
    useGetPayRollMonthAndSalaryTypelistQuery({
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
  console.log("updateData", updateData);
  const deleteBedDataData = async (id: string) => {
    try {
      const response = await deletePayRollMonthAndSalaryTypes({
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
                  Payroll Month
                </span>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title={
          <Typography.Title level={5}>
            Add Payroll Month & Hours
          </Typography.Title>
        }
        open={modalOpen}
        onCancel={cardhandleCancel}
        footer={false}
      >
        <CreatePayrollMonthAndHour cardhandleCancel={cardhandleCancel} />
      </Modal>
      <div className="flex justify-center ">
        <div className="w-[300px] md:w-[768px] lg:w-[1000px]">
          <Typography.Title style={CommonAllSettings as any}>
            Payroll Month
          </Typography.Title>
          <div className="flex flex-col lg:flex-row justify-between mb-4 mx-1 gap-5 lg:gap-0">
            <Button
              icon={<IoMdAdd color="white" size="20" />}
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                // width: "210px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={cardshowModal}
            >
              Add Payroll Month and Hour
            </Button>
            <Col xs={24} sm={12} md={24} lg={12} xl={12} xxl={12}>
              <Search
                placeholder="Search by Month Name"
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
                title: "Payroll Month ",
                dataIndex: "month_name",
                key: "month_name",
              },
              {
                title: "Working Days Per Month",
                dataIndex: "working_days",
                key: "working_days",
                render: (working_days) => <>{working_days || 0} Days</>,
              },
              {
                title: "Working Hours Per Month",
                dataIndex: "hours",
                key: "hours",
                render: (hour) => <>{hour || 0} Hours</>,
              },
              {
                title: "Action",
                key: "action",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                render: (record: any) => (
                  <div className="flex items-center gap-2">
                    <Tooltip title="Edit">
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
                        onClick={() => handleUpdateBed(record)}
                      >
                        Edit
                      </Button>
                    </Tooltip>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => {
                        deleteBedDataData(record.id);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      {/* <DeleteOutlined
                              style={{
                                cursor: "pointer",
                                paddingRight: "20px",
                              }}
                            /> */}
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
              payrollMonthAndSalaryData?.data &&
              payrollMonthAndSalaryData?.data?.length > 0
                ? payrollMonthAndSalaryData?.data
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
                  ((pagination.current || 1) - 1) * (pagination.pageSize || 30),
                limit: pagination.pageSize!,
              });
            }}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "50", "100"],
              defaultPageSize: 30,
              // current: filter.skip + 1,
              total: payrollMonthAndSalaryData?.total,
              showTotal: (total) => `Total ${total} `,
            }}
          />

          <UpdatePayrollMonthAndDate
            updateData={updateData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>
    </>
  );
};

export default HotelPayrollMonthAndHourSelect;
