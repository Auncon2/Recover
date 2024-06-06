/*
Picnic Coloumn
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnsType } from 'antd/es/table';
import { Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { IPicniclist } from '../types/PicnicTypes';

export const picniclistColumn: ColumnsType<IPicniclist> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Place',
    dataIndex: 'place',
    key: 'place',
  },

  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_text, record) => {
      let statusText = '';
      let statusColor = '';

      if (record.status === 'upcoming') {
        statusText = 'Upcoming';
        statusColor = 'green'; // Set the text color to green for "upcoming"
      } else if (record.status === 'ended') {
        statusText = 'Ended';
        statusColor = 'red'; // Set the text color to red for "ended"
      } else if (record.status === 'canceled') {
        statusText = 'Canceled';
        statusColor = 'blue'; // Set the text color to blue for "canceled"
      }

      return <span style={{ color: statusColor }}>{statusText}</span>;
    },
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date) => (
      <Space size='middle'>{dayjs(date).format('DD-MM-YYYY')}</Space>
    ),
  },
  {
    title: 'View',
    dataIndex: 'id',
    key: 'id',
    render: (_, { id }) => (
      <Tooltip title='View'>
        <Link to={`${id}`}>
          <EyeOutlined style={{ cursor: 'pointer' }} />
        </Link>
      </Tooltip>
    ),
  },
];

// export const picnicJoinedlistColumn: ColumnsType<any> = [
//   {
//     title: 'ID',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Email',
//     dataIndex: 'email',
//     key: 'email',
//   },
//   {
//     title: 'Company Name',
//     dataIndex: 'companyName',
//     key: 'companyName',
//   },
//   {
//     title: 'Paid',
//     dataIndex: 'isPaid',
//     key: 'isPaid',
//     render: (isPaid) =>
//       isPaid == true ? (
//         <Tag color='success'>Paid</Tag>
//       ) : (
//         <Tag color='error'>Due</Tag>
//       ),
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     key: 'status',
//   },
// ];
