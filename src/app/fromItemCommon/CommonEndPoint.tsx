/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */

// import { ACCOUNT } from '../../Modules/Account/api/constant';
import { PERMESSION } from "../../Modules/Administration/Permissions/api/constant";
import { ROLE } from "../../Modules/Administration/Role/api/constant";
// import { INVOICE } from '../../Modules/Invoice/api/constant';
// import { MEMBER } from '../../Modules/Members/api/constant';
import { api } from "../api/userApi/api";
import { HTTPResponse } from "../utils/commonTypes";

export const CommonEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getCommonMember: build.query<HTTPResponse<any>, void>({
      query: () => {
        return {
          url: `/admin/member`,
        };
      },
      providesTags: () => [{ type: "Member", id: "MEMBER" }],
    }),
    getCommonAccount: build.query<HTTPResponse<any>, void>({
      query: () => {
        return {
          url: `/admin/accounts`,
        };
      },
      providesTags: () => [{ type: "Account", id: "ACCOUNT" }],
    }),
    getCommonInvoice: build.query<HTTPResponse<any>, void>({
      query: () => {
        return {
          url: `/admin/invoice`,
        };
      },
      providesTags: () => [{ type: "Invoice", id: "INVOICE" }],
    }),
    getCommonInvoiceItem: build.query<HTTPResponse<any>, void>({
      query: () => {
        return {
          url: `/admin/invoice-head`,
        };
      },
      providesTags: () => [{ type: "Invoice", id: "INVOICE" }],
    }),
    getCommonMemberforNotice: build.query<
      HTTPResponse<any>,
      { status: string }
    >({
      query: ({ status }) => {
        return {
          url: `/admin/member?status=${status}`,
        };
      },
      providesTags: () => [{ type: "Member", id: "MEMBER" }],
    }),

    getCommonPermission: build.query<HTTPResponse<any>, void>({
      query: () => {
        return {
          url: `/admin/administration/permission`,
        };
      },
      providesTags: () => [{ type: "Permession", id: PERMESSION }],
    }),

    getCommonRole: build.query<HTTPResponse<any>, void>({
      query: () => {
        return {
          url: `/reservation/administration/role`,
        };
      },
      providesTags: () => [{ type: "Role", id: ROLE }],
    }),
  }),
});

export const {
  useGetCommonMemberQuery,
  useGetCommonAccountQuery,
  useGetCommonInvoiceQuery,
  useGetCommonInvoiceItemQuery,
  useGetCommonMemberforNoticeQuery,
  useGetCommonPermissionQuery,
  useGetCommonRoleQuery,
} = CommonEndPoint;
