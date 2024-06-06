/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Row, Col, Card, Typography, Divider } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import {
  SelectPermission,
  SelectPermissionType,
  SelectRole,
} from '../../../../app/fromItemCommon/SelectCustomField';
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';
import { useCreateRolePermissionMutation } from '../api/PermissionGroupEndPoint';
import { useEffect } from 'react';

const CreateRolePermission = () => {
  const [form] = Form.useForm();
  const [createRolePermission, { isLoading, isSuccess }] =
    useCreateRolePermissionMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isLoading]);
  const onFinish = (values: any) => {
    const postData = {
      roleId: values.roleId,
      permissions: values.permissions && values.permissions,
    };
    createRolePermission(postData);
    form.resetFields();
  };

  return (
    <Card
      style={{
        boxShadow: '0 0 0 1px rgba(0,0,0,.05)',
        marginBottom: '1rem',
      }}
    >
      <Row
        align={'middle'}
        justify={'space-between'}
        style={{ marginBottom: '1rem' }}
      >
        <Typography.Title level={5}>Create Permission</Typography.Title>
      </Row>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Card
          className='border'
          style={{ marginBottom: '1rem', marginTop: '1rem' }}
        >
          <Row align={'middle'} gutter={[5, 16]}>
            <Col xs={24} sm={24} md={8} lg={8}>
              <SelectRole required name='roleId' label='Select Role' />
            </Col>
          </Row>
        </Card>

        <Card className='border mb-10'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <Typography.Title level={5}>
              Permission Information 🎖️
            </Typography.Title>
          </div>
          <Form.List name='permissions' initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Row
                    key={field.key}
                    gutter={[10, { xs: 8, sm: 8, md: 24, lg: 24 }]}
                    align='middle'
                  >
                    <div style={{ width: '33%' }}>
                      <SelectPermission
                        required
                        name={[field.name, 'permissionId']}
                        label='Select Permission'
                      />
                    </div>
                    <div style={{ width: '33%', marginLeft: '10px' }}>
                      <SelectPermissionType
                        required
                        name={[field.name, 'permissionType']}
                        label='Select Permission Type'
                      />
                    </div>
                    <Form.Item
                      style={{
                        marginLeft: '10px',
                        marginTop: '2rem',
                      }}
                    >
                      {index === 0 ? (
                        <Button
                          type='primary'
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        ></Button>
                      ) : (
                        <>
                          <Button
                            style={{
                              background: 'red',
                              color: '#fff',
                              marginLeft: '1rem',
                            }}
                            onClick={() => remove(field.name)}
                            icon={<MinusOutlined />}
                          ></Button>
                        </>
                      )}
                    </Form.Item>
                    {fields.length > 1 && <Divider />}
                  </Row>
                ))}
              </>
            )}
          </Form.List>
        </Card>
        <SubmitButton />
      </Form>
    </Card>
  );
};

export default CreateRolePermission;
