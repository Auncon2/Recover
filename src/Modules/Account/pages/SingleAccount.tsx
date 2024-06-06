/*
Single Account
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, Avatar, Row, Col, Card, Space, Grid, Button } from 'antd';

import {
  EnvironmentOutlined,
  BankOutlined,
  SafetyOutlined,
  FolderOutlined,
  ArrowLeftOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';

const { useBreakpoint } = Grid;

const dummyUser = {
  id: 1,
  name: 'Account TOAB',
  account_id: 'TOAB-01',
  account_no: 'AC-34634734457',
  balance: '568568234',
  details: 'All transaction pending',
  branch: 'Bannani',
  avatar: [
    {
      url: 'https://www.logo.wine/a/logo/Google_Account/Google_Account-Logo.wine.svg',
    },
  ],
  information: [{ text: '123 Main St, City' }, { text: '456 Park Ave, Town' }],
};

const SingleAccount = () => {
  const { xl } = useBreakpoint();
  const navigate = useNavigate();

  const user = dummyUser;

  return (
    <>
      <Button type='primary' onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
        Go To Account List
      </Button>
      <Row style={{ marginTop: '1rem' }} gutter={[16, 16]}>
        <Col xl={6} lg={24} xs={24}>
          <Card bordered={false} style={{ height: '100%' }}>
            <Space
              direction='vertical'
              style={{ width: '100%', height: '100%' }}
            >
              <Space
                direction='vertical'
                style={{ textAlign: 'center', width: '100%' }}
              >
                <Avatar size={180} src={user?.avatar?.[0]?.url}></Avatar>
                <Typography.Title level={3}>{'TOAB-01'}</Typography.Title>
              </Space>
              <Space
                direction='vertical'
                style={{ width: '100%', textAlign: xl ? 'unset' : 'center' }}
              >
                <Typography.Text>
                  <BankOutlined /> ID: {'64363'}
                </Typography.Text>
                <Typography.Text>
                  <SafetyOutlined />
                  Account No: {'346346534'}
                </Typography.Text>
                <Typography.Text>
                  <FolderOutlined /> Details: {'okk'}
                </Typography.Text>
                <Typography.Text>
                  <EnvironmentOutlined /> {'Banani'}
                </Typography.Text>
                <Typography.Text>
                  <NumberOutlined /> {'22-06-2023'}
                </Typography.Text>
              </Space>
            </Space>
          </Card>
        </Col>

        <Col xl={18} xs={24}>
          <Card bordered={false}>
            {/* <Table
              columns={SingleAccountColumns}
              dataSource={transactions}
              bordered
              title={() => 'Transaction List'}
              scroll={{ x: true }}
            /> */}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SingleAccount;
