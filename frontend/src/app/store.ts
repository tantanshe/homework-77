import {configureStore} from '@reduxjs/toolkit';
import {guestsReducer} from '../store/guestsSlice.ts';

export const store = configureStore({
  reducer: {
    guests: guestsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;