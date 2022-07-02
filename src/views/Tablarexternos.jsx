import React, { useEffect, useState } from "react";
import { query, collection,doc, deleteDoc,updateDoc,onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Stack from '@mui/material/Stack';
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

export default function Reportexterno() {

    const [elementosext, setElementosext] = useState([]);
    const [modalActualizar, setModalactualizar] = useState(false);
    const [cambioex,setCambioex]=useState("");
    const [currentform, setCurrentform]= useState({});

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
    }

    const cerrarvistaedi =()=>{
        setModalactualizar(false);
    }

    const cambiarestado = async (id) => {
        console.log("Se cambio el estado");
        setModalactualizar(false);
        const ref= doc(db, "reportes externos", `${id}`);
        await updateDoc(ref, {estadoext:cambioex});
        console.log("Se actualizaron los datos");
    }

    const selecEst = (e)=>{
        console.log(e.target.value);
        setCambioex(e.target.value);
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
                                        <th>Fecha</th>
                                        <th>Empresa</th>
                                        <th>N.Reporte</th>
                                        <th>Equipo</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elementosext.map((rexterno) => (
                                        <tr key={rexterno.id}>
                                            <td>{rexterno.fechaext}</td>
                                            <td>{rexterno.empresaext}</td>
                                            <td>{rexterno.numeroreportefisico}</td>
                                            <td>{rexterno.equipoter}</td>
                                            <td>{rexterno.estadoext}</td>
                                            <td>
                                            <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                                            <Button
                                            color="primary" onClick={() => { vistaedi(rexterno) }}>Cambiar Estado </Button>{" "}
                                                <Button color="danger" onClick={() => eliminar(rexterno.id)}>Eliminar</Button>
                                                </Stack>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
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
                        <button className="btn btn-warning" onClick={() => {cambiarestado(currentform.id)}}>Aceptar</button>
                        <button className="btn btn-success" onClick={cerrarvistaedi}>Cerrar</button>
                    </ModalFooter>
                </Container>
            </Modal>
        </>
    );
}
