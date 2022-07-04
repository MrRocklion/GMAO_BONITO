import React, { useEffect, useState } from "react";
import '../hoja-de-estilos/Mantenimiento.css';
import { useNavigate } from 'react-router-dom';
import { query, collection, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid"
import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Button,
    ModalFooter,
} from "reactstrap";

export default function Mantenimientoview() {

    const navigate = useNavigate();
    const [modalActualizar, setModalactualizar] = useState(false);
    const [modalInformacion, setModalinformacion] = useState(false);
    const [cambioe, setCambioe] = useState("");
    const [elementosfb, setElementosfb] = useState([]);
    const [currentform, setCurrentform] = useState({});

    const getData = async () => {
        const reference = query(collection(db, "ordenes"));
        onSnapshot(reference, (querySnapshot) => {
            console.log(querySnapshot.docs)
            setElementosfb(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });
    }
    console.log(elementosfb);

    const eliminar = async (id) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento ");
        if (opcion === true) {
            await deleteDoc(doc(db, "ordenes", `${id}`));
            setModalactualizar(false);
        }
    };

    const vistainfo = (data) => {
        setCurrentform(data);
        setModalinformacion(true);
    };

    const cerrarvistainfo = () => {
        setModalinformacion(false);
    };

    const vistaedi = (data) => {
        setCurrentform(data);
        setCambioe("Solventado");
        setModalactualizar(true);
    };

    const cerrarvistaedi = () => {
        setModalactualizar(false);
    };


    const agregarformulario = () => {
        navigate('/home/reportes/reportes');
    };

    const cambiarestado = async (id) => {
        console.log("Se cambio el estado");
        setModalactualizar(false);
        const ref = doc(db, "ordenes", `${id}`);
        await updateDoc(ref, { estado: cambioe });
        console.log("Se actualizaron los datos");
    };

    const selecEstado = (e) => {
        console.log(e.target.value);
        setCambioe(e.target.value);
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <h1> Módulo Gestión de Mantenimiento </h1>
            {<Button variant="contained" color='success' className="boton" onClick={agregarformulario}>Visualizar Reporte</Button>}
            <div style={{ height: 800, width: '100%',marginTop:20 }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <table className='table table-light table-hover'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fecha</th>
                                        <th>Departamento</th>
                                        <th>Prioridad</th>
                                        <th>Tipo de Trabajo</th>
                                        <th>Asunto</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                        <th>Informacion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elementosfb.sort((a, b) => (a.indice - b.indice)).map((orden, index) => (
                                        <tr key={orden.indice}>
                                            <td>{index + 1}</td>
                                            <td>{orden.fecha}</td>
                                            <td>{orden.departamento}</td>
                                            <td>{orden.prioridad1}</td>
                                            <td>{orden.tipotrabajo}</td>
                                            <td>{orden.asunto}</td>
                                            <td>{orden.estado}</td>
                                            <td>
                                                <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                                                    <Button
                                                        color="primary" onClick={() => { vistaedi(orden) }}>Cambiar Estado </Button>{" "}
                                                    <Button color="danger" onClick={() => eliminar(orden.id)}>Eliminar</Button>
                                                </Stack>
                                            </td>
                                            <td>
                                                <IconButton aria-label="delete" onClick={() => { vistainfo(orden) }} color="success"><InfoIcon /></IconButton>

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
                        <div><h1>Informacion Orden de Trabajo</h1></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Grid container spacing={4}>
                                {/* <Grid item xs={12}>
                                    <label>
                                        Id:
                                    </label>
                                    <input
                                        className="form-control"
                                        readOnly
                                        type="text"
                                        value={}
                                    />
                                </Grid > */}
                                <Grid item xs={12}>
                                    <label>
                                        Cédula Solicitante:
                                    </label>
                                    <input
                                        className="form-control"
                                        readOnly
                                        type="text"
                                        value={currentform.cedula}
                                    />
                                </Grid >
                                <Grid item xs={12}>
                                    <label>
                                        Problemática:
                                    </label>
                                    <input
                                        className="form-control"
                                        readOnly
                                        type="text"
                                        value={currentform.problematica}
                                    />
                                </Grid >
                                <Grid item xs={12}>
                                    <label>
                                        Observaciones:
                                    </label>
                                    <input
                                        className="form-control"
                                        readOnly
                                        type="text"
                                        value={currentform.observaciones}
                                    />
                                </Grid >
                            </Grid>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter className="modal-footer">
                        <button className="btn btn-success" onClick={cerrarvistainfo}>Cerrar</button>
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
                                    <select onChange={selecEstado} className="form-select" aria-label="Default select tipo">
                                        <option value="Solventado" >Solventado</option>
                                        <option value="Compras">Compras</option>
                                        <option value="ICH Proceso">ICH Proceso</option>
                                        <option value="Disp. Área">Disp. Área</option>
                                        <option value="Externo">Externo</option>
                                        <option value="Constructivo">Constructivo</option>
                                    </select>
                                </Grid >
                            </Grid>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter className="modal-footer">
                        <button className="btn btn-warning" onClick={() => { cambiarestado(currentform.id) }}>Aceptar</button>
                        <button className="btn btn-success" onClick={cerrarvistaedi}>Cerrar</button>
                    </ModalFooter>
                </Container>
            </Modal>
        </>

    );
}