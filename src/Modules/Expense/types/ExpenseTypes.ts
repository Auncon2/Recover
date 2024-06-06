export interface ICreateExpenseHead {
  name: string;
}
export interface IExpenseHeadlist {
  id: number;
  name: string;
  hotel_id: number;
}
export interface IExpenselist {
  expense_head: string;

  id: number;
  name: string;
  remarks: string;
  total: number;

  expense_items: IViewExpenseItem[];

  voucher_no: string;
  account_id: number;
  expense_date: string;
  expense_name: string;
  account_name: string;
  ac_type: string;
  expense_amount: number;
  created_at: string;
}

export interface ICreateExpense {
  id: number;
  account_id: number;
  expense_date: string;
  expense_head: string;
  expense_name: string;
  account_name: string;
  ac_type: string;
  expense_amount: number;
  created_at: string;
}

export interface IExpenseSingle {
  id: number;
  hotel_id: number;
  hotel_name: string;
  hotel_address: string;
  hotel_email: string;
  hotel_phone: string;
  hotel_website: string;
  hotel_logo: string;
  expense_name: string;
  account_name: string;
  account_number: string;
  ac_type: string;
  expense_date: string;
  bank_name: string;
  branch: string;
  total_cost: number;
  expense_details: string;
  expense_created_at: string;
  voucher_no: string;
  expense_items: IViewExpenseItem[];
}

export interface IViewExpenseItem {
  id: number;
  amount: number;
  expense_head: string;
}
