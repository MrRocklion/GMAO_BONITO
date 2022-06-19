import React, { useState } from "react";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Fechacomponent from "../components/Fecha";
import Tiempocomponent from "../components/Hora";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { v4 as uuidv4 } from 'uuid';

export default function Tercerizacion(){

    // const navigate = useNavigate();
    const [empresaext,setEmpresaext] = useState('');
    const [numeroreportefisico,setNumeroreportefisico] = useState('');
    const [equipoter,setEquipoter] = useState('');

    // const regresarhome= () => {
    //     navigate('/home/mantenimiento')
    // }


    const enviardatoster= async(orden) => {
        try {
          const docRef = await addDoc(collection(db, "reportes externos"), {
           fechaext: "Hola",
           empresaext: empresaext,
           numeroreportefisico: numeroreportefisico,
           equipoter: equipoter,
           estadoext:"Pendiente",
            id: uuidv4(),


          });
          console.log("Holiss");
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    return(
        <>
        <h1> Módulo Tercerizacion</h1>
        <legend> 1. Indicar la fecha y hora en la que emitio la solicitud</legend> 
        <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" color="secondary" >
        <div className="Fecha Solicitud">
        <Fechacomponent/>
        </div>

        <div className="Fecha Solicitud">
        <Tiempocomponent/>
        </div>
        </Stack>

        <legend> 2. Seleccionar la empresa a la que corresponde.</legend>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={empresaexterna}
            onChange={(event,newvalue) =>setEmpresaext(newvalue.label)}
            sx={{ '& > :not(style)': { m: 3, width: '100ch' },}}
            renderInput={(params) => <TextField {...params} label="Empresa" color="secondary" type="text"   focused />}
        />

        <legend> 3. Completar con el número de identificación del reporte.</legend>
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 3, width: '100ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Número de Reporte" color="secondary" focused type="int"  onChange={(e) =>setNumeroreportefisico(e.target.value)}  />      
            </Box>

            <legend> 4. Indicar equipo o equipos manipulados. </legend>
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 3, width: '100ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Equipos" color="secondary" focused type="int"  onChange={(e) =>setEquipoter(e.target.value)}  />      
            </Box>

            <legend> Cargar imagen o documento del reporte físico </legend>


            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
            
            {/* <Button variant="outlined" startIcon={<DeleteIcon />}className="boton" onClick={regresar}>
                Cancelar</Button> */}
            <Button variant="contained" endIcon={<SendIcon />} onClick={enviardatoster}>
                 Enviar</Button>
            
        </Stack>
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