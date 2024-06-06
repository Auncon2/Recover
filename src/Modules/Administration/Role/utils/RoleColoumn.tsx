/*
Role Coloumn
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnsType } from "antd/es/table";
import { Space, Tooltip } from "antd";
// import { Link } from 'react-router-dom';
// import { EyeOutlined } from '@ant-design/icons';
import { IAllRole } from "../types/RoleTypes";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

export const roleColumn: ColumnsType<IAllRole> = [
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
    title: "Created Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => (
      <Space size="middle">{dayjs(createdAt).format("DD-MM-YYYY")}</Space>
    ),
  },
  {
    title: "View",
    dataIndex: "id",
    key: "id",
    render: (_, { id }) => (
      <Tooltip title="View">
        <Link to={`${id}`}>
          <EyeOutlined style={{ cursor: "pointer" }} />
        </Link>
      </Tooltip>
    ),
  },
];
