import {createAsyncThunk} from '@reduxjs/toolkit';
import {Guest} from '../types';
import axiosApi from '../axiosApi.ts';

export const fetchGuests = createAsyncThunk<Guest[]>('guests/fetchGuests', async () => {
  const {data} = await axiosApi.get('/guests');
  return data;
});

export const addGuest = createAsyncThunk<Guest, FormData>(
  'guests/addGuest',
  async (formData: FormData) => {
    const response = await axiosApi.post('/guests', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data as Guest;
  }
);