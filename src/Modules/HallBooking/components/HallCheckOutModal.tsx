import { Col, DatePicker, Form, Modal } from "antd";
import dayjs from "dayjs";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { DatePickerProps } from "antd/lib";

import { useEffect } from "react";
import { useCreateHallCheckOutMutation } from "../api/HallBookingEndPoints";

const HallCheckOutModal = ({
  updateData,
  setIsModalOpen,
  isModalOpen,
}: any) => {
  const [CheckOut, { isSuccess, isLoading }] = useCreateHallCheckOutMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(["check_out"]);
  };

  const [form] = Form.useForm();
  const onChange: DatePickerProps["onChange"] = (
    _date: any,
    dateString: any
  ) => {
    console.log(dateString);
  };

  const onFinish = (values: any) => {
    const bookingCheckOut = {
      check_out: dayjs(values.check_out).format("YYYY-MM-DD HH:mm:ss"),
    };

    CheckOut({ id: Number(updateData), data: bookingCheckOut });
  };
  useEffect(() => {
    if (isSuccess) {
      handleCancel();
    }
  }, [isSuccess]);
  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinish} layout="vertical" form={form}>
          {/* check_in date */}
          <Col xs={24} sm={24} md={8} lg={24}>
            <Form.Item label="Hall Check Out" name="check_out">
              {/* <DatePicker onChange={onChange} style={{ width: "450px" }} /> */}
              <DatePicker
                // showTime={{ format: "HH:mm:ss" }}
                showTime={{ format: "h:mm a" }}
                format="YYYY-MM-DD HH:mm:ss" // Specify the overall format including date and time
                onChange={onChange}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <SubmitButton loading={isLoading} />
        </Form>
      </Modal>
    </>
  );
};

export default HallCheckOutModal;
