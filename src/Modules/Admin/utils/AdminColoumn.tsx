import { ColumnsType } from "antd/es/table";
import { IAllAdmin } from "../types/AdminTypes";
import { Space, Tag } from "antd";
import dayjs from "dayjs";
// import { Tooltip } from 'antd';
// import dayjs from 'dayjs';
// import { Link } from 'react-router-dom';
// import { EyeOutlined } from '@ant-design/icons';

export const adminListColumn: ColumnsType<IAllAdmin> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "4",
    render: (text) => (
      <Tag color={text === 1 ? "green" : "red"}>
        {text === 1 ? "Active" : "Deactive"}
      </Tag>
    ),
  },
  {
    title: "Role Name",
    dataIndex: "role_name",
    key: "role_name",
  },

  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (created_at) => (
      <Space size="middle">{dayjs(created_at).format("DD-MM-YYYY")}</Space>
    ),
  },
  // {
  //   title: 'View',
  //   dataIndex: 'id',
  //   key: 'id',
  //   render: (_, { id }) => (
  //     <Tooltip title='View'>
  //       <Link to={`${id}`}>
  //         <EyeOutlined style={{ cursor: 'pointer' }} />
  //       </Link>
  //     </Tooltip>
  //   ),
  // },
];
