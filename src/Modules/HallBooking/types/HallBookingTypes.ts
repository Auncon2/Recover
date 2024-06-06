export interface ICreateHallBooking {
  name: string;
  email: string;
  start_time: string;
  end_time: string;
  booking_date: string;
  event_date: string;
  discount_amount: number;
  tax_amount: number;
  payment_type: string;
  ac_tr_ac_id: number;
  paid_amount: number;
  total_occupancy: number;
  extra_charge: number;
  booking_halls: [{ hall_id: number }];
}

export interface ICreateHallBookingList {
  id: number;
  booking_no: string;
  client_name: string;
  client_mail: string;
  client_photo: File;
  event_date: string;
  start_time: string;
  end_time: string;
  number_of_hours: number;
  total_occupancy: number;
  grand_total: number;
  booking_status: string;
  booking_date: string;

  user_id: number;
  hall_checkin_id: number;

  extra_charge: number;

  check_in_out_status: string;
  hall_booking_inv_id: number;
}

export interface ISingleHallBookingDetails {
  id: number;
  hotel_id: number;
  user_id: number;
  name: string;
  photo: File;
  email: string;
  booking_no: string;
  start_time: string;
  end_time: string;
  booking_date: string;
  event_date: string;
  number_of_hours: number;
  total_occupancy: number;
  grand_total: number;
  booking_status: string;
  created_at: string;
  updated_at: string;
  extra_charge?: string;
  booking_halls: IHallBookingListHistory[];
}

export interface IHallBookingListHistory {
  id: number;
  hall_id: number;
  hall_name: string;
  hall_size: number;
  hall_status: string;
  hall_location: string;
  rate_per_hour: number;
  guest_capacity: number;
}
