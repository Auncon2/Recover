/*
Workshoplist
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Col,
  Row,
  Table,
  Typography,
  Form,
  DatePicker,
  Input,
  Select,
} from 'antd';
import { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import { IPicnicParams } from '../types/PicnicTypes';
import { useGetPicnicQuery } from '../api/PicnicEndPoint';
import { picniclistColumn } from '../utils/PicniclistColoumn';
const { RangePicker } = DatePicker;

const Workshoplist = () => {
  const [filter, setFilter] = useState<IPicnicParams>({
    limit: 10,
    skip: 0,
  });
  const { Option } = Select;

  const { data, isLoading } = useGetPicnicQuery({ ...filter });
  console.log(data?.data);
  // const onFinish = (values: any) => {
  //   if (
  //     values['date'] !== undefined &&
  //     values['date'] !== null &&
  //     values['title'] === ''
  //   ) {
  //     setFilter({
  //       limit: 10,
  //       skip: 0,
  //       from_date: dayjs(values.date[0]).format('YYYY-MM-DD'),
  //       to_date: dayjs(values.date[1]).format('YYYY-MM-DD'),
  //     });
  //   }
  //   if (
  //     values['date'] !== undefined &&
  //     values['date'] !== null &&
  //     values['title'] !== ''
  //   ) {
  //     setFilter({
  //       ...filter,
  //       from_date: dayjs(values.date[0]).format('YYYY-MM-DD'),
  //       to_date: dayjs(values.date[1]).format('YYYY-MM-DD'),
  //       title: values.title,
  //     });
  //   }
  //   if (
  //     values['date'] === undefined ||
  //     (values['date'] === null && values['title'] !== '')
  //   ) {
  //     setFilter({
  //       limit: 10,
  //       skip: 0,
  //       title: values.title,
  //     });
  //   }
  //   if (
  //     values['date'] === undefined ||
  //     (values['date'] === null && values['title'] === '')
  //   ) {
  //     setFilter({
  //       limit: 10,
  //       skip: 0,
  //     });
  //   }
  // };
  const onFinish = (values: any) => {
    const title = values['title'];
    const status = values['status'];
    const date = values['date'];

    // Create a base filter object
    const newFilter: IPicnicParams = {
      limit: 10,
      skip: 0,
    };

    // Check if title is not empty, and add it to the filter
    if (title) {
      newFilter.title = title;
    }
    // Check if status is not empty, and add it to the filter
    if (status) {
      newFilter.status = status;
    }

    // Check if date range is selected, and add it to the filter
    if (date && date.length === 2) {
      newFilter.from_date = dayjs(date[0]).format('YYYY-MM-DD');
      newFilter.to_date = dayjs(date[1]).format('YYYY-MM-DD');
    }

    // Update the filter state
    setFilter(newFilter);
  };
  return (
    <>
      <div>
        <Row align={'middle'} justify={'space-between'}>
          <Typography.Title level={5}>Picnic List</Typography.Title>
        </Row>
        <Card
          style={{
            boxShadow: '0 0 0 1px rgba(0,0,0,.05)',
            marginBottom: '1rem',
          }}
        >
          <Form onFinish={onFinish}>
            <Row
              align={'middle'}
              style={{ alignItems: 'center' }}
              gutter={[5, 5]}
            >
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item name='title'>
                  <Input placeholder='Search Title' style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item name='date'>
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Form.Item name='status'>
                  <Select placeholder='Select Status'>
                    <Option value='upcoming'>Upcoming</Option>
                    <Option value='ended'>Ended</Option>
                    <Option value='canceled'>Canceled</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={10} lg={10} xl={6}>
                <Form.Item name='title' style={{ textAlign: 'end' }}>
                  <SubmitButton icon={<FilterOutlined />} label='Filter' />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card
          style={{
            boxShadow: '0 0 0 1px rgba(0,0,0,.05)',
            marginBottom: '1rem',
          }}
        >
          <div>
            <Table
              rowKey={'id'}
              columns={picniclistColumn}
              dataSource={data?.data && data.data.length > 0 ? data.data : []}
              scroll={{ x: true }}
              loading={isLoading}
              onChange={(pagination) => {
                setFilter({
                  ...filter,
                  skip:
                    ((pagination.current || 1) - 1) *
                    (pagination.pageSize || 10),
                  limit: pagination.pageSize!,
                });
              }}
              pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                pageSizeOptions: ['10', '20', '30', '50', '100'],

                // current: filter.skip + 1,
                total: data?.total,
                showTotal: (total) => `Total ${total} `,
              }}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Workshoplist;
