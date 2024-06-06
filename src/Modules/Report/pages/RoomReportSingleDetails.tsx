import dayjs from "dayjs";
import { useGetSingleReportListQuery } from "../api/ReportEndPoints";

import { useState } from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib";
import GlobalLoader from "../../../components/loader/GlobalLoader";

const RoomReportSingleDetails = ({
  id,
}: //  filter
any) => {
  const [filterValue, _setFilter] = useState({
    // from_date: dayjs(filter?.from_date).format("YYYY-MM-DD"), // Default to current date if not provided
    // to_date: dayjs(filter?.to_date).format("YYYY-MM-DD"),
  });

  const { data } = useGetSingleReportListQuery({
    id: Number(id),
    params: filterValue,
  });

  // const { data } = useGetSingleReportListQuery(Number(id));
  console.log("dataddd", data?.data);

  const columns: TableProps<any>["columns"] = [
    {
      title: "Booking ID",
      dataIndex: "booking_id",
      key: "booking_id",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Booking Number",
      dataIndex: "booking_no",
      key: "booking_no",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Guest Name",
      dataIndex: "user_name",
      key: "user_name",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Guest Email",
      dataIndex: "user_email",
      key: "user_email",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Check In Date",
      dataIndex: "check_in_time",
      key: "check_in_time",
      render: (text) => (
        <>
          {text
            ? dayjs(text).subtract(6, "hour").format("DD-MM-YYYY (hh:mm a)")
            : "N/A"}
        </>
      ),
    },
    {
      title: "Check Out Date",
      dataIndex: "check_out_time",
      key: "check_out_time",
      render: (text) => (
        <>
          {text
            ? dayjs(text).subtract(6, "hour").format("DD-MM-YYYY (hh:mm a)")
            : "N/A"}
        </>
      ),
    },
    {
      title: "Total Occupancy",
      dataIndex: "total_occupancy",
      key: "total_occupancy",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Number Of Nights",
      dataIndex: "number_of_nights",
      key: "number_of_nights",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
  ];

  return (
    <>
      {data?.data ? (
        <Table
          size="small"
          bordered={true}
          columns={columns}
          dataSource={
            data?.data && data?.data?.room_booking
              ? data?.data?.room_booking
              : ([] as any)
          }
          pagination={
            data?.data &&
            data?.data?.room_booking &&
            data?.data?.room_booking.length > 10
              ? data?.data?.room_booking.length
              : false
          }
        />
      ) : (
        <GlobalLoader />
      )}
    </>
  );
};

export default RoomReportSingleDetails;
