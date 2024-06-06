export interface ICustomer {
  total: number;
  data: IViewCustomer[];
}

export interface IViewCustomer {
  user_id: number;
  name: string;
  email: string;
  country: string;
  city: string;
  status: string;
  created_at: string;
  id: number;

  last_balance: string;

  booking_no: string;
}

export interface ICreateGuest {
  name: string;
  email: string;
  city: string;
  country: string;
  user_type: string;
}

export interface IViewCustomerDetails {
  id: number;
  hotel_id: number;
  name: string;
  phone: string;
  email: string;
  photo: File;
  country: string;
  city: string;
  address: string;
  zip_code: string;
  postal_code: string;
  passport_no: string;
  nid_no: string;
  password: string;

  last_balance: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_type: any[];
}
