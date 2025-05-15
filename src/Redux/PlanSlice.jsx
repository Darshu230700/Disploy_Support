import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: null,
    error: "",
    message: "",
    trial: ""
};


export const handleGetTrialPlan = createAsyncThunk(
    "Common/handleGetTrialPlan",
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

export const handleEditTrialPlan = createAsyncThunk(
    "Common/handleEditTrialPlan",
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



const PlanSlice = createSlice({
    name: "plan",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.data = null;
            state.event = "";
            state.message = "";
            state.trial= "";

        },
    },
    extraReducers: (builder) => {
        // Get Trial Plan
        builder.addCase(handleGetTrialPlan.pending, (state) => {
            state.error = null;
        }
        );
        builder.addCase(handleGetTrialPlan.fulfilled, (state, { payload }) => {
            state.data = payload
            state.error = null
        }
        );
        builder.addCase(handleGetTrialPlan.rejected, (state, { payload }) => {
            state.error = payload ?? null
            state.event = null
        });

        builder.addCase(handleEditTrialPlan.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(handleEditTrialPlan.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.trial = action.payload;
            state.message = action.payload?.message;
        });
        builder.addCase(handleEditTrialPlan.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            state.message = action.payload?.message;
        });
    }
});

export const { resetStatus } = PlanSlice.actions

export default PlanSlice.reducer