/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAdmin {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: number;
  avatar: string;
}
export interface IAllAdmin {
  id: number;
  email: string;
  name: string;
  avatar: string;
  phone: number;
  status: number | any;

  role_id: number;
  role_name: string;
  created_at: string;
}
