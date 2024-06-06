import { useEffect, useState } from "react";
import CommonAccountReport from "../CommonAccountReport";
import { useGeAllAccountReportDahsboardListQuery } from "../../../api/DashboardEndPoint";
import { Card } from "antd";

const MonthlyAllCashAccountReport = () => {
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
    from_date: dates.firstDate,
    to_date: dates.lastDate,
    ac_type: "cash",
  });
  const { data } = useGeAllAccountReportDahsboardListQuery(filterValue);
  return (
    <Card>
      <CommonAccountReport data={data} />
    </Card>
  );
};

export default MonthlyAllCashAccountReport;
