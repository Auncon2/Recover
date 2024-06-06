import { Tag, theme } from "antd";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";

const CommonAmmountData = ({ data }: any) => {
  const themeGlobal = useAppSelector(globalTheme);
  return (
    <div
      className={
        themeGlobal.theme === theme.defaultAlgorithm
          ? "flex flex-col gap-2 mt-5 text-slate-600"
          : "flex flex-col gap-2 mt-5 text-slate-200"
      }
    >
      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row justify-between border-b border-b-slate-200 pb-2  font-bold"
            : "flex flex-col md:flex-row  justify-between border-b border-b-slate-600 pb-2 "
        }
      >
        <span>Room Booking Amount</span>
        <Tag color="cyan">{data?.data?.roomBookingAmount}</Tag>
      </div>
      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row  justify-between border-b border-b-slate-200 pb-2  font-bold"
            : "flex flex-col md:flex-row  justify-between border-b border-b-slate-600 pb-2 "
        }
      >
        <span>Hall Booking Amount</span>
        <Tag color="cyan">{data?.data?.hallBookingAmount}</Tag>
      </div>
      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row  justify-between border-b border-b-slate-200 pb-2  font-bold"
            : "flex flex-col md:flex-row  justify-between border-b border-b-slate-600 pb-2 "
        }
      >
        <span>Total Due Amount</span>
        <Tag color="red">{data?.data?.totalDueAmount}</Tag>
      </div>
      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row  justify-between border-b border-b-slate-200 pb-2  font-bold"
            : "flex flex-col md:flex-row  justify-between border-b border-b-slate-600 pb-2 "
        }
      >
        <span>Total Expense</span>
        <Tag color="red">{data?.data?.totalExpense}</Tag>
      </div>
      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row  justify-between border-b border-b-slate-200 pb-2  font-bold"
            : "flex flex-col md:flex-row  justify-between border-b border-b-slate-600 pb-2 "
        }
      >
        <span>Salary Expense</span>
        <Tag color="red">{data?.data?.SalaryExpense}</Tag>
      </div>

      <div className="flex flex-col md:flex-row  justify-between pb-2 text-teal-600 font-semibold">
        <span
          style={{
            color: Number(data?.data?.availableAmount) < 0 ? "red" : "green",
          }}
        >
          Available Amount
        </span>
        <Tag color={Number(data?.data?.availableAmount) < 0 ? "red" : "green"}>
          {data?.data?.availableAmount}
        </Tag>
      </div>
    </div>
  );
};

export default CommonAmmountData;
