import { useState } from "react";
import { useGeAllAccountReportDahsboardListQuery } from "../../../api/DashboardEndPoint";
import CommonAccountReport from "../CommonAccountReport";
import { Card } from "antd";

export const YearlyAllBankAccountReport = () => {
  const currentDate = new Date().getFullYear();
  const FirstDate = `${currentDate}-01-01`;
  const LastDate = `${currentDate}-12-31`;
  const [filterValue, _setFilterValue] = useState<any>({
    from_date: FirstDate,
    to_date: LastDate,
    ac_type: "bank",
  });
  const { data } = useGeAllAccountReportDahsboardListQuery(filterValue);
  return (
    <Card>
      <CommonAccountReport data={data} />
    </Card>
  );
};
