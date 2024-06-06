/*
@file createPicnic.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SendOutlined } from '@ant-design/icons';
import { Form, Button, Card, Col, Input, Row, Typography, Select } from 'antd';
import { DateInput } from '../../../components/FormItems/FormItems';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePicnicMutation } from '../api/PicnicEndPoint';
import { ICreatePicnic } from '../types/PicnicTypes';
import { FormFileInput } from '../../../common/Input/FromInput';
import TextArea from 'antd/es/input/TextArea';

const CreatePicnic = () => {
  const [paymentStatus, setPaymentStatus] = useState(0);
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createPicnic, { isSuccess, isLoading }] = useCreatePicnicMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate(`/picnic/picniclist`);
    }
  }, [isSuccess, form, navigate]);
  const onFinish = (values: ICreatePicnic) => {
    const { coverPhoto, date, payable } = values;
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('details', values.details);

    // Conditionally append "amount" only when "payable" is not equal to 0
    if (payable !== 0) {
      formData.append('amount', values.amount);
    }

    const formattedStartDate = dayjs(date).format('YYYY-MM-DD');
    formData.append('date', formattedStartDate);
    formData.append('place', values.place);
    formData.append('payable', values.payable);
    if (
      coverPhoto &&
      coverPhoto.fileList &&
      coverPhoto.fileList[0]?.originFileObj
    ) {
      formData.append('coverPhoto', coverPhoto.fileList[0].originFileObj);
    }
    // formData.append('coverPhoto', coverPhoto.fileList[0].originFileObj);
    console.table(Object.fromEntries(formData));
    createPicnic(formData);
  };

  return (
    <Row justify='center' align='middle' style={{ maxWidth: 'auto' }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
            <Typography.Title level={5}>Create Picnic</Typography.Title>
          </Row>

          <Form
            hideRequiredMark
            onFinish={onFinish}
            layout='vertical'
            form={form}
            initialValues={{
              amount: 0,
            }}
          >
            <Card
              className='border'
              style={{ marginBottom: '1rem', marginTop: '1rem' }}
            >
              {' '}
              <Row align={'middle'} gutter={[5, 16]}>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name='title'
                    label='Picnic Title'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Title',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input placeholder='Picnic Title' />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <DateInput
                    label='Picnic Date'
                    name='date'
                    placeholder='Picnic Date'
                    size={24}
                    value={0}
                    required
                  />
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name='place'
                    rules={[{ required: true }]}
                    label='Picnic Place'
                    required
                  >
                    <Input placeholder='Picnic Place' type='text' />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    label='Select Payment Status'
                    name='payable'
                    initialValue={0}
                    rules={[{ required: true }]}
                  >
                    <Select
                      onChange={(value) => {
                        console.log('Selected value:', value);
                        setPaymentStatus(value);
                      }}
                    >
                      <Option value={1}>Paid</Option>
                      <Option value={0}>Free</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {paymentStatus !== 0 && (
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      name='amount'
                      rules={[{ required: paymentStatus !== 0 }]}
                      label='Amount'
                      required={paymentStatus !== 0}
                    >
                      <Input placeholder='Amount' type='number' />
                    </Form.Item>
                  </Col>
                )}

                <Col span={8}>
                  <FormFileInput
                    required
                    name='coverPhoto'
                    label='Cover Photo'
                    picture='picture'
                    style={{ width: '200px', height: '40px' }}
                  />
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name='details'
                    label='Details'
                    rules={[
                      {
                        whitespace: true,
                      },
                    ]}
                  >
                    <TextArea rows={2} placeholder='Details' />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Form.Item style={{ marginTop: '1rem' }}>
              <Button
                loading={isLoading}
                htmlType='submit'
                type='primary'
                icon={<SendOutlined />}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CreatePicnic;
