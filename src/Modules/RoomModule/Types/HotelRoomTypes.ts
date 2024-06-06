export interface ICreateHotelRoom {
  room_number: string;
  room_type: string;
  room_size: string;
  occupancy: string;
  bed_type: string;
  rate_per_night: string;
  availability: string;
  discount_percent: string;
  description: string;
  discount: string;
  refundable_time: string;
  refundable_charge: string;
  aminities_charge: string;
  room_aminities: string;
  photo: File;
  adult: string;
  child: string;
}
export interface IUpdateHotelRoom {
  room_number: string;
  room_type: string;
  room_size: string;
  occupancy: string;
  bed_type: string;
  rate_per_night: string;
  availability: string;
  discount_percent: string;
  description: string;
  discount: string;
  refundable_time: string;
  refundable_charge: string;
  aminities_charge: string;
  room_amenities: any;
  photo: File;
  adult: string;
  child: string;
}
export interface IRoom {
  data: IVewHotelRoom[];
}
export interface IVewHotelRoom {
  room_id: number;
  id: number;
  hotel_id: number;
  room_number: string;
  room_type: string;
  room_size: string;
  occupancy: number;
  bed_type: string;
  rate_per_night: number;
  availability: number;
  discount_percent: number;
  description: number;
  created_at: string;
  updated_at: string;
  refundable: number;
  discount: number;
  refundable_time: number;
  refundable_charge: number;
  aminities_charge: number;
  room_aminities: string;
  amenities: string;
  images: string;
  child: number;
  adult: number;
  room_created_at: string;

  available_status: number;
  guest_name: string;
  guest_email: string;
  check_in_time: string;
  check_out_time: string;
  grand_total: string;
  due_amount: number;
  room_description: string;
  room_amenities: string;
  room_images: string;
  user_last_balance: number;
}

// export interface ISingleRoom {
//   data: IViewSingleRoom[];
// }

export interface ISingleRoom {
  room_id: number;
  room_number: string;
  room_type: string;
  room_size: string;
  occupancy: number;
  bed_type: string;
  rate_per_night: string;
  availability: number;
  discount_percent: string;
  tax_percent: string;
  room_description: string;
  created_at: string;
  updated_at: string;
  refundable: number;
  refundable_time: number;
  refundable_charge: string;
  aminities_charge: number;
  room_amenities: IroomAmenities[];
  child: number;
  adult?: number;
  discount: number;
  room_images: string[];
  bookingData: IbookingData[];
}

export interface IbookingData {
  booking_id: number;
  booking_no: string;
  user_id: number;
  name: string;
  photo?: File;
  status: string;
  grand_total: string;
}

export interface IroomAmenities {
  id: number;
  name: string;
}

export interface ICreateRoomParams {
  key: string;
  availability: number;
  refundable: number;
  occupancy: number;
  from_date: string;
  to_date: string;
}
