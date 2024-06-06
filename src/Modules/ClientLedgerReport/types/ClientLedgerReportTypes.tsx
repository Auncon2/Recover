// export interface IBookingReport {
//   totalGuest: number;
//   totalAmount: number;
//   total: number;
//   data: IViewBookingReport[];
// }

export interface IViewClientLedgerReport {
  id: number;
  hotel_id: number;
  name: string;
  user_name: string;
  pay_type: string;
  amount: string;
  last_balance: string;
  created_at: string;
}
export interface ClientLedgerReportParam {
  from_date: string;
  to_date: string;
  limit: number;
  skip: number;
  user_id: number | string;
  pay_type: string;
}
