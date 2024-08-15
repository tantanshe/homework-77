import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {fetchGuests, addGuest} from '../app/thunks';

export interface Guest {
  id: string;
  author: string;
  message: string;
  image: File | null;
}

interface GuestsState {
  guests: Guest[];
  isLoading: boolean;
  error: boolean;
}

const initialState: GuestsState = {
  guests: [],
  isLoading: false,
  error: false,
};

export const guestsSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchGuests.fulfilled, (state, action: PayloadAction<Guest[]>) => {
        state.isLoading = false;
        state.guests = action.payload;
      })
      .addCase(fetchGuests.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(addGuest.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addGuest.fulfilled, (state, action: PayloadAction<Guest>) => {
        state.guests.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addGuest.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectGuests = (state: RootState) => state.guests.guests;
export const selectIsGuestsLoading = (state: RootState) => state.guests.isLoading;
export const selectError = (state: RootState) => state.guests.error;

export const guestsReducer = guestsSlice.reducer;
