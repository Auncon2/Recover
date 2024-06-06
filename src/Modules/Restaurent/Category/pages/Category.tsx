import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";
import Search from "antd/es/input/Search";
import {
  useDeleteCategoryMutation,
  useGetCategorylistQuery,
} from "../api/CategoryEndPoints";
import CreateCategory from "../components/CreateCategory";
import CategoryUpdateModal from "../components/UpdateCategory";

const { Option } = Select;
const Category = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 10,
  });
  const [updateData, setUpdateData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCategory, { isSuccess }] = useDeleteCategoryMutation();
  const { isLoading, data: categoryData } = useGetCategorylistQuery({
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

  const deleteIngredients = async (id: string) => {
    try {
      const response = await deleteCategory({
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
                  Category List
                </span>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title={<Typography.Title level={5}>Add Category</Typography.Title>}
        open={modalOpen}
        onCancel={cardhandleCancel}
        footer={false}
      >
        <CreateCategory cardhandleCancel={cardhandleCancel} />
      </Modal>

      <div className="flex justify-center ">
        <div className="w-[1000px]">
          {/* <Typography.Title style={{ fontSize: "16px", marginLeft: "20px" }}>
            CATEGORY LIST
          </Typography.Title> */}
          <Card style={{ marginBottom: "15px" }}>
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex ">
                <Col xs={24} sm={12} md={12} lg={8}>
                  <label className="font-semibold">
                    Search by Category name
                  </label>
                  <Search
                    placeholder="Search by Category Name"
                    onChange={(e) =>
                      setFilter({
                        name: e.target.value
                          ? e.target.value.toUpperCase()
                          : "",
                      })
                    }
                    style={{ width: "230px", marginTop: "5px" }}
                  />
                </Col>
                <Col xs={24} sm={12} md={12} lg={8}>
                  <label className="font-semibold">
                    Search by Category status
                  </label>
                  <Select
                    placeholder="Select Category Status"
                    onChange={(value) =>
                      setFilter({
                        ...filter,
                        status: value ? value : "",
                      })
                    }
                    style={{ width: "200px", marginTop: "5px" }}
                  >
                    <Option value="">All</Option>
                    <Option value="1">Available</Option>
                    <Option value="0">Unavailable</Option>
                  </Select>
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
                Add Category
              </Button>
            </div>
          </Card>

          <div>
            <Table
              bordered={true}
              rowKey={"id"}
              columns={[
                {
                  title: "ID",
                  dataIndex: "id",
                  key: "id",
                  render: (id) => <>{id} </>,
                },
                {
                  title: (
                    <div className="flex justify-between items-center">
                      <span>Category Name </span>
                    </div>
                  ),
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Category Status",
                  dataIndex: "status",
                  key: "status",
                  render: (status) => (
                    <>{status === 1 ? "Available" : "Unavailable" || "N/A"} </>
                  ),
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
                categoryData?.data && categoryData?.data?.length > 0
                  ? categoryData?.data
                  : []
              }
              scroll={{ x: true }}
              loading={isLoading}
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

          <CategoryUpdateModal
            updateData={updateData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>
    </>
  );
};

export default Category;
