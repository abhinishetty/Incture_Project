import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock users
let USERS = [
  { username: "admin", password: "admin", role: "Admin" },
  { username: "manager", password: "manager", role: "Manager" },
  { username: "employee", password: "employee", role: "Employee" },
];

// Async login
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async ({ username, password }, { rejectWithValue }) => {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) return { user, token: "fake-jwt-token" };
    else return rejectWithValue("Invalid username or password");
  }
);

// Async register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password, role }, { rejectWithValue }) => {
    const existing = USERS.find(u => u.username === username);
    if (existing) return rejectWithValue("User already exists");

    const newUser = { username, password, role: role || "Employee" };
    USERS.push(newUser);
    return { user: newUser, token: "fake-jwt-token" };
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "succeeded";
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "succeeded";
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
