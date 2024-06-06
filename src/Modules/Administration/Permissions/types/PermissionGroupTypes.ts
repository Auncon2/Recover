export interface IPermissionGroup {
  id: number;
  name: string;
}
export interface IPermissionAll {
  id: number;
  permissionGroupId: number;
  name: string;
}

export interface ICreatePermissionGroup {
  name: string;
}
export interface ICreatePermission {
  permissionGroupId: number;
  name: string[];
}

export interface Permission {
  permissionId: number;
  permissionType: "read" | "write" | "create" | "update";
}

export interface IRole {
  roleId: number;
  permissions: Permission[];
}

export interface INewPermission {
  permission_id: number;
  permission_name: string;
}

export interface INewPermissionGroup {
  permissionGroupId: number;
  permissionGroupName: string;
  permissions: INewPermission[];
}

export interface IAllPermissionGroup {
  permission_group_id: number;
  permissionGroupName: string;
  permissions: IAllPermission[];
}

export interface IAllPermission {
  permission_id: number;
  permission_name: string;
  h_permission_id: number;
}
