import { useState } from "react";
import { useGeAllAccountReportDahsboardListQuery } from "../../../api/DashboardEndPoint";
import CommonAccountReport from "../CommonAccountReport";
import { Card } from "antd";

const DailyAllMobileBankingAccountReport = () => {
  // function getCurrentDate() {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero indexed, so we add 1
  //   const day = String(today.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // }

  // const currentDate = getCurrentDate();

  const [filterValue, _setFilterValue] = useState<any>({
    // from_date: currentDate,
    // to_date: currentDate,
    ac_type: "mobile-banking",
  });
  const { data } = useGeAllAccountReportDahsboardListQuery(filterValue);
  return (
    <Card>
      <CommonAccountReport data={data} />
    </Card>
  );
};

export default DailyAllMobileBankingAccountReport;
