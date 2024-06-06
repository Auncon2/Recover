import {
  Card,
  Col,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { IViewProjectList } from "../types/ProjectList";
import { useGetProjectListQuery } from "../api/ProjectListEndPoints";

const projectListColumns: ColumnsType<IViewProjectList> = [
  {
    title: "Project Id",
    dataIndex: "projectid",
    key: "projectid",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "First Name",
    dataIndex: "firstname",
    key: "firstname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Project Name",
    dataIndex: "projectname",
    key: "projectname",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Project Status",
    dataIndex: "projectstatus",
    key: "projectstatus",
    render: (text) => <a>{text}</a>,
  },
  {
    title: " Status",
    dataIndex: "approval_status",
    key: "approval_status",
    render: (text) => <a>{text}</a>,
  },
];

const Projectlist = () => {
  const [filterValue, setFilterValue] = useState("all");
  const { data } = useGetProjectListQuery({ data: filterValue });
  console.log("object", data);
  //   const [deleteProjectData, { isSuccess }] = useDeleteProjectListMutation();

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  //   const deleteProjectList = async (id: string) => {
  //     try {
  //       const response = await deleteProjectData({
  //         id: Number(id),
  //       });
  //       if (isSuccess) {
  //         console.log("Update successful", response);
  //       }
  //     } catch (error) {
  //       // Handle error
  //       console.error("Update failed", error);
  //     }
  //   };

  return (
    <div>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography.Title level={5}>Project List</Typography.Title>
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
                  <Select.Option value="APPROVED">Approved</Select.Option>
                  <Select.Option value="REJECTED">Rejected</Select.Option>
                  <Select.Option value="PENDING">Pending</Select.Option>
                </Select>
              </Col>
            </Row>
          </Card>

          {/* <TransactionForm /> */}
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <div>
              <Table
                columns={[
                  ...projectListColumns,
                  {
                    title: "View",
                    key: "action",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    render: (record: any) => (
                      <Space size="middle">
                        {/* <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => {
                            deleteProjectList(record?.projectid);
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          {" "}
                          <DeleteOutlined
                            style={{
                              cursor: "pointer",
                              paddingRight: "20px",
                            }}
                          />
                        </Popconfirm> */}
                        <Link to={`/projectView/${record?.projectid}`}>
                          <Tooltip title="View">
                            <EditOutlined
                              style={{
                                cursor: "pointer",
                                paddingRight: "20px",
                              }}
                            />
                          </Tooltip>
                        </Link>

                        {/* More actions can be added here */}
                      </Space>
                    ),
                  },
                ]}
                dataSource={data?.data && data.data.length > 0 ? data.data : []}
                // key={data?.data?.projectid}
                rowKey="projectListId"
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

export default Projectlist;
