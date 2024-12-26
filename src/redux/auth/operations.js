import axios from "axios";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", credentials);
      setAuthHeader(res.data.token);
      toast.success(`Congratulations! You have successfully registered.`);
      return res.data;
    } catch (error) {
      toast.error(
        `Something went wrong... Try again later. Error details: ${error.message}`
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", credentials);
      setAuthHeader(res.data.token);
      toast.success(`Congratulations! You have successfully logged in.`);
      return res.data;
    } catch (error) {
      toast.error(
        `Something went wrong... Try again later. Error details: ${error.message}`
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
    toast.success(`Congratulations! You have successfully logged out.`);
  } catch (error) {
    toast.error(
      `Something went wrong... Try again later. Error details: ${error.message}`
    );
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("/users/current");
      toast.success(`Session refreshed successfully.`);
      return res.data;
    } catch (error) {
      toast.error(
        `Unable to retrieve user information, please log in or register to continue`
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
