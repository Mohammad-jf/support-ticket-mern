import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../notes/noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create new note
export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get tickets notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(token, ticketId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// then we create a slice and add initial state to it
export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getNotes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.notes = action.payload;
    });
    builder.addCase(getNotes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
