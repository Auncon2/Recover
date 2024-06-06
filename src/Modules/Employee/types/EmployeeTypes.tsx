export interface ICreateEmployee {
  name: string;
  photo: File;
  department_id: string;
  designation_id: string;
  blood_group: string;
  salary: string;
  email: string;
  mobile_no: string;
  birth_date: string;
  appointment_date: string;
  joining_date: string;
  address: string;
}

export interface IViewEmployee {
  id: number;
  name: string;
  email: string;
  designation_id: number;
  designation_name: string;
  department_id: number;
  department_name: string;
  status: number;
  mobile_no: string;
  joining_date: string;
  salary: string;
}

export interface IViewSingleEmployee {
  id: number;
  name: string;
  photo: string;
  department: string;
  designation: string;
  email: string;
  mobile_no: string;
  address: string;
  blood_group: string;
  salary: string;
  status: number;
  birth_date: string;
  appointment_date: string;
  joining_date: string;
  created_by: string;
  created_at: string;
  updated_at: string;

  res_name: string;
  category: string;

  dep_id: number;

  des_id: number;
  res_id: number;
  admin_id: number;
}
export interface IupdateEmployee {
  name: string;
  email: string;
  photo?: string;
  department_id: number;
  designation_id: number;
  blood_group?: string;
  salary: number;
  mobile_no: string;
  birth_date?: string;
  appointment_date?: string;
  joining_date?: string;
  status?: number;
  address?: string;
}
