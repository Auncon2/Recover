import { useState } from "react";

import { Breadcrumb, Button, Col, Table, Tooltip, Typography } from "antd";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";
import Search from "antd/es/input/Search";
import { useGetPurchaselistQuery } from "../api/PurchaseEndPoint";
import CreatePurchase from "../components/CreatePurchase";
import { FaEye } from "react-icons/fa6";
import SinglePurchase from "../components/SinglePurchase";

const Purchase = () => {
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 10,
  });
  // const [_updateData, setUpdateData] = useState({});
  // const [_isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  // const [deleteBedTypes, { isSuccess }] = useDeletePurchaseMutation();
  const { isLoading, data: bedTypesData } = useGetPurchaselistQuery({
    ...filter,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const cardshowModal = () => {
    setModalOpen(true);
  };

  // const cardhandleCancel = () => {
  //   setModalOpen(false);
  // };

  // const handleUpdateBed = (data: any) => {
  //   setUpdateData(data);
  //   setIsModalOpen(true);
  // };

  // const deletePurchase = async (id: string) => {
  //   try {
  //     const response = await deleteBedTypes({
  //       id: Number(id),
  //     });
  //     if (isSuccess) {
  //       console.log("Update successful", response);
  //     }
  //   } catch (error) {
  //     // Handle error
  //     // console.error("Update failed", error);
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

                <span>Restaurent</span>
              </div>
            ),
          },
          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">Purchase</span>
              </div>
            ),
          },
        ]}
      />

      <div className="flex justify-center ">
        <div className="w-[1000px]">
          <Typography.Title style={{ fontSize: "20px", marginBottom: "20px" }}>
            Purcahse
          </Typography.Title>
          <div className="flex flex-col lg:flex-row justify-between mb-4 mx-1">
            <Col xs={24} sm={10} md={10} lg={10}>
              <Search
                placeholder="Search by Purchase Name "
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    name: e.target.value ? e.target.value : "",
                  })
                }
                style={{ width: "100%" }}
              />
            </Col>
            {/* <Link to="/expense/create-expense"> */}
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
              Create Purchase
            </Button>
            {/* </Link> */}
          </div>
          {/* </Card> */}

          <div>
            <Table
              bordered={true}
              rowKey={"id"}
              columns={[
                // ...ExpenseHeadColumn,
                {
                  title: (
                    <div className="flex justify-between items-center">
                      <span>Purchase Name </span>
                    </div>
                  ),
                  dataIndex: "Purchase_name",
                  key: "Purchase_name",
                },
                {
                  title: "Supplier Name",
                  dataIndex: "supplier_name",
                  key: "supplier_name",
                  render: (supplier_name) => <>{supplier_name || "N/A"} </>,
                },
                {
                  title: "Purchase Number",
                  dataIndex: "purchase_number",
                  key: "purchase_number",
                  render: (purchase_number) => <>{purchase_number || "N/A"} </>,
                },
                {
                  title: "Purchase Quantity",
                  dataIndex: "purchase_quantity",
                  key: "purchase_quantity",
                  render: (purchase_quantity) => (
                    <>{purchase_quantity || "N/A"} </>
                  ),
                },
                {
                  title: "Net Amount",
                  dataIndex: "net_amount",
                  key: "net_amount",
                  render: (net_amount) => <>{net_amount || "N/A"} </>,
                },

                {
                  title: "Action",
                  key: "action",

                  render: (_record: any) => (
                    <div className="flex items-center gap-2 hover:cursor-pointer">
                      <Tooltip title="View">
                        {/* <Button
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
                        </Button> */}
                        <FaEye
                          className="hover:cursor-pointer"
                          size={15}
                          onClick={() => {
                            setOpen(true);
                            // setId(purchase_id);
                          }}
                        />
                      </Tooltip>
                      {/* <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                          deletePurchase(record.id);
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
                  ),
                },
              ]}
              dataSource={
                bedTypesData?.data && bedTypesData?.data?.length > 0
                  ? bedTypesData?.data
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
          {/* 
          <PurchaseUpdateModal
            updateData={updateData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          /> */}
          <SinglePurchase id={id} open={open} setOpen={setOpen} setId={setId} />
          <CreatePurchase open={modalOpen} setOpen={setModalOpen} />
        </div>
      </div>
    </>
  );
};

export default Purchase;
