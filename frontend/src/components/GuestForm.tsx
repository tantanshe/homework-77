import React, {useState} from 'react';
import {useAppDispatch} from '../app/hooks';
import {Button, TextField, Grid, Box} from '@mui/material';
import FileInput from '../../UI/FileInput/FileInput';
import {addGuest, fetchGuests} from '../app/thunks.ts';

const GuestForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    author: '',
    message: '',
    image: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.message) return;

    const formData = new FormData();
    formData.append('author', state.author || 'Anonymous');
    formData.append('message', state.message);
    if (state.image) formData.append('image', state.image);

    dispatch(addGuest(formData));
    dispatch(fetchGuests());
    setState({
      author: '',
      message: '',
      image: null,
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 3}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            name="author"
            value={state.author}
            onChange={(e) => setState({...state, author: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Message"
            required
            fullWidth
            margin="normal"
            name="message"
            value={state.message}
            onChange={(e) => setState({...state, message: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <FileInput
            name="image"
            label="Image"
            onChange={fileInputChangeHandler}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" sx={{mt: 2}}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GuestForm;
