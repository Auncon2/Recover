/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import { ROOMBOOKING } from "../../BookRoom/api/RoomBookingConstant";
import { MONEYRECEIPT } from "../../MoneyReceipt/api/MoneyReceiptsConstant";
import { BookingReportParam, IBookingReport } from "../types/BookingReportType";
import { BOOKINGREPORT } from "./BookingReport";

export const reportEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getBookingReportList: build.query<IBookingReport, BookingReportParam>({
      query: (params: any) => {
        const queryParams =
          params?.room_id !== "" ? `?room_id=${params.room_id}` : "";
        // const queryParamsfrom_date =
        //   params?.room_id !== ""
        //     ? `&from_date=${params?.from_date}`
        //     : `?from_date=${params?.from_date}`;
        const queryParamspay_status =
          params?.room_id !== ""
            ? `&check_in_out_status=${params?.check_in_out_status}`
            : `?check_in_out_status=${params?.check_in_out_status}`;
        return {
          url: `/reservation/report/room-booking${queryParams}${queryParamspay_status}&from_date=${params?.from_date}&to_date=${params?.to_date}`,
          // params,
        };
      },
      providesTags: () => [
        { type: "BookingReport", id: BOOKINGREPORT },
        { type: "Roombooking", id: ROOMBOOKING },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
      ],
    }),
  }),
});

export const { useGetBookingReportListQuery } = reportEndPoint;
