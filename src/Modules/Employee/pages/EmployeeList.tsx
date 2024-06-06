/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import Search from "antd/es/input/Search";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";
import { useGetEmployeeQuery } from "../api/EmployeeEndPoint";
import { EmployeeColumn } from "../types/EmployeeColumn";
import CreateEmployee from "../components/CreateEmployee";
import { Link } from "react-router-dom";
import { CommonAllFormItemSettings } from "../../../common/style/Style";

import { FaEye } from "react-icons/fa6";

const EmployeeList = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 30,
  });
  console.log("filter", filter);
  const [modalOpen, setModalOpen] = useState(false);

  // const [deleteEmployee, { isSuccess }] = useDeleteEmployeeMutation();
  const { isLoading, data: employee } = useGetEmployeeQuery({
    ...filter,
  });

  const cardshowModal = () => {
    setModalOpen(true);
  };

  const cardhandleCancel = () => {
    setModalOpen(false);
  };

  // const deleteEmployeeData = async (id: string) => {
  //   try {
  //     const response = await deleteEmployee({
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
                <span className="text-[#20a09e] font-semibold">Employee</span>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title={
          <Typography.Title level={5}>
            Add Employee Information
          </Typography.Title>
        }
        open={modalOpen}
        onCancel={cardhandleCancel}
        footer={false}
        width={1200}
      >
        <CreateEmployee cardhandleCancel={cardhandleCancel} />
      </Modal>
      <Row justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={20}>
          <Typography.Title style={{ ...(CommonAllFormItemSettings as any) }}>
            Employee
          </Typography.Title>

          <Row
            gutter={[12, 16]}
            justify="space-between"
            style={{ marginBottom: "10px" }}
            align={"middle"}
          >
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={6}>
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
                onClick={cardshowModal}
              >
                Add Employee
              </Button>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form layout="vertical">
                <Row gutter={[7, 6]}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Search By Category">
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select Category"
                        onChange={(value: any) =>
                          setFilter({
                            ...filter,
                            category: value,
                          })
                        }
                        defaultValue={""}
                        options={[
                          {
                            value: "",
                            label: "All",
                          },
                          {
                            value: "restaurant",
                            label: "Restaurant",
                          },
                          {
                            value: "hotel",
                            label: "Hotel",
                          },
                          {
                            value: "management",
                            label: "Management",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Search By Category">
                      <Search
                        placeholder="Search by Employee Name & E-mail"
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            key: e.target.value,
                          })
                        }
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <Table
            size="small"
            bordered={true}
            rowKey={"id"}
            columns={[
              ...EmployeeColumn,

              {
                title: "Action",
                key: "action",
                dataIndex: "id",

                render: (record: any) => (
                  <Row gutter={[5, 5]}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                      <Tooltip title="View">
                        <Link to={`/setting/emplyee-profile/${record}`}>
                          <Button
                            size="small"
                            icon={<FaEye color="white" size="15" />}
                            style={{
                              backgroundColor: "#01adad",
                              color: "white",

                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                        </Link>
                      </Tooltip>
                    </Col>
                    {/* 
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                          deleteEmployeeData(record);
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Tooltip title="Delete">
                          <Button
                            size="small"
                            icon={<MdOutlineDelete color="white" size="20" />}
                            style={{
                              backgroundColor: "Red",
                              color: "white",

                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                        </Tooltip>
                      </Popconfirm>
                    </Col> */}
                  </Row>
                ),
              },
            ]}
            dataSource={
              employee?.data && employee?.data?.length > 0 ? employee?.data : []
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
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "50", "100"],
              defaultPageSize: 30,
              // current: filter.skip + 1,
              total: employee?.total,
              showTotal: (total) => `Total ${total} `,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default EmployeeList;
