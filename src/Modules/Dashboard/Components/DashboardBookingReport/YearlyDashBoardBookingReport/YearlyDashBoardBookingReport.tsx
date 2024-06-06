import { Card } from "antd";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import YearlyDashBoardHallBookingReport from "./YearlyDashBoardHallBookingReport";
import YearlyDashBoardRoomBookingReport from "./YearlyDashBoardRoomBookingReport";

import { LuBuilding } from "react-icons/lu";
import dayjs from "dayjs";
import "../../../../../auth/pages/LoginDesign.css";
import { motion } from "framer-motion";

const YearlyDashBoardBookingReport = () => {
  const currentDate = new Date().getFullYear();
  const FirstDate = `${currentDate}-01-01`;
  const LastDate = `${currentDate}-12-31`;
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <span className="font-bold mb-4">Room Booking Report</span>,
      children: <YearlyDashBoardRoomBookingReport />,
    },
    {
      key: "2",
      label: (
        <div className="flex items-baseline gap-2">
          <span className=" font-bold mb-4">Hall Booking Report</span>
        </div>
      ),
      children: <YearlyDashBoardHallBookingReport />,
    },
  ];
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card
        bordered={false}
        style={{
          // background: "linear-gradient(to right, #bd7ff9, #0f9b9d)",
          color: "white",
          width: "100%",
          // marginTop: "5px",
          boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.1)",
          // height: "320px",
          overflow: "auto",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundImage: "linear-gradient(to right,#09a5a5, #06cece)",
              padding: "8px",
              borderRadius: "10px",
            }}
          >
            <LuBuilding style={{ fontSize: 30, color: "white" }} />
          </div>

          <div className="grid">
            <span className="text-[#0f9b9d] text-xl font-bold basic-regular">
              YEARLY ROOM & HALL BOOKING REPORT
            </span>
            <span className="font-bold text-teal-500 basic-regular">
              {dayjs(FirstDate).format("MMM DD, YYYY")} to{" "}
              {dayjs(LastDate).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>

        <Collapse defaultActiveKey={["1"]} accordion ghost items={items} />
      </Card>
    </motion.div>
  );
};

export default YearlyDashBoardBookingReport;
