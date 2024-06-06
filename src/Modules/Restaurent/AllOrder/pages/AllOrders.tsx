import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Popconfirm,
  Select,
  Table,
  Tooltip,
} from "antd";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {
  useDeleteOrderMutation,
  useGetAllOrderlistQuery,
} from "../api/AllOrderEndPoints";
import { Link } from "react-router-dom";

const { Option } = Select;
const { RangePicker } = DatePicker;
const AllOrders = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 10,
  });
  //   const [updateData, setUpdateData] = useState({});
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteBedTypes, { isSuccess }] = useDeleteOrderMutation();
  const { isLoading, data: ingredientsData } = useGetAllOrderlistQuery({
    ...filter,
  });
  //   const [modalOpen, setModalOpen] = useState(false);

  // const cardshowModal = () => {
  //   setModalOpen(true);
  // };

  //   const cardhandleCancel = () => {
  //     setModalOpen(false);
  //   };

  //   const handleUpdateBed = (data: any) => {
  //     setUpdateData(data);
  //     setIsModalOpen(true);
  //   };

  const deleteIngredients = async (id: string) => {
    try {
      const response = await deleteBedTypes({
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

                <span>Restaurent</span>
              </div>
            ),
          },
          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">
                  All Order List
                </span>
              </div>
            ),
          },
        ]}
      />
      {/* <Modal
        title={<Typography.Title level={5}>Add Ingredients</Typography.Title>}
        open={modalOpen}
        onCancel={cardhandleCancel}
        footer={false}
      >
        <CreateIngredients cardhandleCancel={cardhandleCancel} />
      </Modal> */}

      <div className="flex justify-center ">
        <div className="w-[1500px]">
          <Card style={{ marginBottom: "15px" }}>
            <div className="flex flex-col lg:flex-row items-center gap-5">
              <Col xs={24} sm={12} md={12} lg={4}>
                <label className="font-semibold"> Order Name</label>
                <Search
                  placeholder="Search by Order Name "
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      name: e.target.value ? e.target.value : "",
                    })
                  }
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </Col>

              {/* customer type */}
              <Col xs={24} sm={12} md={12} lg={3}>
                <label className="font-semibold">Customer Type</label>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%", marginTop: "5px" }}
                  placeholder="Select Customer Type"
                >
                  <Option value="dine_in">Dine In</Option>
                  <Option value="take_out">Take Out</Option>
                  <Option value="delivery">Delivery</Option>
                </Select>
              </Col>

              {/* customer stuff */}
              <Col xs={24} sm={12} md={12} lg={3}>
                <label className="font-semibold"> Staff Name</label>
                <Select
                  allowClear
                  showSearch
                  style={{ width: "100%", marginTop: "5px" }}
                  placeholder="Select Staff Name"
                >
                  <Option value="dine_in">Auncon</Option>
                  <Option value="take_out">Iquball</Option>
                  <Option value="delivery">Jubayer</Option>
                </Select>
              </Col>

              {/* Table Name */}

              <Col xs={24} sm={12} md={12} lg={3}>
                <label className="font-semibold">Table Name</label>
                <Select
                  style={{ width: "100%", marginTop: "5px" }}
                  placeholder="Select Table Name"
                >
                  <Option value="dine_in">Table 1</Option>
                  <Option value="take_out">Table 2</Option>
                  <Option value="delivery">Table 3</Option>
                </Select>
              </Col>

              {/* Table Name */}

              <Col xs={24} sm={12} md={12} lg={3}>
                <label className="font-semibold">Kitchen Status</label>
                <Select
                  style={{ width: "100%", marginTop: "5px" }}
                  placeholder="Select Kitchen Status"
                >
                  <Option value="completed">Completed</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Col>

              <Col xs={24} sm={12} md={12} lg={4}>
                <label className="font-semibold"> Date</label>
                <RangePicker style={{ width: "100%", marginTop: "5px" }} />
              </Col>

              {/* <Button
                icon={<IoMdAdd color="white" size="20" />}
                style={{
                  marginTop: "25px",
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
                Add Ingredients
              </Button> */}
              {/* </Link> */}
            </div>
          </Card>
          {/* </Card> */}

          <div>
            <Table
              bordered={true}
              rowKey={"id"}
              columns={[
                // ...ExpenseHeadColumn,
                {
                  title: "ID",
                  dataIndex: "id",
                  key: "id",
                  render: (id) => <>{id} </>,
                },
                {
                  title: "Order Date",
                  dataIndex: "order_date",
                  key: "order_date",
                  render: (data) => <>{data || "N/A"} </>,
                },
                {
                  title: "Table Name",
                  dataIndex: "order_date",
                  key: "order_date",
                  render: (data) => <>{data || "N/A"} </>,
                },
                {
                  title: "Staff Name",
                  dataIndex: "order_date",
                  key: "order_date",
                  render: (data) => <>{data || "N/A"} </>,
                },
                {
                  title: "Total Sales",
                  dataIndex: "order_date",
                  key: "order_date",
                  render: (data) => <>{data || "N/A"} </>,
                },
                {
                  title: (
                    <div className="flex justify-between items-center">
                      <span>Customer Type</span>
                    </div>
                  ),
                  dataIndex: "name",
                  key: "name",
                  render: (data) => <>{data || "N/A"} </>,
                },
                {
                  title: "Kitchen Status",
                  dataIndex: "measurement",
                  key: "measurement",
                  render: (measurment_name) => <>{measurment_name || "N/A"} </>,
                },
                {
                  title: "Payment Status",
                  dataIndex: "measurement",
                  key: "measurement",
                  render: (measurment_name) => <>{measurment_name || "N/A"} </>,
                },
                {
                  title: "Action",
                  key: "action",
                  render: (record: any) => (
                    <div className="flex items-center gap-2">
                      <Tooltip title="View">
                        <Link to={`/restaurent/order/1`}>
                          <Button
                            size="small"
                            style={{
                              backgroundColor: "#01adad",
                              color: "white",
                              borderRadius: "50px",
                              width: "50px",
                            }}
                            // onClick={() => handleUpdateBed(record)}
                          >
                            View
                          </Button>
                        </Link>
                      </Tooltip>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                          deleteIngredients(record.id);
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
                    </div>
                  ),
                },
              ]}
              dataSource={
                ingredientsData?.data && ingredientsData?.data?.length > 0
                  ? ingredientsData?.data
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
                // total: payrollMonthAndSalaryData?.total,
                showTotal: (total) => `Total ${total} `,
              }}
            />
          </div>

          {/* <IngredientsUpdateModal
            updateData={updateData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          /> */}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
