import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosConfig';

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const res = await API.post('/auth/login', payload);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const res = await API.post('/auth/register', payload);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

const loadUser = () => {
  try {
    return localStorage.getItem('user');
  } catch {
    return null;
  }
};

const slice = createSlice({
  name: 'auth',
  initialState: { 
    user: loadUser(), 
    token: localStorage.getItem('token') || null,
    error: null 
  },
  reducers: {
    logout(state) { 
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null; 
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.username;
        state.error = null;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', action.payload.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.username;
        state.error = null;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', action.payload.username);
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
