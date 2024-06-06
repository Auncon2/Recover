/*
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnsType } from 'antd/es/table';
import {
  INewPermission,
  IPermissionGroup,
} from '../types/PermissionGroupTypes';
import { Tag } from 'antd';
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
export const permissionGroupColumn: ColumnsType<IPermissionGroup> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

export const permissionlistColumn: ColumnsType<any> = [
  {
    title: 'Permission Group Name',
    dataIndex: 'permissionGroupName',
    key: 'permissionGroupName',
  },
  {
    title: 'Permission Name',
    dataIndex: 'permissions',
    key: 'permissions',
    render: (permissions) => (
      <ul>
        {permissions.map((permission: INewPermission) => (
          <Tag key={permission.permission_id} color={getRandomColor()}>
            {permission.permission_name}
          </Tag>
        ))}
      </ul>
    ),
  },
];
