import { Card } from "antd";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

import DailyAllBankAccountReport from "./DailyAllBankAccountReport";
import DailyAllCashAccountReport from "./DailyAllCashAccountReport";
import DailyAllChequeAccountReport from "./DailyAllChequeAccountReport";
import DailyAllMobileBankingAccountReport from "./DailyAllMobileBankingAccountReport";
import { FaBuildingColumns } from "react-icons/fa6";
import "../../../../../auth/pages/LoginDesign.css";

const DailyAllAccountReport = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <span className="font-bold mb-4">Bank</span>,
      children: <DailyAllBankAccountReport />,
    },
    {
      key: "2",
      label: <span className="font-bold mb-4">Cash</span>,
      children: <DailyAllCashAccountReport />,
    },
    {
      key: "3",
      label: <span className="font-bold mb-4">Cheque</span>,
      children: <DailyAllChequeAccountReport />,
    },
    {
      key: "4",
      label: <span className="font-bold mb-4">Mobile Banking</span>,
      children: <DailyAllMobileBankingAccountReport />,
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
        <span className="text-[#0f9b9d] text-xl font-bold basic-regular ">
          All ACCOUNT REPORT
        </span>
      </div>

      {/* <DailyDashboardRoomBookingReport />
      <DailyDashboardHallBookingReport /> */}
      <Collapse defaultActiveKey={["1"]} accordion ghost items={items} />
    </Card>
  );
};

export default DailyAllAccountReport;
