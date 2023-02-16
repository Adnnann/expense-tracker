import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserTransactions = createAsyncThunk(
    "transactions/userTransactions",
    async () => {
       return await axios.get("/api/transaction")
        .then((response) => response.data)
        .catch((error) => error);
    }
);

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        userTransactions: {},
    },
    reducers:{},
    extraReducers: {
    [getUserTransactions.pending]: (state, {payload}) => {
        return {
            ...state, 
            userTransactions:{
            loading: true,
            success: false,
            error: false,
            payload: payload,
            }

        };
    },
    [getUserTransactions.fulfilled]: (state, {payload}) => {
        return {
            ...state,
            userTransactions:{
            loading: false,
            success: true,
            error: false,
            payload: payload.message,
            }
        }
    },
    [getUserTransactions.rejected]: (state, {payload}) => {
        return {
            ...state,
            userTransactions:{
            loading: false,
            success: false,
            error: true,
            content: payload.error,
            }
        }
    },

}

});

export const userTransactions = (state) => state.transactions.userTransactions;
export const { } = transactionsSlice.actions;
export default transactionsSlice.reducer;