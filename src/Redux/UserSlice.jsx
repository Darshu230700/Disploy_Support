import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getUrl } from "../Pages/API";

export const handleGetUserList = createAsyncThunk(
    "UserList/handleGetUserList",
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await getUrl(`GetEmployeeMaster`, {
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
    userlist: null,
    error: null,
};

const UserSlice = createSlice({
    name: "UserList",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.userlist = null;
        },
    },
    extraReducers: (builder) => {
        //get countries data
        builder.addCase(handleGetUserList.pending, (state) => {
            state.error = null;
        }
        );
        builder.addCase(handleGetUserList.fulfilled, (state, { payload }) => {
            state.userlist = payload
            state.error = null
        }
        );
        builder.addCase(handleGetUserList.rejected, (state, { payload }) => {
            state.error = payload ?? null
            state.userlist = []
        });
    }
});

export const { resetStatus } = UserSlice.actions

export default UserSlice.reducer