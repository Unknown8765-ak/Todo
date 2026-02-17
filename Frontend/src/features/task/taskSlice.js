import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {

    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    },

    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        task => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        task => task._id !== action.payload
      );
    },

  }
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;
