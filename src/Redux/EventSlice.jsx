import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { eventgetUrl, eventpostUrl } from "../Pages/API";

export const handleCreateEditEvent = createAsyncThunk(
    "eventslice/handleCreateEditEvent",
    async ({ token, Params }, { rejectWithValue }) => {
        try {
            const response = await eventpostUrl(`CreateAndUpdateEventMaster`, {
                headers: { Authorization: token, 'Content-Type': 'application/json' },
                data: Params
            });
            if (response?.status === 200) {
                toast.success(response?.data?.message)
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

export const handleGetEventList = createAsyncThunk(
    "eventslice/handleGetEventList",
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await eventgetUrl(`GetAllEventList`, {
                headers: { Authorization: token },
            });
            const filteredEvent = response?.data?.data?.map((item) => ({
                id: item?.eventId,
                eventId: item?.eventId,
                title: item?.eventName,
                eventName: item?.eventName,
                start: item?.startDate,
                end: item?.endDate,
                allDay: item?.allDay,
                description: item?.description,
                eventSubDetails: item?.eventSubDetails,
                notification: item?.notification,
                repeatEvent: item?.repeatEvent,
                task: item?.task,
                timeZone: item?.timeZone,
                zoomLink: item?.zoomLink,
                userID: item?.userID,
                endDate: item?.endDate,
                endTime: item?.endTime,
                startDate: item?.startDate,
                startTime: item?.startTime,
                backgroundColor: item?.task ? "rgb(65, 81, 176)" : "rgb(214, 62, 99)",
                textColor: "rgb(255, 255, 255)",
                borderColor: "transparent"
            }));
            if (response?.status === 200) {
                return filteredEvent || [];
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

export const handleGetEventDataById = createAsyncThunk(
    "eventslice/handleGetEventDataById",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await eventgetUrl(`GetAllEventList?EventId=${id}`, {
                headers: {
                    Authorization: token
                },
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

export const handleDeleteEvent = createAsyncThunk(
    "eventslice/handleDeleteEvent",
    async ({ token, id }, { rejectWithValue }) => {
        try {
            const response = await eventpostUrl(`DeleteEvent?EventIds=${id}`, {
                headers: { Authorization: token },
            });
            if (response?.status === 200) {
                toast.success(response?.data?.message)
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
    event: null,
    error: null,
    eventlist: [],
    eventbyId: null,
    deleteId: null
};

const EventSlice = createSlice({
    name: "eventslice",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.event = null;
            state.eventlist = [];
            state.eventbyId = null;
            state.deleteId = null
        },
    },
    extraReducers: (builder) => {
        // Add Edit Event
        builder.addCase(handleCreateEditEvent.pending, (state) => {
            state.error = null;
        }
        );
        builder.addCase(handleCreateEditEvent.fulfilled, (state, { payload }) => {
            state.event = payload
            state.error = null
        }
        );
        builder.addCase(handleCreateEditEvent.rejected, (state, { payload }) => {
            state.error = payload ?? null
            state.event = null
        });

        //Get All Event
        builder.addCase(handleGetEventList.pending, (state) => {
            state.error = null;
        }
        );
        builder.addCase(handleGetEventList.fulfilled, (state, { payload }) => {
            state.eventlist = payload
            state.error = null
        }
        );
        builder.addCase(handleGetEventList.rejected, (state, { payload }) => {
            state.error = payload ?? null
            state.eventlist = []
        });

        //Get Event by Id
        builder.addCase(handleGetEventDataById.pending, (state) => {
            state.error = null;
        }
        );
        builder.addCase(handleGetEventDataById.fulfilled, (state, { payload }) => {
            state.eventbyId = payload
            state.error = null
        }
        );
        builder.addCase(handleGetEventDataById.rejected, (state, { payload }) => {
            state.error = payload ?? null
            state.eventbyId = null
        });

        // Delete event
        builder.addCase(handleDeleteEvent.pending, (state) => {
            state.error = null;
        }
        );
        builder.addCase(handleDeleteEvent.fulfilled, (state, { payload }) => {
            state.deleteId = payload
            state.error = null
        }
        );
        builder.addCase(handleDeleteEvent.rejected, (state, { payload }) => {
            state.error = payload ?? null
            state.deleteId = null
        });
    }
});

export const { resetStatus } = EventSlice.actions

export default EventSlice.reducer