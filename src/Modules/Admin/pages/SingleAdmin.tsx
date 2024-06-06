/*
@file SingleAdmin.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
import {
  Typography,
  Row,
  Col,
  Card,
  Space,
  Grid,
  Descriptions,
  Button,
  Avatar,
} from 'antd';

import {
  BankOutlined,
  ArrowLeftOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
// import dayjs from 'dayjs';
// import { useAppDispatch } from '../../../../app/store/store';
// import { setCommonModal } from '../../../../app/slice/modalSlice';
// import UpdateAdmin from '../components/UpdateAdmin';

const { useBreakpoint } = Grid;

const SingleAdmin = () => {
  const { xl } = useBreakpoint();
  const navigate = useNavigate();
  //   const dispatch = useAppDispatch();

  //   const { id } = useParams();
  const { Title } = Typography;

  //   const showModal = () => {
  //     dispatch(
  //       setCommonModal({
  //         title: 'Update Admin',
  //         content: <UpdateAdmin id={id!} />,
  //         show: true,
  //         width: 720,
  //       })
  //     );
  //   };

  return (
    <>
      <Button type='primary' onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
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
                <Avatar
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkPvW6SHxfmMHwaL4-z9L2tOI0tP3qKLjh0tON9fRxZA&s`}
                  //   alt={`${singleAdmin?.data?.name}'s Avatar`}
                  alt=''
                  style={{ width: '180px', height: '180px' }}
                />
                <Typography.Title level={3}>{'Demo name'}</Typography.Title>
              </Space>
              <Space
                direction='vertical'
                style={{ width: '100%', textAlign: xl ? 'unset' : 'center' }}
              >
                <Typography.Text>
                  <BankOutlined /> ID: {'AD1'}
                </Typography.Text>
              </Space>
            </Space>
          </Card>
        </Col>

        <Col xl={18} xs={24}>
          <Card bordered={false}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Descriptions
                labelStyle={{ fontSize: '16px' }}
                bordered={true}
                column={2}
                size='middle'
                title={<Title level={4}>Admin Details</Title>}
                extra={
                  <Button
                    // onClick={showModal}
                    icon={<EditOutlined />}
                    type='primary'
                  >
                    Edit
                  </Button>
                }
              >
                <Descriptions.Item label='Phone Number'>
                  {'01999999999' || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label='Email'>
                  {'admin@gmail.com' || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label='Role'>
                  {'Admin' || 'N/A'}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SingleAdmin;
