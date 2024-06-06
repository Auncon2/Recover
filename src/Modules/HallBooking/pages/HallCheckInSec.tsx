/*
Create Account
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  Card,
  Col,
  Row,
  Typography,
  Select,
  DatePicker,
  Input,
  Modal,
} from "antd";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";

import { useEffect } from "react";
import { DatePickerProps } from "antd/lib";

import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";

import {
  useCreateHallCheckInMutation,
  useGetHallBookingSingleDetailsQuery,
} from "../api/HallBookingEndPoints";
import moment from "moment";

interface CheckInSecProps {
  bookingId: number | null;

  setIsModalOpen: any;
  isModalOpen: any;
}
const HallCheckInSec: React.FC<CheckInSecProps> = ({
  bookingId,

  setIsModalOpen,
  isModalOpen,
}) => {
  // const navigate = useNavigate();

  // const book: any = { status: "approved", user_id: guestValue };
  // const book: any = { booking_status: "confirmed", user_id: guestValue };

  const { data: singleRoom } = useGetHallBookingSingleDetailsQuery(
    Number(bookingId)
  );

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(["check_in"]);
  };

  // console.log("asas", bookingList?.data);

  const [createCheckIn, { isSuccess, isLoading }] =
    useCreateHallCheckInMutation();

  const [form] = Form.useForm();

  const onChange: DatePickerProps["onChange"] = (
    _date: any,
    dateString: any
  ) => {
    console.log(dateString);
  };

  useEffect(() => {
    if (singleRoom) {
      form.setFieldsValue({
        name: singleRoom?.data?.name,
        booking_id: singleRoom?.data?.id,
      });
    }
  }, [singleRoom, form]);

  const onFinish = (values: any) => {
    const bookingCheckIn = {
      check_in: dayjs(values.check_in).format("YYYY-MM-DD HH:mm:ss"),
      booking_id: values.booking_id ? values.booking_id : 0,
    };
    createCheckIn(bookingCheckIn);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      handleCancel();
      // navigate(`/hall-check-in-check-out`);
    }
  }, [form, isSuccess]);
  function disabledDate(current: any) {
    // Disable dates before today
    return current && current < moment().startOf("day");
  }
  return (
    <>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={false}
      >
        <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card
              style={{
                boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
                marginBottom: "1rem",
                marginTop: "30px",
              }}
            >
              <Row
                align={"middle"}
                justify={"space-between"}
                style={{ marginBottom: "1rem" }}
              >
                <Typography.Title level={4}>Hall Check In</Typography.Title>
              </Row>
              <Form onFinish={onFinish} layout="vertical" form={form}>
                <Row align={"middle"} gutter={[20, 16]}>
                  {/* Guest Name */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item name="name" label="Guest Name">
                      <Input
                        type="text"
                        placeholder="Select Guest Name"
                        readOnly
                      />
                    </Form.Item>
                  </Col>

                  {/* booking Number */}

                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      name="booking_id"
                      label="Booking Number"
                      style={{ width: "100%" }}
                    >
                      <Select
                        showSearch
                        placeholder="Select Booking Number"
                        optionFilterProp="children"
                      >
                        <Select.Option value={singleRoom?.data?.id}>
                          {singleRoom?.data?.booking_no}
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* check_in date */}
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item label="Check In" name="check_in">
                      <DatePicker
                        // showTime={{ format: "HH:mm:ss" }}
                        showTime={{ format: "h:mm a" }}
                        format="YYYY-MM-DD HH:mm:ss" // Specify the overall format including date and time
                        onChange={onChange}
                        style={{ width: "100%" }}
                        disabledDate={disabledDate}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <SubmitButton loading={isLoading} />
              </Form>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default HallCheckInSec;
