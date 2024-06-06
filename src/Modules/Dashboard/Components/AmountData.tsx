import { Card } from "antd";
import { useState } from "react";
import { useGeAmountReportDahsboardListQuery } from "../api/DashboardEndPoint";

import CommonAmmountData from "./CommonAmmountData";
import dayjs from "dayjs";
import "../../../auth/pages/LoginDesign.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { motion } from "framer-motion";
const AmountData = () => {
  // ...........................Daily.............................

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
          //   display: "flex",
          //   flexDirection: "column",
          //   gap: "30px",
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
              DAILY PROFIT & LOSS HISTORY
            </span>
            <span className="font-bold text-teal-500 basic-regular">
              {dayjs(currentDate).format("ddd, MMM, DD")}
            </span>
          </div>
        </div>

        <CommonAmmountData data={data} />
      </Card>
    </motion.div>
  );
};

export default AmountData;
