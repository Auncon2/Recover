import { createSlice } from "@reduxjs/toolkit";
import { CASH, DINEIN } from "../utils/pos-constant";

const initialState = {
  subTotal: 0,
  vatAmount: 0,
  discount: 0,
  change: 0,
  netTotal: 0,
  orderType: DINEIN,
  paymentType: CASH,
  paidAmount: 0,
  discountAmount: 0,
  discountType: null,
  staff: null,
  tableId: null,
  delivaryPlatform: null,
  categoryId: null,
  searchFood: "",
  dineInSubTable: [],
  invoiceNumber: null,
  isPayment: false,
};

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    selectedOrderType: (state, { payload }) => {
      state.orderType = payload;
    },

    selectedPaymentType: (state, { payload }) => {
      state.paymentType = payload;
    },

    inputPaidAmount: (state, { payload }) => {
      state.paidAmount = payload;
    },

    inputDiscount: (state, { payload }) => {
      state.discountAmount = payload;
    },

    selectDiscountType: (state, { payload }) => {
      state.discountType = payload;
    },

    selectedStaff: (state, { payload }) => {
      state.staff = payload;
    },

    selectedTable: (state, { payload }) => {
      state.tableId = payload;
    },

    selectedDelivaryPlatform: (state, { payload }) => {
      state.delivaryPlatform = payload;
    },

    selectedCategory: (state, { payload }) => {
      state.categoryId = payload;
    },

    searchFoodItem: (state, { payload }) => {
      state.searchFood = payload;
    },

    calculateSubTotal: (state, { payload }) => {
      state.subTotal = payload?.reduce(
        (accumulator: number, cartItem: any) =>
          accumulator + parseFloat(cartItem.item_total),
        0
      );
    },

    calculateVatAmount: (state) => {
      state.vatAmount = state.subTotal * 0.05;
    },

    calculateDiscountAsPercentage: (state, { payload }) => {
      state.discount = Math.round(
        (state.subTotal * (parseFloat(payload) || 0)) / 100
      );
    },

    calculateFixedDiscount: (state, { payload }) => {
      state.discount = Math.round(parseFloat(payload));
    },

    calculateNetTotal: (state) => {
      state.netTotal = Math.round(
        state.subTotal + state.vatAmount - state.discount
      );
    },

    calculateChangeAmount: (state, { payload }) => {
      state.change = Math.round(parseFloat(payload) - state.netTotal);
    },

    addDineInSubTable: (state: any, { payload }) => {
      state.dineInSubTable = [...state.dineInSubTable, payload];
    },

    addInvoiceNo: (state, { payload }) => {
      state.invoiceNumber = payload;
    },

    paymentDone: (state) => {
      state.isPayment = !state.isPayment;
    },

    stateClear: (state) => {
      state.staff = null;
      state.discountType = null;
      state.discountAmount = 0;
    },

    clearData: (state) => {
      state.orderType = DINEIN;
      state.paymentType = CASH;
      state.subTotal = 0;
      state.vatAmount = 0;
      state.discount = 0;
      state.change = 0;
      state.netTotal = 0;
      state.paidAmount = 0;
      state.discountAmount = 0;
      state.discountType = null;
      state.staff = null;
      state.delivaryPlatform = null;
      state.categoryId = null;
      state.searchFood = "";
      state.dineInSubTable = [];
      state.invoiceNumber = null;
      state.isPayment = false;
    },
  },
});

export const {
  addInvoiceNo,
  selectedOrderType,
  selectedPaymentType,
  inputPaidAmount,
  inputDiscount,
  selectDiscountType,
  selectedStaff,
  selectedTable,
  selectedDelivaryPlatform,
  selectedCategory,
  searchFoodItem,
  calculateSubTotal,
  calculateVatAmount,
  calculateChangeAmount,
  calculateNetTotal,
  calculateDiscountAsPercentage,
  calculateFixedDiscount,
  addDineInSubTable,
  clearData,
  paymentDone,
  stateClear,
} = posSlice.actions;

export default posSlice.reducer;
