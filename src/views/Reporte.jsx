import React, { useState } from "react";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Fechacomponent from "../components/Fecha";
import Fechacomponent2 from "../components/Fechatermino";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Informeview() {
    const navigate = useNavigate();
    const [codigo, setCodigo] = useState('');
    const [cedulat, setCedulat] = useState('');
    const [codigoe, setCodigoe] = useState('');
    // const [equipor,setEquipor] = useState('');
    // const [marcar,setMarcar] = useState('');
    // const [modelor,setModelor] = useState('');
    // const [serier,setSerier] = useState('');
    const [actividades, setActividades] = useState('');
    const [estadoequipo, setEstadoequipo] = useState('');
    const [repuestos, setRepuestos] = useState('');
    const [costo, setCosto] = useState('');
    const [observaciones1, setObservaciones1] = useState('');
    const [verificador, setVerificador] = useState('');

    const regresar1 = () => {
        navigate('/home/reportes/reportes')
    }

    const enviardatos1 = async (reporte) => {
        try {
            const docRef = await addDoc(collection(db, "reportes"), {
                codigo: codigo,
                fechai: "Inicio",
                fechat: "Termino",
                cedulat: cedulat,
                codigoe: codigoe,
                // equipor:equipor,
                // marcar:marcar,
                // modelor:modelor,
                // serier:serier,
                actividades: actividades,
                estadoequipo: estadoequipo,
                repuestos: repuestos,
                costo: costo,
                observaciones1: observaciones1,
                verificador: verificador,
            });
            console.log("Holiss");
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
            <h1>Reporte Mantenimiento</h1>
            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" color="secondary" >
                <div className="Fecha Inicio">
                    <Fechacomponent />
                </div>
                <div className="Fecha Termino">
                    <Fechacomponent2 />
                </div>
            </Stack>

            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" color="secondary" >
                {/* <legend> Indicar el codigo de la orden de trabajo atendida.</legend> */}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Código O/T" color="info" focused type="int" onChange={(e) => setCodigo(e.target.value)} />
                </Box>
                {/* <legend> Completar con el número de identificación de la persona que envía la solicitud.</legend> */}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Código Empleado" color="info" focused type="int" onChange={(e) => setCedulat(e.target.value)} />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Código Equipo" color="info" focused type="int" onChange={(e) => setCodigoe(e.target.value)} />
                </Box>
            </Stack>


            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" color="secondary" >
                {/* <legend> Indicar el estado del equipo </legend> */}
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={estadoequip}
                    onChange={(event, newvalue) => setEstadoequipo(newvalue.label)}
                    sx={{ '& > :not(style)': { m: 2, width: '45ch' }, }}
                    renderInput={(params) => <TextField {...params} label="Estado de la Actividad" color="info" type="text" focused />}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={tipomant}
                    onChange={(event, newvalue) => setEstadoequipo(newvalue.label)}
                    sx={{ '& > :not(style)': { m: 2, width: '45ch' }, }}
                    renderInput={(params) => <TextField {...params} label="Tipo de Mantenimiento" color="info" type="text" focused />}
                />

            </Stack>

            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" color="secondary" >
            <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={alerta}
                    onChange={(event, newvalue) => setEstadoequipo(newvalue.label)}
                    sx={{ '& > :not(style)': { m: 2, width: '45ch' }, }}
                    renderInput={(params) => <TextField {...params} label="Nivel de alerta" color="warning" type="text" focused />}
                />
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Falla Reportada" color="warning" focused type="text" onChange={(e) => setActividades(e.target.value)} />
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Causas" color="warning" focused type="text" onChange={(e) => setActividades(e.target.value)} />
            </Box>
            </Stack>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '100ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Actividades realizadas" color="warning" focused type="text" onChange={(e) => setActividades(e.target.value)} />
            </Box>
            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" color="secondary" >

            {/* <legend> Indicar si existe repuestos cambiados o repuestos por comprar. </legend> */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Horas de Servicio Perdidas" color="secondary" focused type="text" onChange={(e) => setRepuestos(e.target.value)} />
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Repuestos cambiados o requeridos" color="secondary" focused type="text" onChange={(e) => setRepuestos(e.target.value)} />
            </Box>
            {/* <legend> Indicar el costo de reparacion. </legend> */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Costo de la reparación" color="secondary" focused type="int" onChange={(e) => setCosto(e.target.value)} />
            </Box>
            </Stack>
            {/* <legend> Indicar si existe una observación o novedad a tener presente, sobre la solicitud, personal, entre otras. </legend> */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '100ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Observaciones" color="secondary" focused type="text" onChange={(e) => setObservaciones1(e.target.value)} />
            </Box>
            {/* <legend> Indicar el número de identificación del personal que recibe de manera satisfactoria el trabajo. </legend> */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '100ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Verificador" color="secondary" focused type="int" onChange={(e) => setVerificador(e.target.value)} />
            </Box>
            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >

                <Button variant="outlined" startIcon={<DeleteIcon />} className="boton" onClick={regresar1}>
                    Cancelar</Button>
                <Button variant="contained" endIcon={<SendIcon />} onClick={enviardatos1}>
                    Enviar</Button>
            </Stack>
        </>
    );

}

const estadoequip = [
    { label: 'Reparado Completamente' },
    { label: 'Reparado Parcialmente' },
    { label: 'En espera de Repuestos' },
    { label: 'Baja' },
]

const tipomant = [
    {label: 'Preventivo'},
    {label: 'Correctivo'},
]

const alerta =[
    {label: 'Crítico'},
    {label: 'Medio'},
    {label: 'Bajo'},
]



    //     const [codigo,setCodigo] = useState('');
    //     const [cedulat,setCedulat] = useState('');
    //     const [actividades,setActividades] = useState('');
    //     const [estadoequipo,setEstadoequipo] = useState('');
    //     const [repuestos,setRepuestos] = useState('');
    //     const [costo,setCosto] = useState('');
    //     const [observaciones1,setObservaciones1] = useState('');
    //     const [verificador,setVerificador] = useState('');



    // const enviardatos1= async(orden) => {
    //     try {
    //       const docRef = await addDoc(collection(db, "ordenes"), {
    //         codigo: codigo,
    //         cedulat:cedulat,
    //         actividades:actividades,
    //         estadoequipo:estadoequipo,
    //         repuestos:repuestos,
    //         costo:costo,
    //         observaciones1: observaciones1,
    //         verificador:verificador,


    // //       });
    //       console.log("Holiss");
    //       console.log("Document written with ID: ", docRef.id);
    //     } catch (e) {
    //       console.error("Error adding document: ", e);
    //     }
    // // }