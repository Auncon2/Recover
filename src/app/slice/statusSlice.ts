// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   checkInOutStatus: [],
// };

// const statusSlice = createSlice({
//   name: "status",
//   initialState,
//   reducers: {
//     updateCheckInOutStatus: (state, action) => {
//       state.checkInOutStatus = action.payload;
//     },
//   },
// });

// export const { updateCheckInOutStatus } = statusSlice.actions;
// export const selectCheckInOutStatus = (state: any) =>
//   state.status.checkInOutStatus;
// export default statusSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commonArrayState: [],
  commonObjectState: {},
};

console.log(initialState.commonObjectState);

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    updatecommonArrayState: (state, action) => {
      state.commonArrayState = action.payload;
    },
    updatecommonObjectState: (state: any, { payload }) => {
      console.log("sdasdasd", payload);
      state.commonObjectState = payload;
      // state.commonObjectState = [...state.commonObjectState, payload];
    },
  },
});

export const { updatecommonArrayState, updatecommonObjectState } =
  statusSlice.actions;
// export const selectcommonArrayState = (state: any) => state.commonArrayState;
// export const selectcommonObjectState = (state: any) => state.commonObjectState;
export default statusSlice.reducer;
