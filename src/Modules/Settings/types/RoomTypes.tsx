export interface ICreateRoomTypes {
  room_type: string;
}

export interface IViewRoomTypes {
  id: number;
  room_type: string;
}

export interface ICreateBedTypes {
  bed_type: string;
}

export interface IViewBedTypes {
  id: number;
  bed_type: string;
}

export interface ICreateAmenites {
  room_amenities: string;
}

export interface IViewAmenitiesType {
  id: number;
  room_amenities: string;
}

export interface ICreateDepartment {
  name: string;
}

export interface IDepartmentType {
  id: number;
  department_name: string;
}
export interface ICreateDesignation {
  name: string;
}

export interface IDesignationType {
  id: number;
  designation_name: string;
}

export interface ICreatePayrollMonthAndSalary {
  name: string;
  hours: number;
}

export interface IPayrollMonthAndSalaryType {
  id: number;
  month_name: string;
  hours: number;
}
