import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingDuePaymnet: {},
  dineInSubTable: [],
  guestName: null,
  invoiceDue: null,
  invoiceDueForPurposeOf: null,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    inputGuestName: (state, { payload }) => {
      state.guestName = payload;
    },

    setBookingDuePaymnet: (state, { payload }) => {
      state.bookingDuePaymnet = payload;
    },
    setInvoiceDue: (state, { payload }) => {
      state.invoiceDue = payload;
    },
    setInvoiceDueForPurposeOf: (state, { payload }) => {
      state.invoiceDueForPurposeOf = payload;
    },
    clearData: (state) => {
      state.dineInSubTable = [];
    },
  },
});

export const {
  inputGuestName,

  clearData,

  setBookingDuePaymnet,
  setInvoiceDue,
  setInvoiceDueForPurposeOf,
} = reservationSlice.actions;

export default reservationSlice.reducer;
