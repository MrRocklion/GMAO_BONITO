import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Fechacomponent from "../components/Fecha";
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'

export default function Formularioscompras(){
    const navigate = useNavigate();
    const [cedulacom, setCedulacom] = useState('');
    const [codigoeqcom, setCodigoeqcom] = useState('');
    const [equipocom, setEquipocom] = useState('');
    const [articulocom, setarticulocom] = useState('');
    const [cantidadcom, setCantidadcom] = useState('');
    const [preciocom, setPreciocom] = useState('');
    const [proveedorcom, setProveedorcom] = useState('');

    const cancelar= () => {
        navigate('/home/inventario/solicitudcompra')
    }

    const enviardatos4 = async (reporte) => {
        try {
            const docRef = await addDoc(collection(db, "compras"), {
                fechacom:"Hola",
                cedulacom: cedulacom,
                codigoeqcom: codigoeqcom,
                equipocom: equipocom,
                articulocom: articulocom,
                cantidadcom: cantidadcom,
                preciocom: preciocom,
                proveedorcom: proveedorcom,
                estadocom:"En Proceso",
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
        {/* <h1> Solicitud de Compra </h1>
        {/* <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
            {/* {<Button variant="contained" color='success' className="boton" onClick={agregarsolequipo}>Solicitud Nuevo Equipo</Button>}
            {<Button variant="contained" color='success' className="boton" onClick={agregarsolarticulo}>Solicitud Artículo</Button>} */}
            {/* </Stack> */}  

        <h1> Solicitud de Compra</h1>
        <div className="Fecha Inicio">
                <Fechacomponent />
            </div>
        {/* <legend> Completar con el número de identificación de la persona que envía la solicitud.</legend> */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 3, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Número de Cédula Técnico" color="secondary" focused type="int" onChange={(e) =>setCedulacom(e.target.value)} />
            </Box>
            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" color="secondary" >
        {/* <legend> Completar con el codigo del equipo.</legend>     */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 3, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Código Equipo" color="secondary" focused type="int" onChange={(e) =>setCodigoeqcom(e.target.value)} />
            </Box>

            {/* <legend> Describir el equipo.</legend>     */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 3, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Equipo" color="secondary" focused type="int" onChange={(e) =>setEquipocom(e.target.value)} />
            </Box>  
            </Stack>

            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" color="secondary" >
            {/* <legend> Describir el articulo.</legend>     */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 3, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Articulo" color="secondary" focused type="int" onChange={(e) =>setarticulocom(e.target.value)} />
            </Box>
            {/* <legend> Cantidad</legend>     */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 3, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Cantidad" color="secondary" focused type="int" onChange={(e) =>setCantidadcom(e.target.value)} />
            </Box> 

            {/* <legend> Precio.</legend>     */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 3, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Precio" color="secondary" focused type="int" onChange={(e) =>setPreciocom(e.target.value)} />
            </Box>         

            {/* <legend> Proveedor</legend>     */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 3, width: '45ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="Proveedor" color="secondary" focused type="int" onChange={(e) =>setProveedorcom(e.target.value)} />
            </Box> 
            </Stack>  
            <legend> Documento Proforma</legend>    
                        <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                        <Button variant="outlined" startIcon={<DeleteIcon />}className="boton" onClick={cancelar}>
                    Cancelar</Button>
                <Button variant="contained" endIcon={<SendIcon />} onClick={enviardatos4}>
                     Enviar</Button>
            </Stack>        
        </>
    );
}



