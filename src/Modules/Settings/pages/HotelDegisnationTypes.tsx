import {
  Breadcrumb,
  Button,
  Col,
  Modal,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import Search from "antd/es/input/Search";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";

import { useGetDegisnationTypelistQuery } from "../api/DegisnationEndPoints";
import UpdateDegisnationTypes from "../components/UpdateDegisnationTypes";
import CreateDegisnationTypes from "../components/CreateDegisnationTypes";
import { CommonAllSettings } from "../../../common/style/Style";
const HotelDegisnationTypes = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 30,
  });
  const [updateData, setUpdateData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [deleteDesignationTypes, { isSuccess }] =
  //   useDeleteDegisnationTypeMutation();
  const { isLoading, data: degisnationTypeData } =
    useGetDegisnationTypelistQuery({
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

  // const deleteBedDataData = async (id: string) => {
  //   try {
  //     const response = await deleteDesignationTypes({
  //       id: Number(id),
  //     });
  //     if (isSuccess) {
  //       console.log("Update successful", response);
  //     }
  //   } catch (error) {
  //     // Handle error
  //     console.error("Update failed", error);
  //   }
  // };
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
                  Designation Types
                </span>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title={
          <Typography.Title level={5}>Add Designation Types</Typography.Title>
        }
        open={modalOpen}
        onCancel={cardhandleCancel}
        footer={false}
      >
        <CreateDegisnationTypes cardhandleCancel={cardhandleCancel} />
      </Modal>
      <div className="flex justify-center ">
        <div className="w-[300px] md:w-[768px] lg:w-[1000px]">
          <Typography.Title style={CommonAllSettings as any}>
            Designation Types
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
              Add Designation Types
            </Button>
            <Col xs={24} sm={12} md={24} lg={12} xl={12} xxl={12}>
              <Search
                placeholder="Search by Designation Types"
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

          <div>
            <Table
              size="small"
              bordered={true}
              rowKey={"id"}
              columns={[
                // ...ExpenseHeadColumn,
                {
                  title: "Designation Types",
                  dataIndex: "designation_name",
                  key: "designation_name",
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",

                  render: (status) => (
                    <Tag color={status === 1 ? "green" : "red"}>
                      {status === 1 ? "Available" : "Unavailable"}
                    </Tag>
                  ),
                },
                {
                  title: "Action",
                  key: "action",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  render: (record: any) => (
                    <>
                      {record?.hotel_id ? (
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
                          {/* <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                          deleteBedDataData(record.id);
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
                      </Popconfirm> */}
                          {/* More actions can be added here */}
                        </div>
                      ) : (
                        <Tag>Default</Tag>
                      )}
                    </>
                  ),
                },
              ]}
              dataSource={
                degisnationTypeData?.data &&
                degisnationTypeData?.data?.length > 0
                  ? degisnationTypeData?.data
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
                    (pagination.pageSize || 30),
                  limit: pagination.pageSize!,
                });
              }}
              pagination={{
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30", "50", "100"],
                defaultPageSize: 30,
                // current: filter.skip + 1,
                total: degisnationTypeData?.total,
                showTotal: (total) => `Total ${total} `,
              }}
            />
          </div>

          <UpdateDegisnationTypes
            updateData={updateData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>
    </>
  );
};

export default HotelDegisnationTypes;
