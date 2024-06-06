export interface IHallBookingReportAllList {
  success: boolean;
  totalAmount: string;
  total: number;
  data: IViewHallBookingReports[];
}

export interface IViewHallBookingReports {
  id: number;
  booking_no: string;
  client_name: string;
  client_mail: string;
  event_date: string;
  start_time: string;
  end_time: string;
  number_of_hours: number;
  total_occupancy: number;
  grand_total: number;
  booking_status: string;
  booking_date: string;
}

export interface HallBookingReportParams {
  from_date: string;
  to_date: string;
  key: string;
  limit: number;
  skip: number;
}
