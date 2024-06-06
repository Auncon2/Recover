/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Popconfirm, Row, Table, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import GlobalLoader from '../../../components/loader/GlobalLoader';
import {
  useGetSinglePicnicJoinedQuery,
  useUpdatePicnicStatusMutation,
} from '../api/PicnicEndPoint';
import { ColumnsType } from 'antd/es/table';

const picnicJoinedlistColumn: ColumnsType<any> = [
  {
    title: 'Member ID',
    dataIndex: 'memberId',
    key: 'memberId',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    render: (isPaid) =>
      isPaid == 'paid' ? (
        <Tag color='success'>Paid</Tag>
      ) : (
        <Tag color='error'>Due</Tag>
      ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const SingleJoinedPicnicMember = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetSinglePicnicJoinedQuery(Number(id));
  const [updatePicnicStatusMutation, { isSuccess }] =
    useUpdatePicnicStatusMutation();

  if (isLoading) {
    return <GlobalLoader />;
  }

  const updateJoinedMember = async (id: string, memberId: string) => {
    try {
      // Call the mutation function with the required parameters
      const response = await updatePicnicStatusMutation({
        id: id, // Specify the picnic ID  want to update
        memberId: memberId, // Specify the member ID  want to update
      });

      // Handle success
      if (isSuccess) {
        console.log('Update successful', response);
      }
    } catch (error) {
      // Handle error
      console.error('Update failed', error);
    }
  };

  return (
    <Row>
      <Col xl={24} xs={24}>
        <Table
          rowKey={'id'}
          style={{ marginTop: '10px' }}
          columns={[
            ...picnicJoinedlistColumn,
            {
              title: 'Actions',
              key: 'actions',
              render: (record) => (
                <span>
                  {record.status !== 'approved' ? (
                    <Popconfirm
                      title='Are you sure you want to update status?'
                      onConfirm={() => {
                        updateJoinedMember(record.id, record.memberId);
                      }}
                      okText='Update'
                      cancelText='No'
                    >
                      <Button>Action</Button>
                    </Popconfirm>
                  ) : (
                    <Button disabled>Action</Button>
                  )}
                </span>
              ),
            },
          ]}
          dataSource={data?.data && data.data.length > 0 ? data.data : []}
          bordered
          scroll={{ x: true }}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }}
        />
      </Col>
    </Row>
  );
};

export default SingleJoinedPicnicMember;
