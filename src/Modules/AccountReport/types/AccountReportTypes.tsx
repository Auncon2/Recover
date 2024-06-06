export interface IViewAccountReport {
  account_name: string;
  bank: string;
  details: string;
  ac_tr_cash_in: string;
  ac_tr_cash_out: string;
  ledger_balance: string;
}
export interface AccountReportParam {
  from_date: string;
  to_date: string;
  name: string;
  limit: number;
  skip: number;
}
