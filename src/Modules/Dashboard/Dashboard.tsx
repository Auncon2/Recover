import { Col } from "antd";

import AmountData from "./Components/AmountData";
import AmountReportMonthly from "./Components/AmountReportMonthly";
import AmountReportYearly from "./Components/AmountReportYearly";
import DailyAllAccountReport from "./Components/DashboardAccountReport/DailyAllAccountReport/DailyAllAccountReport";
import MonthlyAllAccountReport from "./Components/DashboardAccountReport/MonthAllAccountReport/MonthlyAllAccountReport";
import YearlyAllAccountReport from "./Components/DashboardAccountReport/YearlyAllMonthReport/YearlyAllAccountReport";
import DailyDashboardBookingReport from "./Components/DashboardBookingReport/DailyDashboardBookingReport/DailyDashboardBookingReport";
import WeeklyDashBoardBookingReport from "./Components/DashboardBookingReport/WeeklyDashBoardBookingReport/WeeklyDashBoardBookingReport";
import YearlyDashBoardBookingReport from "./Components/DashboardBookingReport/YearlyDashBoardBookingReport/YearlyDashBoardBookingReport";
import DashBoardWelCome from "./Components/DashBoardWelCome";
import TopCard from "./Components/TopCard";

const Dashboard = () => {
  return (
    <>
      <TopCard />

      {/* <ChartData /> */}

      <DashBoardWelCome />
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-4">
        <Col xs={24} md={24}>
          <DailyDashboardBookingReport />
        </Col>
        <Col xs={24} md={24}>
          <WeeklyDashBoardBookingReport />
        </Col>
        <Col xs={24} md={24}>
          <YearlyDashBoardBookingReport />
        </Col>

        <Col xs={24} md={24}>
          <AmountData />
        </Col>
        <Col xs={24} md={24}>
          <AmountReportMonthly />
        </Col>
        <Col xs={24} md={24}>
          <AmountReportYearly />
        </Col>

        <Col xs={24} md={24}>
          <MonthlyAllAccountReport />
        </Col>
        <Col xs={24} md={24}>
          <YearlyAllAccountReport />
        </Col>
        <Col xs={24} md={24}>
          <DailyAllAccountReport />
        </Col>
      </div>
    </>
  );
};

export default Dashboard;
