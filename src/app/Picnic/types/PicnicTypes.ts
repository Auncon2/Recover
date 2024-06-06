/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPicniclist {
  id: number;
  title: string;
  date: string;
  place: string;
  status: string;
}
export interface ICreatePicnic {
  title: string;
  coverPhoto: any;
  place: string;
  amount: string;
  date: string;
  details: string;
  payable: any;
}
export interface IPicnicParams {
  skip: number;
  limit: number;
  title?: string;
  from_date?: string;
  to_date?: string;
  status?: string;
}
export interface ISinglePicnic {
  id: number;
  title: string;
  place: string;
  amount: string;
  coverPhoto: string;
  date: string;
  details: string;
  createdBy: number;
  adminName: string;
  status: string;
  createdAt: string;
}
export interface ISinglePicnicJoined {
  id: number;
  qrCode: string;
  isPaid: boolean;
  status: string;
  createdAt: string;
  memberId: number;
  name: string;
  email: string;
  companyName: string;
}
