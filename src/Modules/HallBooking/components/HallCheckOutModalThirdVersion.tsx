import { Button, Form, Popconfirm, message } from "antd";

import { useEffect } from "react";
import { useCreateHallCheckOutMutation } from "../api/HallBookingEndPoints";
import { useNavigate } from "react-router-dom";
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
  isLoading: any;
}
const HallCheckOutModalThirdVersion = ({
  updateData,
  // event_date,
  end_time,
  GuestId,
  invoiceid,
  due,
}: //   end_time,
any) => {
  const [CheckOut, { error, isSuccess, isLoading }] =
    useCreateHallCheckOutMutation<ICreateCheckOutResponse>();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (_values: any) => {
    if (due && Number(due) <= 0) {
      const bookingCheckOut = {
        //   check_out: dayjs(values.check_out).format("YYYY-MM-DD HH:mm:ss"),
        check_out: end_time,
      };

      CheckOut({ id: Number(updateData), data: bookingCheckOut });
    } else {
      // message.error(`The guest has due amount of ${due}`);
      navigate(`/money-receipt/add-receipt/${GuestId}/${invoiceid}/hall`);
    }
  };
  useEffect(() => {
    if (error?.data?.data?.other_due === 1) {
      navigate(`/money-receipt/add-receipt/${GuestId}/money-receipt/hall`);
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
          <Button
            size="small"
            // icon={<EditOutlined />}
            style={{
              backgroundColor: "#ff7733",
              color: "white",
              borderRadius: "50px",
              width: "160px",
              fontSize: "small",
            }}
            htmlType="submit"
            loading={isLoading}
          >
            Pay Due
          </Button>
        ) : (
          <Popconfirm
            title="Make Check Out"
            description="Are you sure to make check out?"
            onConfirm={() => {
              form.submit(); // Submit the form to trigger onFinish
            }}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ loading: isLoading }}
          >
            <Button
              size="small"
              style={{
                backgroundColor: "#33cc00",
                color: "white",
                borderRadius: "50px",
                width: "160px",
                fontSize: "small",
              }}
              // htmlType="submit"
              loading={isLoading}
            >
              Make Check Out
            </Button>
          </Popconfirm>
        )}
      </Form>
    </>
  );
};

export default HallCheckOutModalThirdVersion;
