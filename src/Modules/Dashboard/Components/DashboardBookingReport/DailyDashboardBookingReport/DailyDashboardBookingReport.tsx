import { Card } from "antd";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

import DailyDashboardRoomBookingReport from "./DailyDashboardRoomBookingReport";
import DailyDashboardHallBookingReport from "./DailyDashboardHallBookingReport";

import { LuBuilding } from "react-icons/lu";
import dayjs from "dayjs";
import "../../../../../auth/pages/LoginDesign.css";
import { motion } from "framer-motion";

const DailyDashboardBookingReport = () => {
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero indexed, so we add 1
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const currentDate = getCurrentDate();
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <span className="font-bold mb-4">Room Booking Report</span>,
      children: <DailyDashboardRoomBookingReport />,
    },
    {
      key: "2",
      label: (
        <div className="flex items-baseline gap-2">
          <span className=" font-bold mb-4">Hall Booking Report</span>
        </div>
      ),
      children: <DailyDashboardHallBookingReport />,
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
          // color: "white",
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
              DAILY ROOM & HALL BOOKING REPORT
            </span>
            <span className="font-bold text-teal-500 basic-regular">
              {dayjs(currentDate).format("ddd, MMM, DD")}
            </span>
          </div>
        </div>

        <Collapse defaultActiveKey={["1"]} accordion ghost items={items} />
      </Card>
    </motion.div>
  );
};

export default DailyDashboardBookingReport;
