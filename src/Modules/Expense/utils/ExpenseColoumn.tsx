/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnsType } from "antd/lib/table";
import { IExpenseHeadlist, IExpenselist } from "../types/ExpenseTypes";
import dayjs from "dayjs";

export const ExpenseHeadColumn: ColumnsType<IExpenseHeadlist> = [
  {
    title: "Expense Head",
    dataIndex: "name",
    key: "name",
  },
];

export const ExpenseColumn: ColumnsType<IExpenselist> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <>{text ? text : "N/A"}</>,
  },
  {
    title: "Voucher Number",
    dataIndex: "voucher_no",
    key: "voucher_no",
    render: (text) => <>{text ? text : "N/A"}</>,
  },
  {
    title: "Expense Date",
    dataIndex: "expense_date",
    key: "expense_date",
    render: (text) => (
      <div className="flex gap-1">
        <span>{dayjs(text).format("DD-MM-YYYY ")}</span>
        {/* <span>&#40;{dayjs(text).format("hh:mm A")}&#41;</span> */}
      </div>
    ),
  },
  {
    title: "Expense Name",
    dataIndex: "expense_name",
    key: "expense_name",
    render: (text) => <>{text ? text : "N/A"}</>,
  },
  {
    title: "Expense Head",
    // dataIndex: "expense_name",
    // key: "expense_name",
    render: (_text, record) => (
      <>
        {record.expense_items && record.expense_items.length > 0 && (
          <div className="flex gap-1">
            {record.expense_items.map((item, index) => (
              <span key={item.id}>
                {item.expense_head}
                {index !== record.expense_items.length - 1 && ","}
              </span>
            ))}
          </div>
        )}
      </>
    ),
  },

  {
    title: "Account Name",
    dataIndex: "account_name",
    key: "account_name",
    render: (text) => <>{text ? text : "N/A"}</>,
  },

  {
    title: "Expense By",
    dataIndex: "expense_name",
    key: "expense_name",
    render: (text) => <>{text ? text : "N/A"}</>,
  },
  {
    title: "Expense Amount",
    dataIndex: "expense_amount",
    key: "expense_amount",
    render: (text) => <>{text ? text : "N/A"}</>,
  },
];
