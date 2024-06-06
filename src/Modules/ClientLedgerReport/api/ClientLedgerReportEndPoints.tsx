/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import { ROOMBOOKING } from "../../BookRoom/api/RoomBookingConstant";
import { INVOICE } from "../../BookingInvoice/api/constant";
import { HALL } from "../../HallModule/api/HallConstant";
import { MONEYRECEIPT } from "../../MoneyReceipt/api/MoneyReceiptsConstant";
import { IViewClientLedgerReport } from "../types/ClientLedgerReportTypes";

export const reportEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getClientLedgerReportList: build.query<
      HTTPResponse<IViewClientLedgerReport[]>,
      any
    >({
      query: (params) => {
        const queryParams =
          params?.user_id !== "" ? `?user_id=${params.user_id}` : "";
        // const queryParamsfrom_date =
        //   params?.room_id !== ""
        //     ? `&from_date=${params?.from_date}`
        //     : `?from_date=${params?.from_date}`;
        const queryParamspay_status =
          params?.user_id !== ""
            ? `&pay_type=${params?.pay_type}`
            : `?pay_type=${params?.pay_type}`;
        return {
          url: `/reservation/report/client-ledger${queryParams}${queryParamspay_status}&from_date=${params?.from_date}&to_date=${params?.to_date}`,
          // params,
        };
      },
      providesTags: () => [
        { type: "Roombooking", id: ROOMBOOKING },
        { type: "Hall", id: HALL },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Invoice", id: INVOICE },
      ],
    }),
  }),
});

export const { useGetClientLedgerReportListQuery } = reportEndPoint;
