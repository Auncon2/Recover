/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */

import { api } from '../../../app/api/userApi/api';
import { expire } from '../../../app/api/utils/unUsedExpireTimer';
import asyncWrapper from '../../../app/utils/asyncWrapper';
import { HTTPResponse } from '../../../app/utils/commonTypes';
import notification from '../../../components/utils/Notification';
import {
  IPicnicParams,
  IPicniclist,
  ISinglePicnic,
  ISinglePicnicJoined,
} from '../types/PicnicTypes';
import { PICNIC } from './constant';

export const PicnicEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getPicnic: build.query<HTTPResponse<IPicniclist[]>, IPicnicParams>({
      query: (params) => {
        return {
          url: `/admin/picnic`,
          params,
        };
      },
      providesTags: () => [{ type: 'Picnic', id: PICNIC }],
    }),
    getSinglePicnic: build.query<HTTPResponse<ISinglePicnic>, number>({
      query: (id) => `/admin/picnic/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ type: 'Picnic', id: PICNIC }],
    }),
    //create PicniC
    createPicnic: build.mutation<{}, FormData>({
      query(body) {
        return {
          url: '/admin/picnic',
          method: 'POST',
          credentials: 'include',
          body,
          formData: true,
        };
      },
      invalidatesTags: () => [{ type: 'Picnic', id: PICNIC }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('success', 'Successfully Created');
        });
      },
    }),

    updatePicnic: build.mutation<void, { id: string; formData: FormData }>({
      query: (body) => ({
        url: `/admin/picnic/${body.id}`,
        method: 'PATCH',
        body: body.formData,
      }),
      invalidatesTags: () => [{ type: 'Picnic', id: PICNIC }],
    }),

    getSinglePicnicJoined: build.query<
      HTTPResponse<ISinglePicnicJoined[]>,
      number
    >({
      query: (id) => `/admin/picnic/joined-member/by-picnic/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ type: 'Picnic', id: PICNIC }],
    }),

    updatePicnicStatus: build.mutation<void, { id: string; memberId: string }>({
      query: (body) => ({
        url: `/admin/picnic/update-joined-member/by-picnic/${body.id}/memberId/${body.memberId}`,
        method: 'PATCH',
      }),
      invalidatesTags: () => [{ type: 'Picnic', id: PICNIC }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification('success', 'Successfully Status Updated');
        });
      },
    }),
  }),
});

export const {
  useGetPicnicQuery,
  useCreatePicnicMutation,
  useGetSinglePicnicQuery,
  useUpdatePicnicMutation,
  useGetSinglePicnicJoinedQuery,
  useUpdatePicnicStatusMutation,
} = PicnicEndPoint;
