import { ColumnsType } from "antd/lib/table";

import { IGetAllAdvanceReturnMoneyReceiptData } from "../Types/MoneyReceiptsTypes";
import dayjs from "dayjs";

export const AdvanceReturnColumn: ColumnsType<IGetAllAdvanceReturnMoneyReceiptData> =
  [
    {
      title: "Return Date",
      dataIndex: "return_date",
      key: "return_date",
      render: (text) => (
        <div className="flex gap-2">
          {text ? dayjs(text).format("DD-MM-YYYY ") : "-"}
          {/* &#40;{text ? dayjs(text).format("hh:mm A") : "-"} &#41; */}
        </div>
      ),
    },
    {
      title: "Returned Amount",
      dataIndex: "returned_amount",
      key: "returned_amount",
    },
    {
      title: "Guest Name",
      dataIndex: "guest_name",
      key: "guest_name",
    },
    {
      title: "Payment Type",
      dataIndex: "payment_type",
      key: "payment_type",
    },
    {
      title: "Payment Details",
      dataIndex: "remarks",
      key: "remarks",
    },
  ];
