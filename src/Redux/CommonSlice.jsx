import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { commongetUrl } from "../Pages/API";

export const handlegetTimeZones = createAsyncThunk(
    "common/handlegetTimeZones",
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await commongetUrl(`GetAllTimeZone`, {
                headers: { Authorization: token },
            });
            if (response?.status === 200) {
                return response.data?.data;
            } else {
                return rejectWithValue(response?.data);
            }
        } catch (error) {
            if (error?.response) {
                toast.error(error?.response?.data?.message);
                return rejectWithValue(error?.response?.data);
            }
        }
    }
);


const initialState = {
    timeZone: [],
    error: null,

};

const CommonSlice = createSlice({
    name: "eventslice",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.event = null;
            state.eventlist = [];
            state.eventbyId = null
        },
    },
    extraReducers: (builder) => {
        // All TimeZones
        builder.addCase(handlegetTimeZones.pending, (state) => {
            state.error = null;
        }
        );
        builder.addCase(handlegetTimeZones.fulfilled, (state, { payload }) => {
            state.timeZone = payload
            state.error = null
        }
        );
        builder.addCase(handlegetTimeZones.rejected, (state, { payload }) => {
            state.error = payload ?? null
            state.timeZone = []
        });

    }
});

export const { resetStatus } = CommonSlice.actions

export default CommonSlice.reducer