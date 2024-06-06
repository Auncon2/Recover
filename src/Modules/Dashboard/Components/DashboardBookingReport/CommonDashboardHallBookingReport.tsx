import { Tag, theme } from "antd";
import { globalTheme } from "../../../../app/slice/themeSlice";
import { useAppSelector } from "../../../../app/store/store";

const CommonDashboardHallBookingReport = ({ data }: any) => {
  const themeGlobal = useAppSelector(globalTheme);
  return (
    <div
      className={
        themeGlobal.theme === theme.defaultAlgorithm
          ? "flex flex-col gap-2 text-slate-500"
          : "flex flex-col gap-2 text-slate-200"
      }
    >
      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row  justify-between border-b border-b-slate-200 pb-2  font-bold"
            : "flex flex-col md:flex-row  justify-between border-b border-b-slate-600 pb-2  "
        }
      >
        <span>Total Confimed Booking</span>
        <Tag color="green">{data?.data?.total_confimed_hall_booking}</Tag>
      </div>
      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row  justify-between border-b border-b-slate-200 pb-2  font-bold"
            : "flex flex-col md:flex-row  justify-between border-b border-b-slate-600 pb-2  "
        }
      >
        <span>Total Pending Booking</span>
        <Tag color="orange">{data?.data?.total_pending_hall_booking}</Tag>
      </div>

      <div
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? "flex flex-col md:flex-row  justify-between pb-2  font-bold"
            : "flex flex-col md:flex-row  justify-between  pb-2  "
        }
      >
        <span>Total Canceled Booking</span>
        <Tag color="red">{data?.data?.total_canceled_hall_booking}</Tag>
      </div>
    </div>
  );
};

export default CommonDashboardHallBookingReport;
