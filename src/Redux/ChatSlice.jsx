import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CHATUSERLIST, GET_BY_USER_CHAT, SAVE_USER_CHAT, USER_LIVE_OFFLINE } from "../Pages/API";

const URL = 'https://supportsocket.disploy.com/api/usersChat'


const initialState = {
  userMessageData: [],
  userList: [],
  status: "idle",
  error: null,
  success: null,
  message: null,
  loading: false,
  type: null
};


export const allUsers = createAsyncThunk('data/allUsers', async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    payload.token = `Bearer ${token}`
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.get(`${URL}?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
}
);


export const getByUserMessage = createAsyncThunk('data/getByUserMessage', async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.get(`${GET_BY_USER_CHAT}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
}
);

export const saveUserMessage = createAsyncThunk('data/saveUserMessage', async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const response = await axios.post(`${SAVE_USER_CHAT}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
}
);


export const userLiveOrOffline = createAsyncThunk('data/userLiveOrOffline', async (payload, thunkAPI) => {
  try {
    const token = thunkAPI.getState().root.auth.token;
    const queryParams = new URLSearchParams(payload).toString();
    const response = await axios.get(`${USER_LIVE_OFFLINE}?${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
}
);

const SidebarSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.error = null;
      state.message = null;
      state.status = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(allUsers.pending, (state) => {    // allUsers
        state.status = null;
        state.loading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {    // allUsers
        state.status = null;
        state.loading = false;
        state.userList = action.payload?.data;
      })
      .addCase(allUsers.rejected, (state, action) => {    // allUsers
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getByUserMessage.pending, (state) => {    // getByUserMessage
        state.status = null;
        state.loading = true;
      })
      .addCase(getByUserMessage.fulfilled, (state, action) => {    // getByUserMessage
        state.status = null;
        state.loading = false;
        state.userMessageData = action.payload?.data;
      })
      .addCase(getByUserMessage.rejected, (state, action) => {    // getByUserMessage
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(saveUserMessage.pending, (state) => {    // saveUserMessage
        state.status = null;
        state.loading = true;
      })
      .addCase(saveUserMessage.fulfilled, (state, action) => {    // saveUserMessage
        state.status = null;
        state.loading = false;
        // state.userMessageData = action.payload?.data;
      })
      .addCase(saveUserMessage.rejected, (state, action) => {    // saveUserMessage
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(userLiveOrOffline.pending, (state) => {    // userLiveOrOffline
        state.status = null;
        state.loading = true;
      })
      .addCase(userLiveOrOffline.fulfilled, (state, action) => {    // userLiveOrOffline
        state.status = null;
        state.loading = false;
        // state.userMessageData = action.payload?.data;
      })
      .addCase(userLiveOrOffline.rejected, (state, action) => {    // userLiveOrOffline
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

  },
});

export const { resetStatus } = SidebarSlice.actions;

export default SidebarSlice.reducer;
