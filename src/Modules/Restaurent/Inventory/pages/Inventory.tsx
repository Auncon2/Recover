import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Modal,
  Popconfirm,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {
  useDeleteInventoryMutation,
  useGetInventorylistQuery,
} from "../api/InventoryEndPoints";
// import PDFDownload from "../../../../common/PDFDownload/PDFDownload";
import ExcelDownload from "../../../../common/ExcelDownload/ExcelDoanload";
import PDFDownload from "./../../../../common/PDFDownload/PDFDownload";

const { RangePicker } = DatePicker;
const Inventory = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 10,
  });
  const [_updateData, setUpdateData] = useState({});
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [results, _setResults] = useState<any>([]);
  const [deleteCategory, { isSuccess }] = useDeleteInventoryMutation();
  const { isLoading, data: categoryData } = useGetInventorylistQuery({
    ...filter,
  });
  const [modalOpen, setModalOpen] = useState(false);

  //   ----------------------Pdf Download--------------------------
  //   useEffect(() => {
  //     if (!data) return;
  //     const filteredResults = data?.stock.filter((element: IV2Inventory) =>
  //       element?.ingredient_name?.toLowerCase()?.includes(search?.toLowerCase())
  //     );
  //     setResults(filteredResults);
  //   }, [data, search]);

  //   const cardshowModal = () => {
  //     setModalOpen(true);
  //   };

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
                  Inventory List
                </span>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title={<Typography.Title level={5}>Add Categoraay</Typography.Title>}
        open={modalOpen}
        onCancel={cardhandleCancel}
        footer={false}
      >
        {/* <CreateCategory cardhandleCancel={cardhandleCancel} /> */}
      </Modal>

      <div className="flex justify-center ">
        <div className="w-[1000px]">
          <Card style={{ marginBottom: "15px" }}>
            <div className="flex flex-col lg:flex-row justify-between items-center ">
              <div className="flex ">
                <Col xs={24} sm={12} md={12} lg={9}>
                  <label className="font-semibold">
                    Search by Product Name
                  </label>
                  <Search
                    placeholder="Search by Product Name"
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        name: e.target.value
                          ? e.target.value.toUpperCase()
                          : "",
                      })
                    }
                    style={{ width: "230px", marginTop: "5px" }}
                  />
                </Col>

                <Col xs={24} sm={12} md={12} lg={9}>
                  <label className="font-semibold">Search by Date</label>
                  <RangePicker style={{ marginTop: "5px" }} />
                </Col>
              </div>
              <div className="flex space-x-2 mt-6">
                <PDFDownload
                  PDFFileName="all_inventory_list"
                  fileHeader="INVENTORY LIST"
                  PDFHeader={["Item Name", "Purchase", "Sold", "Remaining"]}
                  PDFData={
                    results?.map(
                      ({
                        ingredient_name,
                        ingredient_measurement,
                        purchased,
                        remaining,
                        sold,
                      }: any) => ({
                        "Item Name": ingredient_name || "N/A",
                        Purchase: `${purchased || "N/A"} (${
                          ingredient_measurement || "N/A"
                        })`,
                        Sold: `${sold || "N/A"} (${
                          ingredient_measurement || "N/A"
                        })`,
                        Remaining: `${remaining || "N/A"} (${
                          ingredient_measurement || "N/A"
                        })`,
                      })
                    ) ?? []
                  }
                />

                <ExcelDownload
                  excelName="all-inventory-list"
                  excelTableHead={[
                    "Item Name",
                    "Purchased",
                    "Sold",
                    "Remaining",
                  ]}
                  excelData={
                    results?.map(
                      ({
                        ingredient_name,
                        ingredient_measurement,
                        purchased,
                        remaining,
                        sold,
                      }: any) => ({
                        "Item Name": ingredient_name || "N/A",
                        Purchased: `${purchased || "N/A"} (${
                          ingredient_measurement || "N/A"
                        })`,
                        Sold: `${sold || "N/A"} (${
                          ingredient_measurement || "N/A"
                        })`,
                        Remaining: `${remaining || "N/A"} (${
                          ingredient_measurement || "N/A"
                        })`,
                      })
                    ) ?? []
                  }
                />
              </div>
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
                      <span>Product Name </span>
                    </div>
                  ),
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Purchase Quantity",
                  dataIndex: "purchase_quantity",
                  key: "purchase_quantity",
                  render: (status) => <>{status || "N/A"} </>,
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

          {/* <CategoryUpdateModal
            updateData={updateData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Inventory;
