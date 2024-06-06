/*
Role Coloumn
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import moment from 'moment';

export const auditTrailColumn: ColumnsType<any> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Admin Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt) => (
      <Space size='middle'>
        {moment(createdAt).format('YYYY/MM/DD, h:mm:ss a')}
      </Space>
    ),
  },
];
