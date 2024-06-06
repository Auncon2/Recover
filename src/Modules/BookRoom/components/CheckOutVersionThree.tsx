import { Button, Col, Form, Popconfirm, message } from "antd";
import dayjs from "dayjs";

import { useCreateCheckOutMutation } from "../api/RoomBookingEndPoints";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBookingDuePaymnet } from "../../../app/slice/reservationSlice";

interface ICreateCheckOutResponse {
  success: boolean;
  other_due?: number; // Make other_due optional
  message: string;
  error?: {
    status: number;
    data: {
      success: boolean;
      data: {
        other_due: number;
      };
      message: string;
    };
  };

  isSuccess: any;
}

const CheckOutVersionThree = ({
  updateData,
  checkoutdate,
  GuestId,
  invoiceid,
  due,
}: any) => {
  const dispatch = useDispatch();
  const [CheckOut, { error, isSuccess }] =
    useCreateCheckOutMutation<ICreateCheckOutResponse>();
  console.log("response", error?.data?.data?.other_due);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (_values: any) => {
    if (due && Number(due) <= 0) {
      const bookingCheckOut = {
        check_out: dayjs(checkoutdate)
          .subtract(6, "hour")
          .format("YYYY-MM-DD HH:mm:ss"),
      };

      CheckOut({ id: updateData, data: bookingCheckOut });
    } else {
      navigate(`/money-receipt/add-receipt/${GuestId}/${invoiceid}/room`);
      dispatch(
        setBookingDuePaymnet({
          guestid: GuestId,
          invoiceid: invoiceid,
          type: "room",
        })
      );
    }
  };

  useEffect(() => {
    if (error?.data?.data?.other_due === 1) {
      navigate(`/money-receipt/add-receipt/${GuestId}/money-receipt/room`);
      dispatch(
        setBookingDuePaymnet({
          guestid: GuestId,
          invoiceid: "money-receipt",
          type: "room",
        })
      );
    }
  }, [form, error]);
  useEffect(() => {
    if (isSuccess) {
      message.success("Checked Out Successfully");
    }
  }, [isSuccess]);

  return (
    <>
      <Form onFinish={onFinish} layout="vertical" form={form}>
        {due && Number(due) > 0 ? (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Button
              size="small"
              style={{
                backgroundColor: "#ff7733",
                color: "white",
                borderRadius: "50px",

                width: "100%",
                fontSize: "small",
              }}
              htmlType="submit"
            >
              Pay Due
            </Button>
          </Col>
        ) : (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Popconfirm
              title="Make Check Out"
              description="Are you sure to make check out?"
              onConfirm={() => {
                form.submit(); // Submit the form to trigger onFinish
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                size="small"
                // icon={<EditOutlined />}
                style={{
                  backgroundColor: "#33cc00",
                  color: "white",
                  borderRadius: "50px",
                  // width: "160px",
                  width: "100%",
                  fontSize: "small",
                }}
                // htmlType="submit"
              >
                Make Check Out
              </Button>
            </Popconfirm>
          </Col>
        )}
      </Form>
    </>
  );
};

export default CheckOutVersionThree;
