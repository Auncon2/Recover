import {
  Card,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import Search from "antd/es/input/Search";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { IViewRequest } from "../types/Request";
import {
  useDeleteRequestMutation,
  useGetRequestQuery,
} from "../api/RequestEndPoints";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

const requestColumns: ColumnsType<IViewRequest> = [
  {
    title: "Project Id",
    dataIndex: "project_id",
    key: "project_id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "User Id",
    dataIndex: "user_id",
    key: "user_id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
    render: (text) => <a>{text}</a>,
  },
];

const Request = () => {
  const { data } = useGetRequestQuery();

  const [deleteRequestData, { isSuccess }] = useDeleteRequestMutation();

  const deleteRequest = async (id: string) => {
    try {
      const response = await deleteRequestData({
        id: Number(id),
      });
      if (isSuccess) {
        console.log("Update successful", response);
      }
    } catch (error) {
      // Handle error
      console.error("Update failed", error);
    }
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography.Title level={5}>Request</Typography.Title>
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <Row align={"middle"} justify={"space-between"} gutter={[5, 16]}>
              <Col xs={24} sm={12} md={12} lg={6}>
                <Search
                  placeholder="Search by Company"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={24} sm={12} md={12} lg={2}></Col>
            </Row>
          </Card>
          {/* <RequestForm /> */}
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <div>
              <Table
                columns={[
                  ...requestColumns,
                  {
                    title: "View",
                    key: "action",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    render: (record: any) => (
                      <Space size="middle">
                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => {
                            deleteRequest(record?.project_id);
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
                        </Popconfirm>
                        <Link to={`/projectView/${record?.project_id}`}>
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
                // key={data?.data?.id}
                rowKey="id"
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

export default Request;
