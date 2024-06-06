import { api } from "../../../app/api/userApi/api";
import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/Notification";
import { ICreatePayroll, IVIewPayroll } from "../types/PayTypes";

// import { ICreatePayroll, IVIewPayroll } from "../types/PayrollTypes";
// import { PAYROLL } from "./PayrollConstant";

export const hotelPayrollEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    createPayroll: build.mutation<HTTPResponse<ICreatePayroll>, FormData>({
      query: (body) => ({
        url: `/reservation/payroll`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Payrool", id: "PAYROLL" }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),

    getPayroll: build.query<HTTPResponse<IVIewPayroll[]>, any>({
      query: (params) => {
        return {
          url: `/reservation/payroll`,
          params,
        };
      },
      providesTags: () => [{ type: "Payrool", id: "PAYROLL" }],
    }),

    getPayrollDetails: build.query<any, number>({
      query: (id) => `/reservation/payroll/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ type: "Payrool", id: "PAYROLL" }],
    }),

    // getRoleList: build.query<HTTPResponse<IViewRole[]>, any>({
    //   query: () => {
    //     return {
    //       url: `/m360/administration/role`,
    //     };
    //   },
    //   providesTags: () => [{ type: "Payrool", id: PAYROLL }],
    // }),

    updatePayroll: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/room/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Payrool", id: "PAYROLL" }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreatePayrollMutation,
  useGetPayrollDetailsQuery,
  useGetPayrollQuery,
  useUpdatePayrollMutation,
} = hotelPayrollEndPoint;
