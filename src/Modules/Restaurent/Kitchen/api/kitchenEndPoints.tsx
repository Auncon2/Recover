import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import notification from "../../../../components/utils/Notification";

const kitchenEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    kitchen: builder.query({
      query: () => `/restaurant/ingredient`,
      providesTags: () => [{ type: "kitchen", id: "KITECHEN" }],
    }),
    completeKitchen: builder.mutation({
      query: () => ({
        // url: `/member/invoice/chef/update-status/${id}`,
        url: `/restaurant/ingredient/`,
        method: "PATCH",
        // body: { invoice_kitchen_status: status },
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Cooking is successful.");
        });
      },

      invalidatesTags: [{ type: "kitchen", id: "KITECHEN" }],
    }),
  }),
});

export const { useKitchenQuery, useCompleteKitchenMutation } = kitchenEndpoint;
