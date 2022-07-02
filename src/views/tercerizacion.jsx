import React, { useState } from "react";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
// import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { setDoc, doc} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {Container} from "reactstrap";
import Grid from "@mui/material/Grid"

export default function Tercerizacion(){

    // const navigate = useNavigate();
    const [value6, setValue6] = React.useState(new Date('2022-08-01T21:11:54'));
    const [value7, setValue7] = React.useState(new Date('2022-08-02T21:11:54'));
    const [empresaext,setEmpresaext] = useState('');
    const [numeroreportefisico,setNumeroreportefisico] = useState('');
    const [equipoter,setEquipoter] = useState('');

    // const regresarhome= () => {
    //     navigate('/home/mantenimiento')
    // }


    const enviardatoster= () => {

        var externos = {
            feinicio: "",
            fetermino: "",
            empresaext: empresaext,
            numeroreportefisico: numeroreportefisico,
            equipoter: equipoter,
            estadoext:"Pendiente",
            id: uuidv4(),
        };
        sendFirestore(externos);
    }
    const sendFirestore = (externos) => {
        try {
            setDoc(doc(db, "reportes externos",`${externos.id}` ),externos);
              console.log("Reporte agregado")
        } catch (e) {
            console.error("Error adding document: ", e);
        } 
    }


    const handleChange6 = (newValue) => {
        setValue6(newValue);
    };
    const handleChange7 = (newValue) => {
        setValue7(newValue);
    };

    return(
        <>
        <h1> Módulo Tercerizacion</h1>
        <Container>
        <Grid container spacing={4}> 
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            label="Fecha Inicio Actividad"
                                            value={value6}
                                            onChange={handleChange6}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
            </LocalizationProvider>
            </Grid>
        <Grid item xs={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            label="Fecha Culminacion Actividad"
                                            value={value7}
                                            onChange={handleChange7}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
        </Grid>
        <Grid item xs={2}></Grid>
       

        <Grid item xs={12}>
        {/* <legend> Seleccionar la empresa a la que corresponde.</legend> */}
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={empresaexterna}
            onChange={(event,newvalue) =>setEmpresaext(newvalue.label)}
            sx={{ '& > :not(style)': { m: 3, width: '60ch' },}}
            renderInput={(params) => <TextField {...params} label="Seleccionar la empresa a la que corresponde" color="secondary" type="text"   focused />}
        />
        </Grid>

        <Grid item xs={12}>
        {/* <legend> Completar con el número de identificación del reporte.</legend> */}
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 3, width: '60ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Completar con el número de identificación del reporte" color="secondary" focused type="int"  onChange={(e) =>setNumeroreportefisico(e.target.value)}  />      
            </Box>
            </Grid>
            <Grid item xs={12}>
            {/* <legend> Indicar equipo o equipos manipulados. </legend> */}
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 3, width: '70ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Indicar equipo o equipos manipulados" color="secondary" focused type="int"  onChange={(e) =>setEquipoter(e.target.value)}  />      
            </Box>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <div className="mb-3">
            <label className="form-label">Cargar Reporte Físico</label>
            <input className="form-control form-control-sm" id="formFileSm" type="file"/>
            </div>

            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
            
            {/* <Button variant="outlined" startIcon={<DeleteIcon />}className="boton" onClick={regresar}>
                Cancelar</Button> */}
            <Button variant="contained" endIcon={<SendIcon />} onClick={enviardatoster}>
                 Enviar</Button>
            
        </Stack>
        </Grid>
        <Grid item xs={3}></Grid>
        </Grid>
        </Container>
        </>
    );
}

const empresaexterna=[
    { label: 'Softcase'},
    { label: 'Ing. Color'},
    { label: 'Indura'},
    { label: 'Viat'},
    { label: 'Conter'},
]