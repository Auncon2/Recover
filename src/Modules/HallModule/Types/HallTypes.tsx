export interface ICreateHall {
  name: string;
  capacity: string;
  size: string;
  location: string;
  rate_per_hour: string;
  hall_amenities: string;
  photo: File;
}

export interface IViewHall {
  id: number;
  name: string;
  hall_size: number;
  rate_per_hour: number;
  capacity: number;
  location: string;
  hall_status: string;
  created_at: string;
  hall_id: number;
}

export interface IViewSingleHall {
  hall_id: number;
  hotel_id: number;
  name: string;
  capacity: number;
  location: string;
  hall_status: string;
  hall_size: number;
  rate_per_hour: number;
  created_at: string;
  hall_images: [
    {
      id: number;
      photo: string;
    }
  ];
  hall_amenities: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface ICreateHallParams {
  key?: string;
  hall_status?: string;
}
