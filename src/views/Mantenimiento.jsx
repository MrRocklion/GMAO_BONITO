import React, { useEffect, useState } from "react";
import '../hoja-de-estilos/Mantenimiento.css';
import { useNavigate } from 'react-router-dom';
import { query, collection, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../hoja-de-estilos/Tabla.css'
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
           <Container>
            <h1> Órdenes de Trabajo </h1>
            {<Button variant="contained" className="agregar" onClick={agregarformulario}>Visualizar Reporte</Button>}
            <br />
                <Table className='table table-light table-hover'>
                    <Thead>
                        <Tr>
                        <Th>#</Th>
                        <Th>Fecha</Th>
                        <Th>Departamento</Th>
                        <Th>Prioridad</Th>
                        <Th>Tipo de Trabajo</Th>
                        <Th>Asunto</Th>
                        <Th>Estado</Th>
                        <Th>Acciones</Th>
                            <Th>Información</Th>
                            </Tr>
                    </Thead>

                    <Tbody>
                                    {elementosfb.sort((a, b) => (a.indice - b.indice)).map((orden, index) => (
                                       <Tr key={orden.indice}>
                                             <Td>{index + 1}</Td>
                                             <Td>{orden.fecha}</Td>
                                             <Td>{orden.departamento}</Td>
                                             <Td>{orden.prioridad1}</Td>
                                             <Td>{orden.tipotrabajo}</Td>
                                             <Td>{orden.asunto}</Td>
                                             <Td>{orden.estado}</Td>
                                             <Td>
                                                <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >

                                                        <button className="btn btn-outline-warning"onClick={() => { vistaedi(orden) }}>Cambiar Estado</button> {" "}
                                                         <button className="btn btn-outline-danger" onClick={() => eliminar(orden.id)}>Eliminar</button>
                                                   
                                                </Stack>
                                                </Td>
                                <Td>
                                                <IconButton aria-label="delete" onClick={() => { vistainfo(orden) }} color="gris"><InfoIcon /></IconButton>

                                                </Td>
                            </Tr>
                                    ))}
                          </Tbody>
                </Table>
            </Container>
            
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
                    <Button className="editar" onClick={cerrarvistainfo}>Cerrar </Button>
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
                    <Button
                        className="editar"
                        onClick={() => { cambiarestado(currentform.id) }}
                    >
                        Aceptar
                    </Button>
                
                    <Button
                        className="cancelar"
                        onClick={cerrarvistaedi}
                    >
                        Cerrar
                    </Button>
                    </ModalFooter>
                </Container>
            </Modal>
        </>

    );
}