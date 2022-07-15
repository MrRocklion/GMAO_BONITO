import './App.css';
import Homepage from './views/Inicio';
import { Routes, Route } from "react-router-dom";
import UserviewExt from './views/UserExternos';
import UserEnfermeras from './views/UserEnfermeros';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserCompras from './views/userCompras';
import UserTecnicos from './views/UserTecnicos';
import Userview from './views/UserJefe'


function App() {

  const theme = createTheme({
    palette: {
      success: {
        main: '#A9CCE3',
        darker: '#053e85',
      },

      secondary: {
        main: "#A9CCE3"
      },

      oficial: {
        main: "#92593f"
      },

      crema: {
        main: "#dec5ad"
      },

      enviar: {
        main: "#d5b079",
        contrastText: '#fff',
      },

      enviarcp: {
        main: "#9d674b",
        contrastText: '#fff',
      },

      cancelar: {
        main: "#d4ac2b"
      },

      cancelarcp: {
        main: "#9d674b"
      },

      gis: {
        main: '#ECF0F1',
        contrastText: '#fff',
      },

      rosado: {
        main: ' #dcb8bb',
        contrastText: '#fff',
      },

      gris: {
        main: "#BDB18E"
      },
      verde: {
        main: '#58D68D',
        contrastText: '#1E8449',
      },
      salmon: {
        main: '#F1948A',
        contrastText: '#fff',
      },
      morado: {
        main: '#BB8FCE ',
        contrastText: '#fff',
      },
      verdee: {
        main: '#2ECC71',
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/externos/home*" element={<UserviewExt/>} />
          <Route path="/orden/home*" element={<UserEnfermeras/>} />
          <Route path="/compras/home*" element={<UserCompras/>} />
          <Route path="/inventario/home*" element={<UserTecnicos/>} />
          <Route path="/personal/home*" element={<Userview/>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
