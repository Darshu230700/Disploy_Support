import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    emailCred: [],
    status: "idle",
    error: null,
    success: null,
    message: null,
    checkCred: false,
    Inbox: [],
    MailById: "",
    SendMail: null
};

export const handleCreateGmailCred = createAsyncThunk(
    "Email/handleCreateGmailCred",
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

export const handleCheckCred = createAsyncThunk(
    "Email/handleCheckCred",
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

export const GetAllCategory = createAsyncThunk(
    "Email/GetAllCategory",
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


export const handleGetEmailInbox = createAsyncThunk(
    "Email/handleGetEmailInbox",
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

export const GetAllMailDetailsByID = createAsyncThunk(
    "Email/GetAllMailDetailsByID",
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

export const handleSendMails = createAsyncThunk(
    "Email/handleSendMails",
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


const EmailSlice = createSlice({
    name: "Email",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.emailCred = null;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleCreateGmailCred.pending, (state) => {
                state.status = null;
            })
            .addCase(handleCreateGmailCred.fulfilled, (state, action) => {
                state.status = null;
                state.emailCred = action.payload?.data;
            })
            .addCase(handleCreateGmailCred.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

        builder
            .addCase(handleCheckCred.pending, (state) => {
                state.status = null;
            })
            .addCase(handleCheckCred.fulfilled, (state, action) => {
                state.status = null;
                state.checkCred = action.payload?.data;
            })
            .addCase(handleCheckCred.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

        builder
            .addCase(GetAllCategory.pending, (state) => {
                state.status = null;
            })
            .addCase(GetAllCategory.fulfilled, (state, action) => {
                state.status = null;
                state.category = action.payload?.data;
            })
            .addCase(GetAllCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

        builder
            .addCase(handleGetEmailInbox.pending, (state) => {
                state.status = null;
            })
            .addCase(handleGetEmailInbox.fulfilled, (state, action) => {
                state.status = null;
                state.Inbox = action.payload?.data;
            })
            .addCase(handleGetEmailInbox.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

        builder
            .addCase(GetAllMailDetailsByID.pending, (state) => {
                state.status = null;
            })
            .addCase(GetAllMailDetailsByID.fulfilled, (state, action) => {
                state.status = null;
                state.MailById = action.payload?.data;
            })
            .addCase(GetAllMailDetailsByID.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

        builder
            .addCase(handleSendMails.pending, (state) => {
                state.status = null;
            })
            .addCase(handleSendMails.fulfilled, (state, action) => {
                state.status = null;
                state.SendMail = action.payload?.data;
            })
            .addCase(handleSendMails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export const { resetStatus } = EmailSlice.actions

export default EmailSlice.reducer