export interface ICreateAccount {
  name: string;
  bank: string;
  branch: string;
  account_number: string;
  opening_balance: number;
  details: string;
}
export interface ITransferBalance {
  transfer_type: string;
  from_account: number;
  pay_amount: number;
  to_account: number;
}

export interface IViewAccountList {
  data: IViewAccount[];
}

export interface IViewAccount {
  map?: any;
  id: number;
  name: string;
  branch: string;
  account_number: string;
  opening_balance: number;
  details: string;
  bank: string;
  created_at: string;
  hotel_id: number;
  status: number;
  ac_type: string;
  salary?: any;
  available_balance: number;
}

export interface IAccountParams {
  status: number;
  key: string;
  ac_type: string;
  limit: number;
  skip: number;
  admin_id: number;
}
