export interface CreateRoomBooking {
  name: string;
  email: string;
  check_in_time: string;
  check_out_time: string;
  discount_amount: number;
  tax_amount: number;
  paid_amount: number;
  total_occupancy: number;
  booking_rooms: BookingRooms[];
}

export interface BookingRooms {
  room_id: number;
  quantity: number;
}

export interface AllRoomBookingList {
  id: number;
  user_id: number;
  name: string;
  photo: any | null;
  email: string;
  check_in_time: string;
  check_out_time: string;
  number_of_nights: number;
  total_occupancy: number;
  status: string;

  booking_no: string;
  check_in_id: number | null;

  extra_charge: number | null;
  grand_total: number | null;
  pay_status: number | null;

  check_in_out_status: string;

  due: number | null;
  room_booking_inv_id: number;
  reserved_room: number | null;
  created_by_id: number;
  created_by_name: string;
}

export interface RoomBookingList {
  id: number;
  user_id: number;
  name: string;
  photo: any | null;
  email: string;
  check_in_time: string;
  check_out_time: string;
  number_of_nights: number;
  total_occupancy: number;
  status: string;
  check_in_out_status: string | null;

  booking_no: string;
}
export interface IMemberParams {
  skip: number;
  limit: number;
  name?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
  filter?: string;
}

export interface SingleRoomBookingData {
  id: number;
  hotel_id: number;
  user_id: number;
  name: string;
  photo?: any | null;
  email: string;
  check_in_time: string;
  check_out_time: string;
  number_of_nights: number;
  total_occupancy: number;
  grand_total: number;
  status: string;
  created_at: string;
  updated_at: string;
  extra_charge: string;
  nid_no: null;
  passport_no: string;
  booking_no: string;
  created_by_name: string;
  extend_nights: number;
  total_extended_nights: number;

  check_in_out_status: string;
  booking_rooms: SingleBookingRooms[];
}

export interface SingleBookingRooms {
  id: number;
  room_id: number;
  bed_type: string;
  room_type: string;
  room_number: number;
}

export interface ICreateCheckIn {
  booking_id: number;
  check_in: string;
  hall_booking_id: number;
}
export interface ICreateCheckOut {
  check_out: string;
}

export interface IViewCheckInAndCheckOut {
  id: number;
  guest_name: string;
  booking_id: number;
  booking_no: string;
  check_in: string;
  check_out: string;
  created_at: string;
  status: string;

  name: string;
  hall_booking_id: number;
}
