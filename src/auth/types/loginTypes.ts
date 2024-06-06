// export interface IUser {
//   id: number;
//   name: string;
//   logo: any | null;
//   status: string | null;
//   city: string;
//   country: string;
//   description: string;
//   phone: string;
//   map_url: string | null;
//   website: string | null;
//   email: string;
//   founded_year: string;
//   zip_code: number;
//   postal_code: number;
//   group: any;
//   hotel_images: [
//     {
//       id: number;
//       photo: any | null;
//     }
//   ];
// }

export interface IProfile {
  hotel_id: number;
  id: number;
  email: string;
  name: string;
  avatar: string;
  phone: string;
  status: number;
  role_id: string;
  role_name: string;
  created_at: string;
  authorization: IAuthorization[];
}

export interface IUser {
  hotel_id: number;
  id: number;
  email: string;
  name: string;
  avatar: string | null;
  phone: string | null;
  status: number;
  role_id: number;
  role_name: string;
  created_at: string;

  // authorization: {
  //   permission_group_id: number;
  //   permission_group_name: string;
  //   subModules: {
  //     permission_id: number;
  //     permission_name: string;
  //     permission_type: string[];
  //   }[];
  // }[];
  authorization: IAuthorization[];
}
export interface IAuthorization {
  permission_group_id: number;
  permission_group_name: string;
  subModules: IsubModules[];
}
export interface IsubModules {
  permission_id: number;
  permission_name: string;
  permission_type: string[];
}
export interface ILoginResponse<T> {
  success: boolean;
  data?: T;
  token?: string;
  message?: string;
  type?: string;
  status?: number;
}

export interface IOTP {
  message: string;
  success: boolean;
  token: string;
}
