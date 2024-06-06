import { Card, Col, Row, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useGetUserListQuery } from "../api/UserListEndPoints";
import { IViewUserList } from "../types/UserListTypes";

import { useState } from "react";

const userListColumns: ColumnsType<IViewUserList> = [
  {
    title: "User Id",
    dataIndex: "userid",
    key: "userid",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "User Role",
    dataIndex: "userrole",
    key: "userrole",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "User Type",
    dataIndex: "usertype",
    key: "usertype",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email verified",
    dataIndex: "verified",
    key: "verified",
    render: (text) => <a>{text ? "Verified" : "Non-Verified"}</a>,
  },
];

const Userlist = () => {
  const [filterValue, setFilterValue] = useState("all");
  const { data } = useGetUserListQuery({ data: filterValue });

  console.log("object", data);
  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  // const [deleteUserListData, { isSuccess }] = useDeleteUserListMutation();

  // const handleViewDetails = (id: number) => {
  //   setId(id);
  //   setIsModalOpen(true);
  // };

  // const deleteUserList = async (id: string) => {
  //   try {
  //     const response = await deleteUserListData({
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
    <div>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {/* <Typography.Title level={5}>USER LIST</Typography.Title> */}
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <Row align={"middle"} justify={"space-between"} gutter={[5, 16]}>
              {/* <Col xs={24} sm={12} md={12} lg={6}>
                <Search
                  placeholder="Search by Company"
                  style={{ width: "100%" }}
                />
              </Col> */}

              <Col xs={24} sm={12} md={12} lg={2}>
                <Select
                  defaultValue="all"
                  style={{ width: "100%" }}
                  onChange={handleFilterChange}
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="true">Verified</Select.Option>
                  <Select.Option value="false">Non-Verified</Select.Option>
                </Select>
              </Col>
            </Row>
          </Card>
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <div>
              <Table
                columns={[
                  ...userListColumns,
                  // {
                  //   title: "View",
                  //   key: "action",
                  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  //   render: (record: any) => (
                  //     <Space size="middle">
                  //       <Popconfirm
                  //         title="Delete the task"
                  //         description="Are you sure to delete this task?"
                  //         onConfirm={() => {
                  //           deleteUserList(record.userid);
                  //         }}
                  //         okText="Yes"
                  //         cancelText="No"
                  //       >
                  //         {" "}
                  //         <DeleteOutlined
                  //           style={{
                  //             cursor: "pointer",
                  //             paddingRight: "20px",
                  //           }}
                  //         />
                  //       </Popconfirm>
                  //       <Tooltip title="View">
                  //         <EditOutlined
                  //           onClick={() => handleViewDetails(record.userid)}
                  //           style={{
                  //             cursor: "pointer",
                  //             paddingRight: "20px",
                  //           }}
                  //         />
                  //       </Tooltip>
                  //       {/* More actions can be added here */}
                  //     </Space>
                  //   ),
                  // },
                ]}
                dataSource={data?.data && data.data.length > 0 ? data.data : []}
                // key={data?.data?.userid}
                rowKey="userid"
                scroll={{ x: true }}
                pagination={{ showSizeChanger: true }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Userlist;
