import { Tag, theme } from "antd";
import { useAppSelector } from "../../../../app/store/store";
import { globalTheme } from "../../../../app/slice/themeSlice";

const CommonAccountReport = ({ data }: any) => {
  const themeGlobal = useAppSelector(globalTheme);

  return (
    <div
      className={
        themeGlobal.theme === theme.defaultAlgorithm
          ? "flex flex-col gap-2 text-slate-600"
          : "flex flex-col gap-2 text-slate-200"
      }
    >
      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row  justify-between border-b border-b-slate-200 pb-2  font-semibold"
            : "flex flex-col md:flex-row  justify-between border-b border-b-slate-600 pb-2  font-semibold"
        }
      >
        <span>Total Transaction</span>
        <Tag color="yellow">{data?.total}</Tag>
      </div>
      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row  justify-between border-b border-b-slate-200 pb-2  font-semibold"
            : "flex flex-col md:flex-row  justify-between border-b border-b-slate-600 pb-2  font-semibold"
        }
      >
        <span>Total Credit Amount</span>
        <Tag color="cyan">{data?.totalCreditAmount}</Tag>
      </div>
      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row  justify-between border-b border-b-slate-200 pb-2  font-semibold"
            : "flex flex-col md:flex-row  justify-between border-b border-b-slate-600 pb-2  font-semibold"
        }
      >
        <span>Total Debit Amount</span>
        <Tag color="red">{data?.totalDebitAmount}</Tag>
      </div>
      <div className="flex flex-col md:flex-row  justify-between  pb-2  font-semibold">
        <span>Total Remaining Amount</span>
        <Tag color="green">{data?.totalRemainingAmount}</Tag>
      </div>
    </div>
  );
};

export default CommonAccountReport;
