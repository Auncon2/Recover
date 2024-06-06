export interface IBookingReport {
  totalGuest: number;
  totalAmount: number;
  total: number;
  data: IViewBookingReport[];
}

export interface IViewBookingReport {
  room_booking_id: number;
  user_id: number;
  name: string;
  email: string;
  check_in_time: string;
  check_out_time: string;
  number_of_nights: number;
  created_at: string;
  total_occupancy: number;
  grand_total: string;
  id: number;

  extra_charge: number;

  pay_status: number;
  reserved_room: number;
  status: string;
  check_in_out_status: string;
}
export interface BookingReportParam {
  from_date: string;
  to_date: string;
  limit: number;
  skip: number;
  room_id: number | string;
  pay_status: number | string;
}
