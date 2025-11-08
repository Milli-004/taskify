import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosConfig';

export const login = createAsyncThunk('auth/login', async (payload) => {
  const res = await API.post('/auth/login', payload);
  return res.data;
});

export const register = createAsyncThunk('auth/register', async (payload) => {
  const res = await API.post('/auth/register', payload);
  return res.data;
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('token') || null },
  reducers: {
    logout(state){ localStorage.removeItem('token'); state.token = null; state.user = null; }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      state.user = action.payload.username || null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
