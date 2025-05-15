import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { getUrl, getcustomerUrl, postUrl } from "../Pages/API";

export const handleRegisterUser = createAsyncThunk(
  "auth/handleRegisterUser",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleLoginUser = createAsyncThunk(
  "auth/handleLoginUser",
  async ({ config }, { rejectWithValue }) => {
    try {
      const response = await axios.request(config);
      if (response?.data?.status === 200) {
        return response.data;
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

export const handleGetUserDetails = createAsyncThunk(
  "auth/handleGetUserDetails",
  async ({ id, token, loginType }, { rejectWithValue }) => {
    try {
      const response = await getUrl(`GetEmployeeMaster?EmployeeMasterID=${id}`, {
        headers: { Authorization: token },
      });

      if (Object.values(response?.data?.data).length > 0) {
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

export const handleGetCustomerUserDetails = createAsyncThunk(
  "auth/handleGetCustomerUserDetails",
  async ({ id, token, loginType }, { rejectWithValue }) => {
    try {
      const response = await getcustomerUrl(`GetCustomerMaster?CustomerMasterID=${id}`, {
        headers: { Authorization: token },
      });

      if (Object.values(response?.data?.data).length > 0) {
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

export const UpdateEmployeeDetails = createAsyncThunk(
  "auth/UpdateEmployeeDetails",
  async ({ Params, file, user, token }, { rejectWithValue }) => {
    try {
      const response = await postUrl("RegistorEmployeeMaster", {
        data: Params,
        headers: { Authorization: token, "Content-Type": "multipart/formdata" },
      });
      if (Object.values(response?.data).length > 0) {
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

export const UpdateCustomerDetails = createAsyncThunk(
  "auth/UpdateCustomerDetails",
  async ({ Params, file, user, token }, { rejectWithValue }) => {

    try {
      const response = await postUrl("registorcustomermaster", {
        data: Params,
        headers: { Authorization: token, "Content-Type": "multipart/formdata" },
      });
      if (Object.values(response?.data).length > 0) {
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
  loading: false,
  user: null,
  error: null,
  token: null,
  userDetails: null,
};


const Authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state, { payload }) => {
      state.loading = true;
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      window.location.href = window.location.origin;
      window.localStorage.removeItem("timer");
      localStorage.setItem("role_access", "");
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(handleRegisterUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleRegisterUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.token = null;
    });
    builder.addCase(handleRegisterUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
    });

    // login user
    builder.addCase(handleLoginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleLoginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
      state.token = payload?.data?.token;
    });
    builder.addCase(handleLoginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
    });

    // get user details
    builder.addCase(handleGetUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleGetUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload;
      state.error = null;
    });
    builder.addCase(handleGetUserDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.userDetails = null;
      state.error = payload ?? null;
    });

    // get customer user details
    builder.addCase(handleGetCustomerUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleGetCustomerUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload;
      state.error = null;
    });
    builder.addCase(handleGetCustomerUserDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.userDetails = null;
      state.error = payload ?? null;
    });

    // update employee details
    builder.addCase(UpdateEmployeeDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(UpdateEmployeeDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload?.model;
      state.error = null;
    });
    builder.addCase(UpdateEmployeeDetails.rejected, (state, { payload }) => {
      state.loading = false;
      // state.userDetails = state.userDetails;
      state.error = payload ?? null;
    });

    // update customer details
    builder.addCase(UpdateCustomerDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(UpdateCustomerDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload?.model;
      state.error = null;
    });
    builder.addCase(UpdateCustomerDetails.rejected, (state, { payload }) => {
      state.loading = false;
      // state.userDetails = state.userDetails;
      state.error = payload ?? null;
    });
  },
});

export const { handleLogout } = Authslice.actions;

export default Authslice.reducer;