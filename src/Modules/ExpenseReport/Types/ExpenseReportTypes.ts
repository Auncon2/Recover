export interface IExpenseReportAllList {
  success: boolean;
  totalAmount: number;
  total: number;
  data: IExpenseReportList[];
}

export interface IExpenseReportList {
  expense_date: string;
  expense_head: string;
  expense_name: string;
  account_name: string;
  ac_type: string;
  expense_amount: number;
  created_by: string;
  created_at: string;
}

export interface ExpenseReportParams {
  from_date: string;
  to_date: string;
  key: string;
  limit: number;
  skip: number;
}
