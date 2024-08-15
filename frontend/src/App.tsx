import './App.css';
import {Box, Container} from '@mui/material';
import GuestForm from './components/GuestForm.tsx';
import GuestList from './components/GuestList.tsx';

const App = () => {

  return (
    <Container>
      <GuestForm/>
      <Box mt={4}>
        <GuestList/>
      </Box>
    </Container>
  );
};

export default App;
