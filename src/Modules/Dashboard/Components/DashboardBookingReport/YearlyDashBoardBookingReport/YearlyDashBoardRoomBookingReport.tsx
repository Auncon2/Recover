import { useState } from "react";
import { useGeAmountReportDahsboardListQuery } from "../../../api/DashboardEndPoint";
import CommonDashboardBookingReport from "../CommonDashboardBookingReport";
import { Card } from "antd";

const YearlyDashBoardRoomBookingReport = () => {
  const currentDate = new Date().getFullYear();
  const FirstDate = `${currentDate}-01-01`;
  const LastDate = `${currentDate}-12-31`;
  const [filterValue, _setFilterValue] = useState<any>({
    from_date: FirstDate,
    to_date: LastDate,
  });
  const { data } = useGeAmountReportDahsboardListQuery(filterValue);
  return (
    <Card>
      <CommonDashboardBookingReport data={data} />
    </Card>
  );
};

export default YearlyDashBoardRoomBookingReport;
