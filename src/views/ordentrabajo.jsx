import React, { useState } from "react";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { v4 as uuidv4 } from 'uuid';
import { Container } from "reactstrap";
import Grid from "@mui/material/Grid"


export default function Ordentrabajoview() {
    const navigate = useNavigate();
    const [cedula, setCedula] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [prioridad1, setPrioridad1] = useState('');
    const [tipotrabajo, setTipotrabajo] = useState('');
    const [asunto, setAsunto] = useState('');
    const [problematica, setProblematica] = useState('');
    const [observaciones, setObservaciones] = useState('');



    const regresar = () => {
        navigate('/home/mantenimiento')
    }


    const enviardatos = () => {
        var val = Date.now();
        var val2 = new Date(val);
        var val3 = val2.toLocaleDateString("en-US");
        console.log(val);
        console.log(val3);
        var orden = {
            fecha:val3,
            indice:val,
            cedula: cedula,
            departamento: departamento,
            prioridad1: prioridad1,
            tipotrabajo: tipotrabajo,
            asunto: asunto,
            problematica: problematica,
            observaciones: observaciones,
            estado: "Pendiente",
            id: uuidv4(),
        }
        sendFirestore(orden);

    }
    const sendFirestore = (orden) => {
        try {
            setDoc(doc(db, "ordenes", `${orden.id}`), orden);
            console.log("Orden agregada")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <h1>Orden de Trabajo</h1>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <p> El formulario en línea constará de 4 secciones que permitirán determinar los problemas y atender adecuadamente la solicitud. Por favor, responda todos los campos de manera específica. </p>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>


                <legend> Completar con el número de identificación de la persona que envía la solicitud.</legend>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Número de Cédula" color="secondary" focused type="int" onChange={(e) => setCedula(e.target.value)} />
                </Box>

                <legend> Seleccionar el departamento en el que se encuentra el problema.</legend>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={departamentos}
                    onChange={(event, newvalue) => setDepartamento(newvalue.label)}
                    sx={{ '& > :not(style)': { m: 3, width: '100ch' }, }}
                    renderInput={(params) => <TextField {...params} label="Departamento Solicitante" color="secondary" type="text" focused />}
                />

                <legend> Seleccionar la prioridad del trabajo</legend>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={prioridad}
                    onChange={(event, newvalue) => setPrioridad1(newvalue.label)}
                    sx={{ '& > :not(style)': { m: 3, width: '100ch' }, }}
                    renderInput={(params) => <TextField {...params} label="Prioridad de Trabajo" color="secondary" focused />}
                />

                <legend> Seleccionar el tipo de trabajo que requiere</legend>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={tipos}
                    onChange={(event, newvalue) => setTipotrabajo(newvalue.label)}
                    sx={{ '& > :not(style)': { m: 3, width: '100ch' }, }}
                    renderInput={(params) => <TextField {...params} label="Tipo de Trabajo" color="secondary" focused />}
                />

                <legend> Identificar el equipo que presenta el problema</legend>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Asunto" color="secondary" focused type="text" onChange={(e) => setAsunto(e.target.value)} />
                </Box>
                <legend> Especificar el inconveniente que presentó el equipo</legend>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Problemática" color="secondary" focused type="text" onChange={(e) => setProblematica(e.target.value)} />
                </Box>
                <legend>Observaciones</legend>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Observaciones" color="secondary" focused type="text" onChange={(e) => setObservaciones(e.target.value)} />
                </Box>

                <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >

                    <Button variant="outlined" startIcon={<DeleteIcon />} className="boton" onClick={regresar}>
                        Cancelar</Button>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={enviardatos}>
                        Enviar</Button>

                </Stack>
            </Container>
        </>
    );
}

const departamentos = [
    { label: 'Ambulancia' },
    { label: 'Esterilización' },
    { label: 'Fisioterapia' },
    { label: 'Hospital del Día' },
    { label: 'Hospitalización' },
    { label: 'Imágenes ' },
    { label: 'Laboratorio Clínico ' },
    { label: 'Quirófano ' },
    { label: 'Recuperación ' },
    { label: 'UCI Adultos ' },
    { label: 'UCI Intermedio ' },
    { label: 'UCI Neonatal' },
    { label: 'UCI Pediátrica' },
]

const prioridad = [
    { label: 'Media (Menor a 15 días)' },
    { label: 'Alta (Menor a 7 días)' },
    { label: 'Crítica (EMERGENCIA)' },
]

const tipos = [
    { label: 'Equipo Médico' },
    { label: 'Infraestructura' },
    { label: 'Sistema de Cómputo' },
    { label: 'Sistema Eléctrico' },
    { label: 'Civil / Plomería' },
    { label: 'Carpintería / Mobiliario' },
]

// const tmantenimientos=[
//     { label: 'Mantenimiento Preventivo (Revisión rutinaria del funcionamiento del equipo)'},
//     { label: 'Mantenimiento Correctivo (Corrección de algún problema/fallo del equipo)'},
//     { label: 'Mantenimiento Externo (Requiere una empresa externa de mantenimiento)'},
// ]
