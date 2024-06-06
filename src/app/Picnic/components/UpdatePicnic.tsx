/*
@file updatePicnic.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Col, Form, Input, Row, Select } from 'antd';

import { ArrowRightOutlined } from '@ant-design/icons';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCommonModal } from '../../../app/slice/modalSlice';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import { FormFileInput } from '../../../common/Input/FromInput';

import notification from '../../../components/utils/Notification';
import {
  useGetSinglePicnicQuery,
  useUpdatePicnicMutation,
} from '../api/PicnicEndPoint';
import dayjs from 'dayjs';
import { DateInput } from '../../../components/FormItems/FormItems';

function UpdatePicnic({ id }: { id: string | undefined }) {
  const [form] = Form.useForm();
  const { data: singlePicnic } = useGetSinglePicnicQuery(Number(id));
  console.log(singlePicnic);
  const [updatePicnic, { isSuccess, isError, isLoading }] =
    useUpdatePicnicMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldsValue({
      title: singlePicnic?.data?.title,
      place: singlePicnic?.data?.place,
      amount: singlePicnic?.data?.amount,
      status: singlePicnic?.data?.status,
      date: singlePicnic?.data?.date ? dayjs(singlePicnic?.data?.date) : '',
    });
  }, [singlePicnic]);
  useEffect(() => {
    if (isSuccess) {
      // const message = singleEvent?.message ?? 'Success message fallback';
      notification('success', 'Successfully Updated');
      form.resetFields();
      dispatch(setCommonModal());
    }
    if (isError) {
      const message = singlePicnic?.message ?? 'Error message fallback';
      notification('error', message);
    }
  }, [isLoading]);
  const initialFormValues = {
    title: '',
    place: '',
    amount: '',
    status: '',
  };
  const onFinish = async (values: any) => {
    const { title, place, date, amount, status, coverPhoto } = values;
    const formData = new FormData();
    if (
      coverPhoto &&
      coverPhoto.fileList &&
      coverPhoto.fileList[0]?.originFileObj
    ) {
      formData.append('coverPhoto', coverPhoto.fileList[0].originFileObj);
    }
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    formData.append('date', formattedDate || '');

    if (title !== initialFormValues.title) {
      formData.append('title', title);
    }

    if (place !== initialFormValues.place) {
      formData.append('place', place);
    }
    if (amount !== initialFormValues.amount) {
      formData.append('amount', amount);
    }
    if (status !== initialFormValues.status) {
      formData.append('status', status);
    }

    console.table(Object.fromEntries(formData));

    await updatePicnic({ id: id!, formData });
  };

  const { Option } = Select;

  return (
    <>
      <Row align={'middle'} gutter={[5, 16]}>
        <Col xs={24} sm={24} md={24}>
          <Form
            hideRequiredMark
            onFinish={onFinish}
            layout='vertical'
            form={form}
          >
            <Card
              className='border'
              style={{ marginBottom: '1rem', marginTop: '1rem' }}
            >
              {' '}
              <Row align={'middle'} gutter={[5, 16]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name='title'
                    label='Title'
                    rules={[
                      {
                        required: true,
                        message: 'Please Input your Title',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input placeholder='Title' />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <DateInput
                    label='Date'
                    name='date'
                    placeholder='Date'
                    size={24}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name='amount'
                    rules={[{ required: true }]}
                    label='Amount'
                    required
                  >
                    <Input placeholder='Amount' type='number' />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name='place'
                    rules={[{ required: true }]}
                    label='Place'
                    required
                  >
                    <Input placeholder='Place' type='text' />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label='Select Status' name='status'>
                    <Select style={{ width: '310px' }}>
                      <Option value='upcoming'>Upcoming</Option>
                      <Option value='ended'>Ended</Option>
                      <Option value='cancel'>Cancel</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <FormFileInput
                    name='coverPhoto'
                    label='Cover Photo'
                    picture='picture'
                  />
                </Col>
              </Row>
            </Card>

            <SubmitButton icon={<ArrowRightOutlined />} loading={isLoading} />
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default UpdatePicnic;
