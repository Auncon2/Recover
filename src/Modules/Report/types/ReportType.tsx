export interface IReport {
  total_available_room: number;
  total: number;
  data: IViewReport[];
}

export interface IViewReport {
  id: number;
  room_number: string;
  room_type: string;
  bed_type: string;
  refundable: number;
  rate_per_night: string;
  discount_percent: string;
  available_status: number;
  room_created_at: string;
}

export interface ReportParam {
  from_date: string;
  to_date: string;

  limit: number;
  skip: number;
}
