import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: null,
    error: "",
    message: "",
    invoice: ""
};


export const handleAllInvoice = createAsyncThunk(
    "Common/handleAllInvoice",
    async ({ config }, { rejectWithValue }) => {
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            if (error?.response) {
                return rejectWithValue(error?.response?.data);
            }
        }
    }
);
export const handleInvoiceById = createAsyncThunk(
    "Common/handleInvoiceById",
    async ({ config }, { rejectWithValue }) => {
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            if (error?.response) {
                return rejectWithValue(error?.response?.data);
            }
        }
    }
);

export const handleSendInvoice = createAsyncThunk(
    "Common/handleSendInvoice",
    async ({ config }, { rejectWithValue }) => {
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            if (error?.response) {
                return rejectWithValue(error?.response?.data);
            }
        }
    }
);



const InvoiceSlice = createSlice({
    name: "Invoice",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.data = null;
            state.event = "";
            state.message = "";
            state.invoice= "";
        },
    },
    extraReducers: (builder) => {

        builder.addCase(handleAllInvoice.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handleAllInvoice.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.AllInvoice = action.payload;
            state.message = action.payload?.message;
        });
        builder.addCase(handleAllInvoice.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            state.message = action.payload?.message;
        });

        builder.addCase(handleInvoiceById.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handleInvoiceById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.AllInvoice = action.payload;
            state.message = action.payload?.message;
        });
        builder.addCase(handleInvoiceById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            state.message = action.payload?.message;
        });

        builder.addCase(handleSendInvoice.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handleSendInvoice.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.message = action.payload?.message;
        });
        builder.addCase(handleSendInvoice.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            state.message = action.payload?.message;
        });
    }
});

export const { resetStatus } = InvoiceSlice.actions

export default InvoiceSlice.reducer