/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import { IInvoiceReport } from "../types/InvoiceReportTypes";
import { INVOICEREPORT } from "./InvoiceReportConstant";

export const reportEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getInvoiceReportList: build.query<IInvoiceReport, any>({
      query: (params) => {
        return {
          url: `/reservation/report/invoice`,
          params,
        };
      },
      providesTags: () => [{ type: "InvoiceReport", id: INVOICEREPORT }],
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const { useGetInvoiceReportListQuery } = reportEndPoint;
