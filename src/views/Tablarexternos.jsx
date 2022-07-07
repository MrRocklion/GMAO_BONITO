import React, { useEffect, useState } from "react";
import { query, collection,doc, deleteDoc,updateDoc,onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Stack from '@mui/material/Stack';
import { storage } from "../firebase/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Button,
    ModalFooter,
} from "reactstrap";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


export default function Reportexterno() {

    const [elementosext, setElementosext] = useState([]);
    const [modalActualizar, setModalactualizar] = useState(false);
    const [modalInformacion, setModalinformacion] = useState(false);
    const [cambioex,setCambioex]=useState("");
    const [currentform, setCurrentform]= useState({});
    const [url, setUrl] = useState("");

    const getData13 = async () => {
        const reference = query(collection(db, "reportes externos"));
        onSnapshot(reference, (querySnapshot) => {
            console.log(querySnapshot.docs)
            setElementosext(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });
    }
    console.log(elementosext);


    const vistaedi = (data) => {
        setCurrentform(data);
        setCambioex("Reparado Completamente");
        setModalactualizar(true);
    };

    const cerrarvistaedi =()=>{
        setModalactualizar(false);
    };

    const vistainformacion = (data) => {
        setCurrentform(data);
        descargararchivo(data.nameImg);
        setModalinformacion(true);
    };

    const cerrarvistainformacion = () => {
        setModalinformacion(false);
    };

    const cambiarestado = async (id) => {
        console.log("Se cambio el estado");
        setModalactualizar(false);
        const ref= doc(db, "reportes externos", `${id}`);
        await updateDoc(ref, {estadoext:cambioex});
        console.log("Se actualizaron los datos");
    };

    const selecEst = (e)=>{
        console.log(e.target.value);
        setCambioex(e.target.value);
    };

    const descargararchivo = (nombre) => {
        getDownloadURL(ref(storage, `externos/${nombre}`)).then((url) => {
            console.log(url);
            setUrl(url);
        })
    };

    const eliminar = async (id) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento ");
        if (opcion === true) {
            await deleteDoc(doc(db, "reportes externos", `${id}`));
            setModalactualizar(false);
        }
    };
 
    useEffect(() => {
        getData13();
    }, [])

    return (
        <>
            <h1> Estatus Reportes Externos</h1>
            <div style={{ height: 800, width: '100%' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <table className='table table-light table-hover'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Empresa</th>
                                        <th>N.Reporte</th>
                                        <th>Equipo</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                        <th>Información</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {elementosext.sort((a, b) => (a.indice - b.indice)).map((rexterno, index) => (
                                        <tr key={rexterno.indice}>
                                            <td>{index + 1}</td>
                                            <td>{rexterno.empresaext}</td>
                                            <td>{rexterno.numeroreportefisico}</td>
                                            <td>{rexterno.equipoter}</td>
                                            <td>{rexterno.estadoext}</td>
                                            <td>
                                            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                                            {/* <Button
                                            color="primary" onClick={() => { vistaedi(rexterno) }}>Cambiar Estado </Button>{" "}
                                                <Button color="danger" onClick={() => eliminar(rexterno.id)}>Eliminar</Button> */}
                                                <button className="btn btn-outline-warning"  onClick={() => { vistaedi(rexterno) }}>Cambiar Estado</button>
                                                <button className="btn btn-outline-danger"  onClick={() => eliminar(rexterno.id)}>Eliminar</button>
                                                </Stack>
                                            </td>
                                            <td>
                                            <IconButton aria-label="delete" onClick={() => { vistainformacion(rexterno) }} color="gris"><InfoIcon /></IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modalInformacion}>
            <Container>
            <ModalHeader>
                        <div><h1>Informacion Reporte</h1></div>
                    </ModalHeader>
                    <ModalBody>
                    <FormGroup>
                    <Grid container spacing={4}>
                    <Grid item xs={6}>
                    <label>
                                    Inicio Mantenimiento:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={currentform.feinicio}
                                    />
                    </Grid>

                    <Grid item xs={6}>
                    <label>
                                        Final Mantenimiento:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={currentform.fetermino}
                                    />
                    </Grid>
                    
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
                                        Visualizar Proforma
                                    </a>
                                </Grid >
                    </Grid>
                        </FormGroup> 
                    </ModalBody>
                    <ModalFooter className="modal-footer">
                    <Button
                        className="editar"
                        onClick={cerrarvistainformacion}
                    >
                        Cerrar
                    </Button>
                        {/* <button className="btn btn-success" onClick={cerrarvistainformacion}>Cerrar</button> */}
                    </ModalFooter>
            </Container>
            </Modal>
            <Modal isOpen={modalActualizar}>
                <Container>
                    <ModalHeader>
                        <div><h1>Editar Informacion</h1></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <label>
                                        Estado
                                    </label>
                                    <select  onChange={selecEst} className="form-select" aria-label="Default select tipo">
                                    <option value="Reparado Completamente" >Reparado Completamente</option>
                                    <option value="Reparado Parcialmente">Reparado Parcialmente</option>
                                    <option value="En espera de repuestos">En espera de repuestos</option>
                                    <option value="Baja">Baja</option>
                        </select>
                                </Grid >
                            </Grid>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter className="modal-footer">
                    <Button
                        className="editar"
                        onClick={() => {cambiarestado(currentform.id)}}
                    >
                      Aceptar
                    </Button>
                    <Button
                        className="cancelar"
                        onClick={cerrarvistaedi}
                    >
                        Cerrar
                    </Button>
                        {/* <button className="btn btn-warning" onClick={() => {cambiarestado(currentform.id)}}>Aceptar</button>
                        <button className="btn btn-success" onClick={cerrarvistaedi}>Cerrar</button> */}
                    </ModalFooter>
                </Container>
            </Modal>
        </>
    );
}
