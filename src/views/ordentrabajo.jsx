import React, { useState } from "react";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Fechacomponent from "../components/Fecha";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { v4 as uuidv4 } from 'uuid';


export default function Ordentrabajoview(){
    const navigate = useNavigate();
    const [cedula,setCedula] = useState('');
    const [departamento,setDepartamento] = useState('');
    const [prioridad1,setPrioridad1] = useState('');
    const [tipotrabajo,setTipotrabajo] = useState('');
    const [asunto,setAsunto] = useState('');
    const [problematica,setProblematica] = useState('');
    const [observaciones,setObservaciones] = useState('');
   


    const regresar= () => {
        navigate('/home/mantenimiento')
    }


    const enviardatos= async(orden) => {
        try {
          const docRef = await addDoc(collection(db, "ordenes"), {
            cedula: cedula,
            departamento: departamento,
            prioridad1: prioridad1,
            tipotrabajo: tipotrabajo,
            asunto: asunto,
            problematica: problematica,
            observaciones: observaciones,
            estado:"Pendiente",
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
       
        <h1>Orden de Trabajo</h1>
        <p> El formulario en línea constará de 4 secciones que permitirán determinar los problemas y atender adecuadamente la solicitud. Por favor, responda todos los campos de manera específica. </p>
        
        <legend> 1. Indicar la fecha y hora en la que emite la solicitud</legend>
        <div className="Fecha">
        <Fechacomponent/>
        </div>
        <legend> 2. Completar con el número de identificación de la persona que envía la solicitud.</legend>
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 3, width: '100ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Número de Cédula" color="secondary" focused type="int"  onChange={(e) =>setCedula(e.target.value)}  />      
            </Box>

        <legend> 3. Seleccionar el departamento en el que se encuentra el problema.</legend>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={departamentos}
            onChange={(event,newvalue) =>setDepartamento(newvalue.label)}
            sx={{ '& > :not(style)': { m: 3, width: '100ch' },}}
            renderInput={(params) => <TextField {...params} label="Departamento Solicitante" color="secondary" type="text"   focused />}
        />

        <legend> 4. Seleccionar la prioridad del trabajo</legend>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={prioridad}
            onChange={(event,newvalue) =>setPrioridad1(newvalue.label)}
            sx={{ '& > :not(style)': { m: 3, width: '100ch' },}}
            renderInput={(params) => <TextField {...params} label="Prioridad de Trabajo" color="secondary" focused />}
        />

        <legend> 5. Seleccionar el tipo de trabajo que requiere</legend>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={tipos}
            onChange={(event,newvalue) =>setTipotrabajo(newvalue.label)}
            sx={{ '& > :not(style)': { m: 3, width: '100ch' },}}
            renderInput={(params) => <TextField {...params} label="Tipo de Trabajo" color="secondary" focused />}
        />

        <legend> 6. Identificar el equipo que presenta el problema</legend>
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 3, width: '100ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Asunto" color="secondary" focused type="text"  onChange={(e) =>setAsunto(e.target.value)} />      
            </Box>        
        <legend> 7. Especificar el inconveniente que presentó el equipo</legend>
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 3, width: '100ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Problemática" color="secondary" focused type="text"  onChange={(e) =>setProblematica(e.target.value)} />      
            </Box>
        <legend>Observaciones</legend>     
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 3, width: '100ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Observaciones" color="secondary" focused type="text"  onChange={(e) =>setObservaciones(e.target.value)}/>      
            </Box>

            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
            
                <Button variant="outlined" startIcon={<DeleteIcon />}className="boton" onClick={regresar}>
                    Cancelar</Button>
                <Button variant="contained" endIcon={<SendIcon />} onClick={enviardatos}>
                     Enviar</Button>
                
            </Stack>

        </>
    );
}

const departamentos = [
    { label: 'Ambulancia'},
    { label: 'Esterilización'},
    { label: 'Fisioterapia'},  
    { label: 'Hospital del Día'}, 
    { label: 'Hospitalización'},  
    { label: 'Imágenes '},  
    { label: 'Laboratorio Clínico '},  
    { label: 'Quirófano '},  
    { label: 'Recuperación '},  
    { label: 'UCI Adultos '},  
    { label: 'UCI Intermedio '},  
    { label: 'UCI Neonatal'},   
    { label: 'UCI Pediátrica'}, 
]

const prioridad=[
    { label: 'Baja (Prorrogable)'},
    { label: 'Media (Menor a 30 días)'},
    { label: 'Alta (Menor a 7 días)'},
    { label: 'Crítica (EMERGENCIA)'},
]

const tipos=[
    { label: 'Equipo Médico'},
    { label: 'Sistema de Cómputo'},
    { label: 'Sistema Eléctrico'},
    { label: 'Sistema Mecánico'},
    { label: 'Civil / Plomería'},
    { label: 'Carpintería / Mobiliario'},
]

// const tmantenimientos=[
//     { label: 'Mantenimiento Preventivo (Revisión rutinaria del funcionamiento del equipo)'},
//     { label: 'Mantenimiento Correctivo (Corrección de algún problema/fallo del equipo)'},
//     { label: 'Mantenimiento Externo (Requiere una empresa externa de mantenimiento)'},
// ]
