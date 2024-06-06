export interface IallMoneyReceiptList {
  id: number;
  customer_name: string;
  money_receipt_no: string;
  payment_type: string;
  total_collected_amount: string;
  created_by_admin: string;
  created_at: string;
}
export interface IMoneyReceiptParams {
  skip: number;
  limit: number;
  key: string;
  name?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
  filter?: string;
}

export interface ICreateMoneyReceipt {
  ac_tr_ac_id: number;
  user_id: number;
  paid_amount: number;
  reciept_type: string;
  remarks: string;
  invoice_id: number;
}
export interface ISingleMoneyReceiptData {
  id: number;
  customer_id: number;
  customer_name: string;
  money_receipt_no: string;
  payment_type: string;
  total_collected_amount: number;
  remarks: string;
  created_by_admin: string;
  created_at: string;
}
export interface ICreateAdvanceReturnMoneyReceiptData {
  ac_tr_ac_id: number;
  user_id: number;
  return_amount: number;
  return_date: string;
  remarks: string;
}
export interface IGetAllAdvanceReturnMoneyReceiptData {
  id: number;
  hotel_id: number;
  return_date: string;
  remarks: string;
  created_at: string;
  returned_amount: number;
  payment_type: string;
  guest_name: string;
}
export interface ISingleAdvanceReturnData {
  id: number;
  hotel_id: number;
  return_date: string;
  remarks: string;
  created_at: string;
  returned_amount: number;
  payment_type: string;
  guest_name: string;
}
export interface ParamsMoneyReceipt {
  id: number;
}
