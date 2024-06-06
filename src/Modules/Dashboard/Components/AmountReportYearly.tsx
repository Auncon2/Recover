import { Card } from "antd";
import { useGeAmountReportDahsboardListQuery } from "../api/DashboardEndPoint";
import { useState } from "react";
import CommonAmmountData from "./CommonAmmountData";

import dayjs from "dayjs";
import "../../../auth/pages/LoginDesign.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { motion } from "framer-motion";

const AmountReportYearly = () => {
  const currentDate = new Date().getFullYear();
  const FirstDate = `${currentDate}-01-01`;
  const LastDate = `${currentDate}-12-31`;
  const [filterValue, _setFilterValue] = useState<any>({
    from_date: FirstDate,
    to_date: LastDate,
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
            <span className="text-[#0f9b9d] text-xl font-bold basic-regular">
              YEARLY PROFIT & LOSS HISTORY
            </span>
            <span className="font-bold text-teal-500 basic-regular">
              {dayjs(FirstDate).format("MMM DD, YYYY")} to{" "}
              {dayjs(LastDate).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>

        <CommonAmmountData data={data} />
      </Card>
    </motion.div>
  );
};

export default AmountReportYearly;
