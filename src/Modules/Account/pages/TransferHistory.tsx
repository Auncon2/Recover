/*
Transaction History
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
  from_account: string;
  to_account: string;
  type: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },

  {
    title: 'From Account',
    dataIndex: 'from_account',
    key: 'from_account',
  },
  {
    title: 'To Account',
    dataIndex: 'to_account',
    key: 'to_account',
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
    from_account: 'bkash',
    to_account: 'rocket',
    type: 'cash',
  },
  {
    id: 2,
    key: '2',
    amount: 43,
    from_account: 'bkash',
    to_account: 'rocket',
    type: 'cash',
  },
  {
    id: 3,
    key: '3',
    amount: 43,
    from_account: 'bkash',
    to_account: 'rocket',
    type: 'cash',
  },
];
const TransferHistory = () => {
  return (
    <>
      <Row justify='center' align='middle' style={{ maxWidth: 'auto' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography.Title level={5}>Balance Transfer List</Typography.Title>

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

export default TransferHistory;
