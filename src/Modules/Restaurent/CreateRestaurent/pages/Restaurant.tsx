import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Row,
  Table,
  Tag,
  Tooltip,
} from "antd";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import CreateRestaurent from "./CreateRestaurent";
import { useGetAllHotelRestaurentlistQuery } from "../api/CreateRestaurentEndPoints";
import Search from "antd/es/input/Search";
import UpdateRestaurantModal from "../components/UpdateRestaurant";

const Restaurant = () => {
  const [filter, setFilter] = useState({
    skip: 0,
    limit: 30,
    key: "",
  });
  const { data: restaurentList } = useGetAllHotelRestaurentlistQuery({
    ...filter,
  });
  const [updateData, setUpdateData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("restaurentList", restaurentList?.data);

  const handleUpdateExpense = (data: any) => {
    setUpdateData(data);
    setIsModalOpen(true);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Breadcrumb
        className="mt-5 mb-[50px]"
        separator=">"
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
              <>
                {/* <UserOutlined /> */}
                <span>Restaurant </span>
              </>
            ),
          },
        ]}
      />

      <div className="flex justify-center ">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
          <Row
            gutter={[12, 16]}
            justify="space-between"
            style={{ marginBottom: "10px" }}
          >
            <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
              <Search
                placeholder="Search by Restaurant Name and E-mail"
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    key: e.target.value ? e.target.value : "",
                  })
                }
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
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
                onClick={showDrawer}
              >
                Add Restaurant
              </Button>
            </Col>
          </Row>

          <Table
            size="small"
            bordered={true}
            columns={[
              // ...ExpenseHeadColumn,
              {
                title: "ID",
                dataIndex: "res_id",
                key: "res_id",
                render: (text) => <>{text ? text : "N/A"}</>,
              },
              {
                title: "Restaurant Name",
                dataIndex: "name",
                key: "name",
                render: (text) => <>{text ? text : "N/A"}</>,
              },
              {
                title: "Restaurant E-mail",
                dataIndex: "res_email",
                key: "res_email",
                render: (text) => <>{text ? text : "N/A"}</>,
              },
              {
                title: "Restaurant Phone No",
                dataIndex: "phone",
                key: "phone",
                render: (text) => <>{text ? text : "N/A"}</>,
              },

              // {
              //   title: "Admin E-mail",
              //   dataIndex: "admin_email",
              //   key: "admin_email",
              //   render: (text) => <>{text ? text : "N/A"}</>,
              // },
              {
                title: "Status",
                dataIndex: "res_status",
                key: "res_status",
                render: (res_status) => (
                  <Tag color={res_status === 1 ? "green" : "red"}>
                    {res_status === 1 ? "ACTIVE" : "DEACTIVE"}
                  </Tag>
                ),
              },

              {
                title: "Action",
                key: "action",

                render: (record: any) => (
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={16}>
                    <Tooltip title="Edit">
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => handleUpdateExpense(record)}
                        style={{
                          backgroundColor: "#01adad",
                          cursor: "pointer",
                          width: "100%",
                          color: "white",
                        }}
                      />
                    </Tooltip>
                  </Col>
                ),
              },
            ]}
            dataSource={restaurentList?.data ? restaurentList?.data : []}
            scroll={{ x: true }}
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

              total: restaurentList?.total,
            }}
          />

          <Drawer
            title="Create Restaurant"
            width={600}
            onClose={onClose}
            open={open}
          >
            <CreateRestaurent onClose={onClose} />
          </Drawer>
        </Col>
      </div>
      <UpdateRestaurantModal
        updateData={updateData}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default Restaurant;
