import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase-config";
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Container } from "reactstrap";
import { uploadBytes, ref } from "firebase/storage";
import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import '../hoja-de-estilos/Ordentrabajo.css';
import '../hoja-de-estilos/Compras.css';

export default function Tercerizacion() {
  const navigate = useNavigate();
  const [value6, setValue6] = React.useState(new Date('2022-08-01T21:09:09'));
  const [value7, setValue7] = React.useState(new Date('2022-08-02T21:09:09'));
  const [empresaext, setEmpresaext] = useState('');
  const [numeroreportefisico, setNumeroreportefisico] = useState('');
  const [equipoter, setEquipoter] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nivelalerta, setNivelalerta] = useState('');
  const [file, setFile] = useState(null);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: 3,
  };

  const handleOpen = () => {
    setModal1(true);
  };
  const handleClose = () => {
    setModal1(false);
  };
  const handleOpen2 = () => {
    setModal2(true);
  };
  const handleClose2 = () => {
    setModal2(false);
    setModal1(false);
    navigate('/home');
  };
  const handleClose3 = () => {
    setModal2(false);
  };

  const regresar = () => {
    navigate('/home')
  };

  const buscarImagen = (e) => {
    if (e.target.files[0] !== undefined) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    } else {
      console.log('no hay archivo');
    }
  };

  const enviardatoster = () => {
    var externos = {};
    var val = Date.now();
    var val1 = value6.toLocaleString('en-US');
    var val2 = value7.toLocaleString('en-US');
    if (numeroreportefisico !== '' && equipoter !== '' && nivelalerta !== '' && codigo!== '' && empresaext !== '') {
      if (file === null) {
        externos = {
          indice: val,
          feinicio: val1,
          fetermino: val2,
          empresaext: empresaext,
          numeroreportefisico: numeroreportefisico,
          equipoter: equipoter,
          codigo: codigo,
          nivelalerta: nivelalerta,
          estadoext: "Pendiente",
          nameImg: 'SP.PNG',
          id: uuidv4(),
        };
        sendFirestore(externos);
        handleOpen();
      } else {
        externos = {
          indice: val,
          feinicio: val1,
          fetermino: val2,
          empresaext: empresaext,
          numeroreportefisico: numeroreportefisico,
          equipoter: equipoter,
          codigo: codigo,
          nivelalerta: nivelalerta,
          estadoext: "Pendiente",
          nameImg: file.name,
          id: uuidv4(),
        };
        sendFirestore(externos);
        sendStorage();
        handleOpen();
      }
    } else {
      console.log('faltan campos');
      var opcion = window.confirm("Faltan Campos. Por favor complete toda la informacion de las casillas en ROJO. ");
      if (opcion === true) {
        navigate('/home/tercerizacion');
        // handleClose();
      }
    };
    setFile(null);

  };
  const sendFirestore = (externos) => {
    try {
      setDoc(doc(db, "reportes externos", `${externos.id}`), externos);
      console.log("Reporte agregado")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const sendStorage = () => {
    //pasar parametros variables
    const storageRef = ref(storage, `externos/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  };

  const handleChange6 = (newValue) => {
    setValue6(newValue);
  };
  const handleChange7 = (newValue) => {
    setValue7(newValue);
  };

  return (
    <>
      <h1 className="titulos"> Módulo Tercerizacion</h1>
      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  fullWidth label="Fecha Inicio Actividad"
                  color="gris"
                  value={value6}
                  onChange={handleChange6}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  fullWidth label="Fecha Culminacion Actividad"
                  value={value7}
                  onChange={handleChange7}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              disableClearable
              id="combo-box-demo"
              options={empresas}
              onChange={(event, newvalue) => setEmpresaext(newvalue.label)}
              renderInput={(params) => <TextField {...params} fullWidth label="Empresa" color={empresaext !== '' ? "gris" : "oficial"} type="text" focused />}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField color={numeroreportefisico !== '' ? "gris" : "oficial"} fullWidth label="Número de identificación del reporte" focused type="int" onChange={(e) => setNumeroreportefisico(e.target.value)} />
          </Grid>

          <Grid item xs={6}>
            <TextField color={codigo !== '' ? "gris" : "oficial"} fullWidth label="Código Equipo" focused type="int" onChange={(e) => setCodigo(e.target.value)} />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              disableClearable
              id="combo-box-demo"
              options={equipo}
              onChange={(event, newvalue) => setEquipoter(newvalue.label)}
              renderInput={(params) => <TextField {...params} fullWidth label="Equipo" color={equipoter !== '' ? "gris" : "oficial"} type="text" focused />}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              disableClearable
              id="combo-box-demo"
              options={nivel}
              onChange={(event, newvalue) => setNivelalerta(newvalue.label)}
              renderInput={(params) => <TextField {...params} fullWidth label="Nivel Alerta" color={nivelalerta !== '' ? "gris" : "oficial"} type="text" focused />}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="mb-3">
              <label className="form-label">Cargar Reporte Físico</label>
              <input className="form-control " onChange={buscarImagen} type="file" id="formFile" />
            </div>

            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >

              <Button variant="outlined" color="cancelarcp" startIcon={<DeleteIcon />} className="boton" onClick={regresar}>
                Cancelar</Button>
              <Button variant="contained" color="enviarcp" className="botone" endIcon={<SendIcon />} onClick={enviardatoster}>
                Enviar</Button>

            </Stack>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Container>
      <Modal
        open={modal1}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Su solicitud fue enviada</h2>
          <Button onClick={handleOpen2}>Salir</Button>
          <Button onClick={handleClose}>Nueva Orden</Button>
          <Modal
            hideBackdrop
            open={modal2}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 200 }}>
              {/* <h2 id="child-modal-title">Text in a child modal</h2> */}
              <p id="child-modal-description">
                Esta seguro que desea salir?
              </p>
              <Button onClick={handleClose2}>Si</Button>
              <Button onClick={handleClose3}>No</Button>
            </Box>
          </Modal>
        </Box>
      </Modal>
    </>
  );
}

const empresas = [
  { label: 'Softcase' },
  { label: 'Ing. Color' },
  { label: 'Indura' },
  { label: 'Viat' },
  { label: 'Conter' },
  { label: 'Corpoimpex' },
]

const nivel = [
  { label: 'Funcional' },
  { label: 'No Funcional' },
]

const equipo = [
  { label: 'Máquina de Anestesia' },
  { label: 'Monitor Multiparámetros' },
  { label: 'Bomba de Infusión' },
  { label: 'Electrocardiograma' },
  { label: 'Cama' },
  { label: 'Desfibrilador' },
  { label: 'Monitor Fetal' },
]