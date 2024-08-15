import './App.css';
import {Container} from '@mui/material';
import GuestForm from './components/GuestForm.tsx';
import GuestList from './components/GuestList.tsx';

const App = () => {

  return (
    <Container>
      <GuestForm/>
      <GuestList/>
    </Container>
  );
};

export default App;
