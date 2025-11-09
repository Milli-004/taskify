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
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, (state) => { 
        state.status = 'loading'; 
      })
      .addCase(fetchTasks.fulfilled, (state, action) => { 
        state.list = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => { 
        state.list.push(action.payload); 
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.list = state.list.map(t => t.id === action.payload.id ? action.payload : t);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter(t => t.id !== action.payload);
      });
  }
});

export default slice.reducer;
