export interface ICreatePayroll {
  employee_id: string;
  ac_tr_ac_id: string;
  attendance_days: string;
  deduction_amount: string;
  deduction_reason: string;
  advance_salary: string;
  provident_fund: string;
  mobile_bill: string;
  feed_allowance: string;
  perform_bonus: string;
  festival_bonus: string;
  travel_allowance: string;
  health_allowance: string;
  incentive: string;
  house_rent: string;
  salary_date: string;
  gross_salary: string;
  total_salary: string;
  docs: string;
  note: string;
}

export interface IVIewPayroll {
  id: number;
  voucher_no: string;
  employee_name: string;
  designation: string;
  pay_method: string;
  account_name: string;
  base_salary: string;
  attendance_days: number;
  gross_salary: string;
  total_salary: string;
  salary_date: string;
}
