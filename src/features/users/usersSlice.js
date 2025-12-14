import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../services/api";

export const getUsersAsync = createAsyncThunk(
    'users/fetchUsers', 
    async () => {
        const response = await fetchUsers();
        return response.data;
    }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: Date.now(), 
        ...action.payload,
      };
      state.users.unshift(newUser); 
    },
    
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;