import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { ADDUPDATE_USERROLE, USER_ROLE_COMBINE, USER_ROLE_GET, getUrl } from '../Pages/API';
import axios from 'axios';

export const handleGetCountries = createAsyncThunk(
    "SettingUSer/handleGetCountries",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getUrl(`GetCountryMasters`);
            if (data?.statusCode === 200) return data;
            else {
                toast.error(data?.message);
                return rejectWithValue(data?.message);
            }
        } catch (error) {
            rejectWithValue(error?.response?.data?.message);
        }
    }
);

// Add Edit User Role
export const handleAddNewUserRole = createAsyncThunk(
    "UserMaster/handleAddNewUserRole",
    async ({ config }, { rejectWithValue }) => {
      try {
        const response = await axios.request(config);
        if (response?.data?.status) {
          return response.data;
        } else {
          return rejectWithValue(response?.data);
        }
      } catch (error) {
        if (error?.response) {
          return rejectWithValue(error?.response?.data);
        }
      }
    }
  );

  //get user roles
export const getUsersRoles = createAsyncThunk(
  "data/getUsersRoles",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().root.auth.token;
      const response = await axios.post(
        ADDUPDATE_USERROLE,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status) {
        return {
          status: true,
          message: response.data.message,
          data: response.data.data,
        };
      } else {
        return { status: false, message: "Failed to Load data" };
      }
    } catch (error) {
      throw error;
    }
  }
);

//get users
export const getOrgUsersRole = createAsyncThunk(
  "data/getOrgUsersRole",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().root.auth.token;
      const response = await axios.post(USER_ROLE_GET, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

export const getUserRoleData = createAsyncThunk(
  "data/fetchApiData",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().root.auth.token;
      // const queryParams = new URLSearchParams({ScreenGroupID : null}).toString();
      const response = await axios.options(USER_ROLE_COMBINE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

// get userRole by id
export const handleUserRoleById = createAsyncThunk(
  "UserMaster/handleUserRoleById",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      if (error?.response) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

const initialState = {
    Countries: [],
    error: null,
    data: null,       // User data 
    status: 'idle',   // Request status: 'idle', 'loading', 'succeeded', or 'failed'
    message: '',   
    dataRole:""   // Message to display (success or error message)
  
}

const SettingUserSlice = createSlice({
    name: "SettingUSer",
    initialState,
    reducers: {
    resetStatus: (state) => {
        state.error = null;
        state.message = null;
        state.status = null;
      },
    },
    extraReducers: (builder) => {
        //get countries data
        builder.addCase(handleGetCountries.pending,(state, { payload }) => {
                state.error = null;
            }
        );
        builder.addCase(handleGetCountries.fulfilled,(state, { payload, meta }) => {
                state.Countries = payload?.data
                state.error = null
            }
        );
        builder.addCase(handleGetCountries.rejected, (state, { payload }) => {
            state.error = payload??null
            state.Countries=[]
        });

        builder.addCase(handleAddNewUserRole.pending, (state) => {
            // Add User Role
            state.status = "loading";
          });
          builder.addCase(handleAddNewUserRole.fulfilled, (state, action) => {
            // Add User Role
            state.status = "succeeded";
            state.data = action.payload;
            state.message = action.payload.message || "User Role saved successfully";
          });
          builder.addCase(handleAddNewUserRole.rejected, (state, action) => {
            // Add User Role
            state.status = "failed";
            state.error = action.payload.message;
            state.message =
              action.payload.message || "This user is not insert try agin";
          });

          builder.addCase(getUsersRoles.pending, (state) => {
            state.status = null;
          });
          builder.addCase(getUsersRoles.fulfilled, (state, action) => {
            state.status = null;
            state.getUserData = action.payload?.data;
          });
          builder.addCase(getUsersRoles.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });

          builder.addCase(getOrgUsersRole.pending, (state) => {
            state.status = null;
          });
          builder.addCase(getOrgUsersRole.fulfilled, (state, action) => {
            state.status = null;
            state.getUserData = action.payload?.data;
          });
          builder.addCase(getOrgUsersRole.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });

          builder
          .addCase(getUserRoleData.pending, (state) => {
            state.status = null;
          })
          .addCase(getUserRoleData.fulfilled, (state, action) => {
            state.status = null;
            state.data = action.payload?.data;
            state.dataRole = action.payload?.data;
          })
          .addCase(getUserRoleData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })

          // userRole By Id
    builder.addCase(handleUserRoleById.pending, (state) => {
      state.status = false;
    });
    builder.addCase(handleUserRoleById.fulfilled, (state, action) => {
      state.status = true;
      state.data = action.payload;
      // state.message = action.payload.message || "User Role saved successfully";
    });
    builder.addCase(handleUserRoleById.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload.message;
      // state.message =
      //   action.payload.message || "This user is not insert try agin";
    });
    }
});

export const { resetStatus } = SettingUserSlice.actions

export default SettingUserSlice.reducer