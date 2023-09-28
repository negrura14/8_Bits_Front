import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payments: [],
    payment: {},
    paymentByGame:[],
    paymentStatistics: [],
    topSelling: [],
    totalSales: [],
}

const paymentsSlice = createSlice ({
    name: 'payments',
    initialState,
    reducers: {
        getPayments: (state, action) => {
            state.payments = action.payload;
        },
        getPaymentID: (state, action) => {
            state.payment = action.payload;
        },
        clearPaymentDetailAdmin: (state) => {
            state.payment = {};
        },
        getPaymentStatistics: (state, action) => {
            state.paymentStatistics = action.payload;
        },
        getPaymentByGameId: (state, action)=>{
            state.paymentByGame = action.payload;
        },
        getTopSelling: (state, action) => {
            state.topSelling = action.payload;
        },
        getTotalSales: (state, action) => {
            state.totalSales = action.payload;
        }
    }
});

export const { getPayments, getPaymentID, clearPaymentDetailAdmin, getPaymentStatistics, getPaymentByGameId, getTopSelling, getTotalSales } = paymentsSlice.actions;

export default paymentsSlice.reducer;