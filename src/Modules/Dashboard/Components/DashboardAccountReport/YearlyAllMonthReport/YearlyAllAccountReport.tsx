import { Card, Collapse } from "antd";
import type { CollapseProps } from "antd";

import { YearlyAllBankAccountReport } from "./YearlyAllBankAccountReport";
import YearlyAllCashAccountReport from "./YearlyAllCashAccountReport";
import YearlyAllChequeAccountReport from "./YearlyAllChequeAccountReport";
import YearlyAllMobileBankingAccountReport from "./YearlyAllMobileBankingAccountReport";
import { FaBuildingColumns } from "react-icons/fa6";
import dayjs from "dayjs";
import "../../../../../auth/pages/LoginDesign.css";

const YearlyAllAccountReport = () => {
  const currentDate = new Date().getFullYear();
  const FirstDate = `${currentDate}-01-01`;
  const LastDate = `${currentDate}-12-31`;
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <span className="font-bold mb-4">Bank</span>,
      children: <YearlyAllBankAccountReport />,
    },
    {
      key: "2",
      label: <span className="font-bold mb-4">Cash</span>,
      children: <YearlyAllCashAccountReport />,
    },
    {
      key: "3",
      label: <span className="font-bold mb-4">Cheque</span>,
      children: <YearlyAllChequeAccountReport />,
    },
    {
      key: "4",
      label: <span className="font-bold mb-4">Mobile Banking</span>,
      children: <YearlyAllMobileBankingAccountReport />,
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
          <span className="text-[#0f9b9d] text-xl font-bold basic-regular">
            YEARLY All ACCOUNT REPORT
          </span>
          <span className="font-bold text-teal-500 basic-regular">
            {dayjs(FirstDate).format("MMM DD, YYYY")} to{" "}
            {dayjs(LastDate).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>

      <Collapse defaultActiveKey={["1"]} accordion ghost items={items} />
    </Card>
  );
};

export default YearlyAllAccountReport;
