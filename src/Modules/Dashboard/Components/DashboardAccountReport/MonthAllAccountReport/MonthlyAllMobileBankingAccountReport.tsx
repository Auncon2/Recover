import { useEffect, useState } from "react";
import { useGeAllAccountReportDahsboardListQuery } from "../../../api/DashboardEndPoint";
import CommonAccountReport from "../CommonAccountReport";

const MonthlyAllMobileBankingAccountReport = () => {
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
    ac_type: "mobile-banking ",
  });
  const { data } = useGeAllAccountReportDahsboardListQuery(filterValue);
  return (
    <div className="grid border py-3 px-5  rounded-lg">
      <CommonAccountReport data={data} />
    </div>
  );
};

export default MonthlyAllMobileBankingAccountReport;
