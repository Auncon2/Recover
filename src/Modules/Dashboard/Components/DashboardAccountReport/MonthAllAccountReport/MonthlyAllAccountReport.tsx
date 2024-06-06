import { Card, Collapse } from "antd";
import type { CollapseProps } from "antd";

import MonthlyAllBankAccountReport from "./MonthlyAllBankAccountReport";
import MonthlyAllCashAccountReport from "./MonthlyAllCashAccountReport";
import MonthlyAllChequeAccountReport from "./MonthlyAllChequeAccountReport";
import MonthlyAllMobileBankingAccountReport from "./MonthlyAllMobileBankingAccountReport";
import { FaBuildingColumns } from "react-icons/fa6";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "../../../../../auth/pages/LoginDesign.css";

const MonthlyAllAccountReport = () => {
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
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <span className="font-bold mb-4">Bank</span>,
      children: <MonthlyAllBankAccountReport />,
    },
    {
      key: "2",
      label: <span className="font-bold mb-4">Cash</span>,
      children: <MonthlyAllCashAccountReport />,
    },
    {
      key: "3",
      label: <span className="font-bold mb-4">Cheque</span>,
      children: <MonthlyAllChequeAccountReport />,
    },
    {
      key: "4",
      label: <span className="font-bold mb-4">Mobile Banking</span>,
      children: <MonthlyAllMobileBankingAccountReport />,
    },
  ];
  return (
    <Card
      bordered={false}
      style={{
        width: "100%",
        marginTop: "5px",
        boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.1)",
        // height: "300px",
        overflow: "auto",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundImage: "linear-gradient(to right,#09a5a5, #06cece)",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <FaBuildingColumns style={{ fontSize: 25, color: "white" }} />
        </div>

        <div className="grid">
          <span className="text-[#0f9b9d] text-xl font-bold basic-regular ">
            MONTHLY All ACCOUNT REPORT
          </span>
          <span className="font-bold text-teal-500 basic-regular">
            {dayjs(dates?.firstDate).format("MMM DD, YYYY")} to{" "}
            {dayjs(dates?.lastDate).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>

      {/* <DailyDashboardRoomBookingReport />
      <DailyDashboardHallBookingReport /> */}
      <Collapse defaultActiveKey={["1"]} accordion ghost items={items} />
    </Card>
  );
};

export default MonthlyAllAccountReport;
