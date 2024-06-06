export interface IViewDashboard {
  success: boolean;
  data: IViewDashboardList;
}

export interface IViewDashboardList {
  total_room: number;
  total_expense: number;
  total_advance_payment_fm_guest: string;
  total_invoice: number;
  due_invoice_amount: string;
}

export interface IAmountReportViewDashboard {
  success: boolean;
  data: IAmountReportViewDashboardList;
}

export interface IAmountReportViewDashboardList {
  roomBookingAmount: number;
  hallBookingAmount: number;
  totalDueAmount: number;
  totalExpense: number;
  SalaryExpense: number;
  availableAmount: number;
}

export interface IAccountReportViewDashboard {
  success: boolean;

  total: number;
  totalDebitAmount: number;
  totalCreditAmount: number;
  totalRemainingAmount: number;
}
