/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";

export interface HTTPResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  status?: number;
  type?: string;
  total?: number;
  totalDebitAmount?: number;
  totalCreditAmount?: number;
  totalAmount?: number;
  totalGuest?: number;
}

export type ISetState<T> = Dispatch<SetStateAction<T>>;

export type TSetNull = ISetState<any | null> | ISetState<any | null>;
