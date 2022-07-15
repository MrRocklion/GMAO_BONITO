import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from "firebase/auth";
import { updateDoc,doc } from 'firebase/firestore';
import {auth } from "../firebase/firebase-config"
import { db } from '../firebase/firebase-config';
import { async } from '@firebase/util';
const theme = createTheme();

export default function Homepage() {
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  signInWithEmailAndPassword(auth, data.get('email'),data.get('password'))
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
    if(user.uid === "akD6lbAK3ngeChavoYU6Kg7GKNI3"){
      navigate('/externos/home')
    }
    if(user.uid === 'kEjcItjveTZKOPCTHVzUAXUNoyR2'){
      navigate('/inventario/home')
    }
    if(user.uid === 'TS3QouZOApgtdoTiSc3giotXDmr1'){
      navigate('/compras/home')
    }
    if(user.uid === 'd6E6U8EmGoO59w6NigHhrZx3vTw2' ){
      navigate('/compras/home')
    }
    if(user.uid === 'qyA0iGnJYCeaW2z7NVwNtkKpaMb2'){
      navigate('/orden/home')
    }
    if(user.uid === 'LJdzQIBTv5cQhkxUWuj2Lhq1rz72'){
      navigate('/personal/home')
    }
    

    cambiarUsuario(user.uid,user.email)
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
  cambiarUsuario();
  };
  const cambiarUsuario = async(uid,correo) =>{
    const ref = doc(db,"usuario","wPw8WgcqpGfe7LIWloJL");
    await updateDoc(ref, {
      uid: uid,
      correo: correo
  });
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesion 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}