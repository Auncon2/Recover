export interface IAllRole {
  id: number;
  name: string;
  createdAt: string;
}
export interface ICreateRole {
  name: string;
}

export interface INewSingleRolePermission {
  role_id: number;
  role_name: string;
  hotel_id: number;
  permission: INewSinglePermissionGroup[];
}
export interface INewSinglePermissionGroup {
  permission_group_id: number;
  permission_group_name: string;
  subModules: INewSingleSubmodule[];
}
export interface INewSingleSubmodule {
  permission_id: number;
  permission_name: string;
  permission_type: string[];

  h_permission_id: number;
}
