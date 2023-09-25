import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payments: [],
    payment: {},
    paymentStatistics: [],
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
        }
    }
});

export const { getPayments, getPaymentID, clearPaymentDetailAdmin, getPaymentStatistics} = paymentsSlice.actions;

export default paymentsSlice.reducer;