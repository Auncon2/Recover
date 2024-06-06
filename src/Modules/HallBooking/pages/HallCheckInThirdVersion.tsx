/*
Create Account
@Author Istiak Ahmed <istiak.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Popconfirm } from "antd";

import { useEffect } from "react";

import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";

import {
  useCreateHallCheckInMutation,
  useGetHallBookingSingleDetailsQuery,
} from "../api/HallBookingEndPoints";

interface CheckInSecProps {
  bookingId: number | null;

  setIsModalOpen: any;
  isModalOpen: any;
  event_date: any;
  start_time: any;
  end_time: any;
}

const HallCheckInThirdVersion: React.FC<CheckInSecProps> = ({
  bookingId,

  event_date,
  start_time,
  // end_time,
}) => {
  // const navigate = useNavigate();

  // const book: any = { status: "approved", user_id: guestValue };
  // const book: any = { booking_status: "confirmed", user_id: guestValue };

  const { data: singleRoom } = useGetHallBookingSingleDetailsQuery(
    Number(bookingId)
  );

  // console.log("asas", bookingList?.data);

  const [createCheckIn, { isSuccess, isLoading }] =
    useCreateHallCheckInMutation();

  const [form] = Form.useForm();

  const onFinish = (_values: any) => {
    const bookingCheckIn = {
      //   check_in: dayjs(event_date).format("YYYY-MM-DD HH:mm:ss"),
      // check_in: dayjs(start_time).format("HH:mm:ss"),
      check_in: start_time,
      booking_id: singleRoom?.data?.id ? singleRoom?.data?.id : 0,
      event_date: dayjs(event_date).format("YYYY-MM-DD"),
    };
    createCheckIn(bookingCheckIn);
  };

  useEffect(() => {
    if (isSuccess) {
      //   form.resetFields();
      //   handleCancel();
      // navigate(`/hall-check-in-check-out`);
    }
  }, [form, isSuccess]);

  return (
    <>
      {/* {event_date} */}
      {/* {start_time} */}

      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Popconfirm
          title="Make Check In"
          description="Are you sure to make check in?"
          onConfirm={() => {
            form.submit(); // Submit the form to trigger onFinish
          }}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ loading: isLoading }}
        >
          <Button
            size="small"
            // type="primary"
            style={{
              borderRadius: "50px",
              backgroundColor: "#01adad",
              color: "white",
              width: "160px",
            }}
            // htmlType="submit"
            loading={isLoading}
          >
            Hall Check In
          </Button>
        </Popconfirm>
      </Form>
    </>
  );
};

export default HallCheckInThirdVersion;
