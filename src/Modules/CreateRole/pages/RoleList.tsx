import { EyeOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import Search from "antd/es/input/Search";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  date: string;
  email: string;
  role: string;
  id: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <span style={{ fontSize: "16px" }}>
        <Avatar
          style={{ marginRight: "1.5rem" }}
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkPvW6SHxfmMHwaL4-z9L2tOI0tP3qKLjh0tON9fRxZA&s`}
        />{" "}
        {text}
      </span>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Role",
    key: "role",
    dataIndex: "role",
    render: (text) => <Tag color="success">{text}</Tag>,
  },
  {
    title: "View",
    key: "action",
    render: (record: any) => (
      <Space size="middle">
        <Link to={`${record.id}`}>
          <Tooltip title="View">
            <EyeOutlined style={{ cursor: "pointer" }} />
          </Tooltip>
        </Link>
        {/* More actions can be added here */}
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: 1,
    key: "1",
    name: "John Brown",
    email: "demo@example.com",
    date: "22-06-1998",
    role: "admin",
  },
  {
    id: 2,
    key: "2",
    name: "John Brown",
    email: "demo@example.com",
    date: "22-06-1998",
    role: "super admin",
  },
  {
    id: 3,
    key: "3",
    name: "John Brown",
    email: "demo@example.com",
    date: "22-06-1998",
    role: "admin",
  },
];

const RoleList = () => {
  return (
    <div>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography.Title level={5}>Role List</Typography.Title>

          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <Row align={"middle"} justify={"start"} gutter={[8, 16]}>
              <Col xs={24} sm={24} md={8} lg={5}>
                <Search placeholder="Search By Name" style={{ width: "95%" }} />
              </Col>
              <Col xs={24} sm={24} md={8} lg={5}>
                <Search placeholder="Search By Role" style={{ width: "95%" }} />
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
                columns={columns}
                dataSource={data}
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

export default RoleList;
