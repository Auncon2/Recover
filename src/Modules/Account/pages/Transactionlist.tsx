/*
Transactionlist
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Table, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  id: number;
  amount: number;
  account: string;
  type: string;
  transaction_date: string;
  details: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Date',
    dataIndex: 'transaction_date',
    key: 'transaction_date',
  },

  {
    title: 'Account',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
];

const data: DataType[] = [
  {
    id: 1,
    key: '1',
    amount: 43,
    account: 'bkash',
    type: 'cash',
    transaction_date: '22-09-2023',
    details: 'ok',
  },
  {
    id: 2,
    key: '2',
    amount: 43,
    account: 'bkash',
    type: 'cash',
    transaction_date: '22-09-2023',
    details: 'ok',
  },
  {
    id: 3,
    key: '3',
    amount: 43,
    account: 'bkash',
    type: 'cash',
    transaction_date: '22-09-2023',
    details: 'ok',
  },
];
const Transactionlist = () => {
  return (
    <>
      <Row justify='center' align='middle' style={{ maxWidth: 'auto' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography.Title level={5}>Transaction List</Typography.Title>

          <Card
            style={{
              boxShadow: '0 0 0 1px rgba(0,0,0,.05)',
              marginBottom: '1rem',
            }}
          >
            <Row align={'middle'} justify={'start'} gutter={[8, 16]}>
              <Col xs={24} sm={24} md={8} lg={5}>
                <Search placeholder='Search ' style={{ width: '95%' }} />
              </Col>
            </Row>
          </Card>
          <Card
            style={{
              boxShadow: '0 0 0 1px rgba(0,0,0,.05)',
              marginBottom: '1rem',
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
    </>
  );
};

export default Transactionlist;
