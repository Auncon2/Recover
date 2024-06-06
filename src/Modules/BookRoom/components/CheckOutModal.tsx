import { Col, DatePicker, Form, Modal } from "antd";
import dayjs from "dayjs";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { DatePickerProps } from "antd/lib";
import { useCreateCheckOutMutation } from "../api/RoomBookingEndPoints";
import { useEffect } from "react";
import moment from "moment";

const CheckOutModal = ({ updateData, setIsModalOpen, isModalOpen }: any) => {
  const [CheckOut, { isSuccess, data }] = useCreateCheckOutMutation();
  console.log("response", data);
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

    CheckOut({ id: updateData, data: bookingCheckOut });
  };
  useEffect(() => {
    if (isSuccess) {
      handleCancel();
    }
  }, [isSuccess]);
  function disabledDate(current: any) {
    // Disable dates before today
    return current && current < moment().startOf("day");
  }

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
            <Form.Item label="Check Out" name="check_out">
              {/* <DatePicker onChange={onChange} style={{ width: "450px" }} /> */}
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
          <SubmitButton />
        </Form>
      </Modal>
    </>
  );
};

export default CheckOutModal;
