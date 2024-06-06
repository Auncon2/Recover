import { Card } from "antd";
import { useEffect, useState } from "react";
import { useGeAmountReportDahsboardListQuery } from "../api/DashboardEndPoint";

import CommonAmmountData from "./CommonAmmountData";
import dayjs from "dayjs";
import "../../../auth/pages/LoginDesign.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { motion } from "framer-motion";
const AmountReportMonthly = () => {
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
  });
  const { data } = useGeAmountReportDahsboardListQuery(filterValue);
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card
        bordered={false}
        style={{
          width: "100%",
          marginTop: "5px",
          boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundImage: "linear-gradient(to right,#09a5a5, #06cece)",
              padding: "6px",
              borderRadius: "10px",
            }}
          >
            <RiMoneyDollarCircleLine style={{ fontSize: 30, color: "white" }} />
          </div>
          <div className="grid">
            <span className="text-[#0f9b9d] text-xl font-bold basic-regular ">
              MONTHLY PROFIT & LOSS HISTORY
            </span>
            <span className="font-bold text-teal-500 basic-regular ">
              {dayjs(dates?.firstDate).format("MMM DD, YYYY")} to{" "}
              {dayjs(dates?.lastDate).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>

        <CommonAmmountData data={data} />
      </Card>
    </motion.div>
  );
};

export default AmountReportMonthly;
