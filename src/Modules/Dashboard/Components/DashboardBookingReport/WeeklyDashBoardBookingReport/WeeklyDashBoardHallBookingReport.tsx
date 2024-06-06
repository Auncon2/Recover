import { useEffect, useState } from "react";
import { useGeAmountReportDahsboardListQuery } from "../../../api/DashboardEndPoint";
import CommonDashboardHallBookingReport from "../CommonDashboardHallBookingReport";
import { Card } from "antd";

const WeeklyDashBoardHallBookingReport = () => {
  // // Helper function to format date in YYYY-MM-DD format
  // const formatDate = (date: any) => {
  //   return date.toISOString().split("T")[0];
  // };

  // // Get current date
  // const currentDate = new Date();

  // // Get the start of the current week (Sunday)
  // const startOfWeek = new Date(currentDate);
  // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  // // Get the end of the current week (Saturday)
  // const endOfWeek = new Date(currentDate);
  // endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
  // .........................Monthly...................................

  function getFirstAndLastDateOfMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero indexed, so we add 1
    // const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    return {
      firstDate: `${year}-${String(month).padStart(2, "0")}-01`,
      lastDate: `${year}-${String(month).padStart(2, "0")}-${String(
        lastDayOfMonth.getDate()
      ).padStart(2, "0")}`,
    };
  }

  const [dates, setDates] = useState(getFirstAndLastDateOfMonth());
  useEffect(() => {
    const interval = setInterval(() => {
      setDates(getFirstAndLastDateOfMonth());
    }, 1000 * 60); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const [filterValue, _setFilterValue] = useState<any>({
    // from_date: formatDate(startOfWeek),
    // to_date: formatDate(endOfWeek),
    from_date: dates.firstDate,
    to_date: dates.lastDate,
  });
  //   console.log("filterValueccccccc", filterValue);
  const { data } = useGeAmountReportDahsboardListQuery(filterValue);
  return (
    <Card>
      <CommonDashboardHallBookingReport data={data} />
    </Card>
  );
};

export default WeeklyDashBoardHallBookingReport;
