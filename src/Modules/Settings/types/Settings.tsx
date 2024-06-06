export interface GetaSingleHotel {
  data: {
    id: number;
    name: string;
    city: string;
    country: string;
    description: string;
    phone: string;
    map_url: string;
    website: string;
    email: string;
    address: string;
    logo: string;
    founded_year: string;
    zip_code: number;
    postal_code: number;
    group: string;
    status: string;
    hotel_images: GetaHotelImages[] | null;
    hotel_amnities: GetaHotelAmnities[] | null;
  };
}

export interface GetaHotelImages {
  id: number;
  photo: any | null;
}
export interface GetaHotelAmnities {
  id: number;
  name: string | null;
}

export interface IHotelProfileUpdate {
  name: string;
  logo?: any;
  city: string;
  country: string;
  group: string;
  address: string;
  phone: string;
  map_url: string;
  website: string;
  description: string;
  founded_year: string;
  zip_code: string;
  postal_code: string;
  photo?: any[];
  remove_photo: number[];
  hotel_amnities: string[];
  remove_amnities: number[];
}
