import { createSlice } from "@reduxjs/toolkit";

export const supportedPlatformSlice = createSlice({
    name: 'supportedPlatform',
    initialState:{
        supportedPlatform: [],
        supportedPlatformStatistics: [],
    },
    reducers:{
        getAllSupportedPlatform: (state, action) => {
            state.supportedPlatform = action.payload
        },
        setSupportedPlatformStatistics: (state, action) => {
            state.supportedPlatformStatistics = action.payload
        },
    }
});

export const {getAllSupportedPlatform, setSupportedPlatformStatistics} = supportedPlatformSlice.actions

export default supportedPlatformSlice.reducer