/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */

import { api } from "../../app/api/userApi/api";
import { HTTPResponse } from "../../app/utils/commonTypes";
export const CommonEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getCommonProperty: build.query<HTTPResponse<any>, void>({
      query: () => {
        return {
          url: `property/basic/13`,
        };
      },
    }),
  }),
});

export const { useGetCommonPropertyQuery } = CommonEndPoint;
