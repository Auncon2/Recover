import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Modal,
  Popconfirm,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";
import Search from "antd/es/input/Search";
import {
  useDeleteFoodsMutation,
  useGetFoodslistQuery,
} from "../api/FoodsEndPoints";
import CreateFoods from "../components/CreateFood";
import SingleFoodMenu from "../components/SingleFoodMenu";

const Foods = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 10,
  });
  const [_updateData, setUpdateData] = useState({});
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [deleteFoods, { isSuccess }] = useDeleteFoodsMutation();
  const { isLoading, data: foodsData } = useGetFoodslistQuery({
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

  const deleteFood = async (id: string) => {
    try {
      const response = await deleteFoods({
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
                <span className="text-[#20a09e] font-semibold">Foods List</span>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title={<Typography.Title level={5}>Add Foods</Typography.Title>}
        open={modalOpen}
        onCancel={cardhandleCancel}
        footer={false}
        width={1000}
      >
        <CreateFoods cardhandleCancel={cardhandleCancel} />
      </Modal>

      <div className="flex justify-center ">
        <div className="w-[1000px]">
          <Card style={{ marginBottom: "15px" }}>
            <div className="flex flex-col lg:flex-row justify-between items-center ">
              <div>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <label className="font-semibold">Search by Foods name</label>
                  <Search
                    placeholder="Search by Foods Name "
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        name: e.target.value ? e.target.value : "",
                      })
                    }
                    style={{ width: "300px", marginTop: "5px" }}
                  />
                </Col>
              </div>
              <Button
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
                Add Foods
              </Button>
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
                  title: (
                    <div className="flex justify-between items-center">
                      <span>Menu Name </span>
                    </div>
                  ),
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Category",
                  dataIndex: "category",
                  key: "category",
                  render: (category) => <>{category || "N/A"} </>,
                },
                {
                  title: "Price",
                  dataIndex: "price",
                  key: "price",
                  render: (price) => <>{price || "N/A"} </>,
                },
                {
                  title: "Sell Price",
                  dataIndex: "sell-price",
                  key: "sell-price",
                  render: (price) => <>{price || "N/A"} </>,
                },

                {
                  title: "Action",
                  key: "action",

                  render: (record: any) => (
                    <div className="flex items-center gap-2">
                      <Tooltip title="Edit">
                        <Button
                          size="small"
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
                          deleteFood(record.id);
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

                      <Tooltip title="View">
                        <Button
                          size="small"
                          style={{
                            backgroundColor: "#01adad",
                            color: "white",
                            borderRadius: "50px",
                            width: "50px",
                          }}
                          onClick={() => {
                            setOpen(true);
                            setId(record);
                          }}
                        >
                          View
                        </Button>
                      </Tooltip>
                    </div>
                  ),
                },
              ]}
              dataSource={
                foodsData?.data && foodsData?.data?.length > 0
                  ? foodsData?.data
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

          <SingleFoodMenu id={id} open={open} setOpen={setOpen} setId={setId} />
        </div>
      </div>
    </>
  );
};

export default Foods;
