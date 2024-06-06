export interface IVIewAllSalaryReport {
  success: boolean;
  total: number;
  totalAmount: string;
  data: IViewSalaryReport[];
}

export interface IViewSalaryReport {
  id: number;
  salary_date: string;
  employee_name: string;
  designation: string;
  account_name: string;
  basic_salary: string;
  Other_Allowance: string;
  Net_Amount: string;
  note: string;
}

export interface ISalaryReportParam {
  key: string;
  from_date: string;
  to_date: string;
  limit: number;
  skip: number;
}
