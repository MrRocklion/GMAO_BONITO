import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/Grid";
import { db,storage } from "../firebase/firebase-config";
import { collection, setDoc, query, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import Stack from '@mui/material/Stack';
import { v4 as uuidv4 } from 'uuid';
import { uploadBytes,ref,getDownloadURL } from "firebase/storage";


export default function Manual(){

    const [data, setData] = useState([]);
    const [modalInsertar, setModalinsertar] = useState(false);
    const [modalArchivo, setModalarchivo] = useState(false);
    const [cequipo, setCequipo]= useState('');
    const [equipo, setEquipo]= useState('');
    const [file,setFile]= useState(null);
    const [url, setUrl] = useState("");




    const buscarArchivo = (e) =>{
        if (e.target.files[0] !== undefined) {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
        }else{
            console.log('no hay archivo');
        }
    };

    const getData = async () => {
        const reference = query(collection(db, "manuales"));
        onSnapshot(reference, (querySnapshot) => {
            console.log(querySnapshot.docs)
            setData(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });
    };

    const sendData = () =>{
        var manual = {};
        var val = Date.now();
        if (file === null ){
            manual= {
                cequipo:cequipo,
                equipo:equipo,
                indice: val,
                nameImg: 'SP.PNG',
                // comentarios:" hola ",
                id:uuidv4(),
              };
              sendFirestore(manual);
        }else{
         manual = {
            cequipo:cequipo,
                equipo:equipo,
                indice: val,
            nameImg: file.name,
            id:uuidv4(),
          };
          sendFirestore(manual);
          sendStorage();
        }
        setFile(null);
        cerrarModalInsertar();
    };

    const sendFirestore = (manual) => {
        try {
            setDoc(doc(db, "manuales",`${manual.id}` ),manual);
              console.log("Manual agregada")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const sendStorage = () =>{
        //pasar parametros variables
        const storageRef = ref(storage, `manualequipos/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
    };
    const mostrarModalInsertar = () => {
        setModalinsertar(true);
    };

    const cerrarModalInsertar = () => {
        setModalinsertar(false);
    };

    const mostrarModalArchivo = (dato) => {
        descargararchivo(dato.nameImg);
        setModalarchivo(true);
    };

    const cerrarModalArchivo = () => {
       setModalarchivo(false);
    };

    const eliminar = async (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            await deleteDoc(doc(db, "manuales", `${dato.id}`));
            // setModalactualizar(false);
        }
    };
    const descargararchivo = (nombre) => {
        getDownloadURL(ref(storage, `manualequipos/${nombre}`)).then((url) => {
            console.log(url);
            setUrl(url);
        })

    };

    useEffect(() => {
        getData();
    }, [])
    return(
        <>
<Container>
                <br />
                <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                <Button color="success" onClick={() => mostrarModalInsertar()}>Agregar Manual</Button>
                </Stack>
                <br />
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Código Equipo</th>
                            <th>Equipo</th>
                            <th>Archivo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.sort((a, b) => (a.indice - b.indice)).map((manual, index) => (
                            <tr key={manual.indice} >
                                <td>{index+1}</td>
                                <td>{manual.cequipo}</td>
                                <td>{manual.equipo}</td>
                                <td>
                                    <IconButton aria-label="delete" color="success" onClick={() => mostrarModalArchivo(manual)}><InfoIcon /></IconButton>

                                </td>
                                <td>
                                    <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                                        <Button color="danger" onClick={() => eliminar(manual)}>Eliminar</Button>
                                    
                                    </Stack>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Modal className="{width:0px}" isOpen={modalInsertar}>
            <ModalHeader>
                    <div><h3>Insertar</h3></div>
                </ModalHeader>
                <ModalBody>
                <FormGroup>
                <Grid container spacing={4}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                <label>
                                    Codigo Equipo:
                                </label>
                                <input
                                    className="form-control"
                                    name="cequipo"
                                    type="text"
                                    onChange={(e)=>{setCequipo(e.target.value)}}
                                />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                <label>
                                    Equipo:
                                </label>
                                <input
                                    className="form-control"
                                    name="cequipo"
                                    type="text"
                                    onChange={(e)=>{setEquipo(e.target.value)}}
                                />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
            <div className="mb-3">
                <label className="form-label">Cargar Manual</label>
                <input className="form-control" onChange={buscarArchivo} type="file" id="formFile" />
            </div>
            </Grid>
            <Grid item xs={1}></Grid>
                </Grid>
                </FormGroup>
                       
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => sendData()}
                    >
                        Insertar
                    </Button>
                    <Button
                        className="btn btn-danger"
                        onClick={() => cerrarModalInsertar()}
                    >
                        Cancelar
                    </Button>
                </ModalFooter> 
            </Modal>

            <Modal isOpen={modalArchivo}>
                <ModalHeader>
                    <div><h1>Informacion Manual</h1></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Grid container spacing={4}>
                            <Grid className="fila" item xs={12}>
                                    <label className="archivo">
                                        Archivo:
                                    </label>
                                    <a
                                        component="button"
                                        variant="body2" 
                                        href={url}
                                        target="_blank" 
                                        rel="noreferrer"
                                    >
                                        Visualizar Manual
                                    </a>
                                </Grid >
                        </Grid>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={() => cerrarModalArchivo()}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}