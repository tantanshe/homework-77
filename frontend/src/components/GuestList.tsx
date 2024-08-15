import {useAppDispatch, useAppSelector} from '../app/hooks';
import {CircularProgress, Grid, Card, CardContent, Typography} from '@mui/material';
import {selectError, selectGuests, selectIsGuestsLoading} from '../store/guestsSlice.ts';
import {fetchGuests} from '../app/thunks.ts';
import {useEffect} from 'react';

const GuestList = () => {
  const dispatch = useAppDispatch();
  const guests = useAppSelector(selectGuests);
  const isLoading = useAppSelector(selectIsGuestsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);

  if (isLoading) return <CircularProgress/>;
  if (error) return <Typography color="error">Error loading guests.</Typography>;

  return (
    <Grid container spacing={2}>
      {guests.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center" style={{width: '100%'}}>
          No guests available.
        </Typography>
      ) : (
        guests.map(guest => (
          <Grid item xs={12} sm={6} md={4} key={guest.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{guest.author}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {guest.message}
                </Typography>
                {guest.image && (
                  <img
                    src={`http://localhost:8001/${guest.image}`}
                    alt="Guest Image"
                    style={{width: '100%', height: 'auto', marginTop: '10px'}}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};


export default GuestList;
