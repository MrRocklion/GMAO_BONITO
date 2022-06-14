import './App.css';
import Homepage from './views/Inicio';
import { Routes, Route } from "react-router-dom";
import Userview from './views/user';
import { createTheme,ThemeProvider } from '@mui/material/styles';

function App() {

  const theme = createTheme({
    palette: {
      success: {
        main: '#A9CCE3',
        darker: '#053e85',
      },
      secondary:{
        main:"#A9CCE3"
      },
      neutral: {
        main: '#ECF0F1',
        contrastText: '#fff',
      },
      proporcional:{
        main: '#58D68D',
        contrastText: '#1E8449',
      },
      temperatura:{
        main: '#F1948A',
        contrastText: '#fff',
      },
      nivel:{
        main: '#BB8FCE ',
        contrastText: '#fff',
      },
      indicador:{
        main: '#2ECC71',
  
      }
    },
  });

  return (
<ThemeProvider theme={theme}>
<div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home/*" element={<Userview />} />
      </Routes>
    </div>
</ThemeProvider>


  );
}

export default App;
