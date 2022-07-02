import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { setDoc, doc } from "firebase/firestore";
import { uploadBytes,ref } from "firebase/storage";
import { db,storage } from "../firebase/firebase-config";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import {Container} from "reactstrap";
import Grid from "@mui/material/Grid"
import { useNavigate } from 'react-router-dom'

export default function Formularioscompras() {
    const navigate = useNavigate();
    const [cedulacom, setCedulacom] = useState('');
    const [codigoeqcom, setCodigoeqcom] = useState('');
    const [equipocom, setEquipocom] = useState('');
    const [articulocom, setarticulocom] = useState('');
    const [cantidadcom, setCantidadcom] = useState('');
    const [preciocom, setPreciocom] = useState('');
    const [proveedorcom, setProveedorcom] = useState('');
    const [file,setFile]= useState(null);
    const cancelar = () => {
        navigate('/home/inventario/solicitudcompra')
    }
    const buscarImagen = (e) =>{
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    const sendData = () =>{
        var val = Date.now();
        var val2 = new Date(val);
        var val3 = val2.toLocaleDateString("en-US");
        console.log(val);
        console.log(val3);
        var compra = {
            fechacom: val3,
            indice: val,
            cedulacom: cedulacom,
            codigoeqcom: codigoeqcom,
            equipocom: equipocom,
            articulocom: articulocom,
            cantidadcom: cantidadcom,
            preciocom: preciocom,
            proveedorcom: proveedorcom,
            comentariocom:"",
            estadocom: "En Proceso",
            nameImg: file.name,
            // comentarios:" hola ",
            id:uuidv4(),
          };

          sendFirestore(compra);
          sendStorage();
    }
    const sendFirestore = (compra) => {
        try {
            setDoc(doc(db, "compras",`${compra.id}` ),compra);
              console.log("Solicitud agregada")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    const sendStorage = () =>{
        //pasar parametros variables
        const storageRef = ref(storage, `${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
    };
    return (
        <>

            <h1> Solicitud de Compra</h1>
            <Container>

            <Grid container spacing={4}>

            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
            <Box component="form" sx={{ '& > :not(style)': { m: 3, width: '45ch' },}}noValidateautoComplete="off">
                <TextField label="Número de Cédula Técnico" color="secondary" focused type="int" onChange={(e) => setCedulacom(e.target.value)} />
            </Box>
            </Grid>
            <Grid item xs={4}>
{/* <legend> Completar con el codigo del equipo.</legend>     */}
<Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Código Equipo" color="secondary" focused type="int" onChange={(e) => setCodigoeqcom(e.target.value)} />
                </Box>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
                {/* <legend> Describir el equipo.</legend>     */}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Equipo" color="secondary" focused type="int" onChange={(e) => setEquipocom(e.target.value)} />
                </Box>
                </Grid>
                <Grid item xs={4}>
                {/* <legend> Describir el articulo.</legend>     */}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Articulo" color="secondary" focused type="int" onChange={(e) => setarticulocom(e.target.value)} />
                </Box>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                {/* <legend> Cantidad</legend>     */}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Cantidad" color="secondary" focused type="int" onChange={(e) => setCantidadcom(e.target.value)} />
                </Box>
                </Grid>
                <Grid item xs={4}>
                {/* <legend> Precio.</legend>     */}
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Precio" color="secondary" focused type="int" onChange={(e) => setPreciocom(e.target.value)} />
                </Box>
                </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
 {/* <legend> Proveedor</legend>     */}
 <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField label="Proveedor" color="secondary" focused type="int" onChange={(e) => setProveedorcom(e.target.value)} />
                </Box>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <div className="mb-3">
                <label className="form-label">Cargar proforma</label>
                <input className="form-control" onChange={buscarImagen} type="file" id="formFile" />
            </div>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={12}>
            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                <Button variant="outlined" startIcon={<DeleteIcon />} className="boton" onClick={cancelar}>
                    Cancelar</Button>
                <Button variant="contained" endIcon={<SendIcon />} onClick={sendData}>
                    Enviar</Button>
            </Stack>
            </Grid>
            </Grid>
            </Container>
        </>
    );
}



