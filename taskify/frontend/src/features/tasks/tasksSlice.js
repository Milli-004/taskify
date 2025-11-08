import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosConfig';

export const fetchTasks = createAsyncThunk('tasks/fetch', async (userId) => {
  const res = await API.get(`/tasks/user/${userId}`);
  return res.data;
});

export const addTask = createAsyncThunk('tasks/add', async (task) => {
  const res = await API.post('/tasks', task);
  return res.data;
});

export const updateTask = createAsyncThunk('tasks/update', async ({id, task}) => {
  const res = await API.put(`/tasks/${id}`, task);
  return res.data;
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id) => {
  await API.delete(`/tasks/${id}`);
  return id;
});

const slice = createSlice({
  name: 'tasks',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => { state.list = action.payload; });
    builder.addCase(addTask.fulfilled, (state, action) => { state.list.push(action.payload); });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.list = state.list.map(t => t.id === action.payload.id ? action.payload : t);
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    });
  }
});

export default slice.reducer;
