import { useState } from "react";
import { useGeAmountReportDahsboardListQuery } from "../../../api/DashboardEndPoint";

import CommonDashboardHallBookingReport from "../CommonDashboardHallBookingReport";
import { Card } from "antd";

const DailyDashboardHallBookingReport = () => {
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero indexed, so we add 1
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const currentDate = getCurrentDate();

  const [filterValue, _setFilterValue] = useState<any>({
    from_date: currentDate,
    to_date: currentDate,
  });
  const { data } = useGeAmountReportDahsboardListQuery(filterValue);

  return (
    <Card>
      {/* <span className="font-bold mb-4">Hall Booking Report</span> */}
      <CommonDashboardHallBookingReport data={data} />
    </Card>
  );
};

export default DailyDashboardHallBookingReport;
