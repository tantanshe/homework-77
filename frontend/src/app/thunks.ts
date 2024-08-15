import {createAsyncThunk} from '@reduxjs/toolkit';
import {Guest} from '../types';
import axiosApi from '../axiosApi.ts';

export const fetchGuests = createAsyncThunk<Guest[]>('guests/fetchGuests', async () => {
  const {data} = await axiosApi.get('/guests');
  return data;
});

export const addGuest = createAsyncThunk<Guest, Guest>('guests/addGuest', async (newGuest) => {
  const formData = new FormData();
  formData.append('author', newGuest.author);
  formData.append('message', newGuest.message);
  if (newGuest.image) {
    formData.append('image', newGuest.image);
  }

  await axiosApi.post('/guests', formData);
});
