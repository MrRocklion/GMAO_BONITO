import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { collection, setDoc, query, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import Grid from "@mui/material/Grid"
import { db } from "../firebase/firebase-config"
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
import { v4 as uuidv4 } from 'uuid';
import Stack from '@mui/material/Stack';


export default function Contactosempresas() {
    const [data, setData] = useState([]);
    const [modalActualizar, setModalactualizar] = useState(false);
    const [modalInsertar, setModalinsertar] = useState(false);
    const [modalInformacion, setModalinformacion] = useState(false);
    const [form, setForm] = useState({
        codigo: "",
        empresa:"",
        representante:"",
        direccion:"",
        ruc:"",
        correo:"",
        telefono:"",
        producto:"",
        evaluacion:"",

    });

    const getData = async () => {
        const reference = query(collection(db, "empresas"));
        onSnapshot(reference, (querySnapshot) => {
            console.log(querySnapshot.docs)
            setData(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });
    }
    const agregardatos = async (informacion) => {

        const newperson = {
            codigo: informacion.codigo,
            empresa: informacion.empresa,
            representante: informacion.representante,
            direccion: informacion.direccion,
            ruc: informacion.ruc,
            correo: informacion.correo,
            telefono: informacion.telefono,
            producto: informacion.producto,
            evaluacion: informacion.evaluacion,
            id: uuidv4(),
            indice: Date.now(),
        }


        try {
            await setDoc(doc(db, "empresas", `${newperson.id}`), newperson);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const mostrarModalActualizar = (dato) => {
        setForm(dato);
        setModalactualizar(true);
    };

    const mostrarModalInformacion = (dato) => {
        setForm(dato);
        setModalinformacion(true);
    };

    const cerrarModalInformacion = () => {
        // this.setState({ modalActualizar: false });
        setModalinformacion(false);
    };

    const cerrarModalActualizar = () => {
        // this.setState({ modalActualizar: false });
        setModalactualizar(false);
    };

    const mostrarModalInsertar = () => {
        // this.setState({
        //   modalInsertar: true,
        // });
        setModalinsertar(true);
    };

    const cerrarModalInsertar = () => {
        // this.setState({ modalInsertar: false });
        setModalinsertar(false);
    };

    const editar = async (dato) => {

        var arreglo = data;
        console.log(data);
        const database = doc(db, "empresas", dato.id);
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                registro.codigo= dato.codigo;
                registro.empresa= dato.empresa;
                registro.representante= dato.representante;
                registro.direccion= dato.direccion;
                registro.ruc= dato.ruc;
                registro.correo= dato.correo;
                registro.telefono= dato.telefono;
                registro.producto= dato.producto;
                registro.evaluacion= dato.evaluacion;
                return 0;
            }
            return 0;
        });
        setData(arreglo);
        await updateDoc(database, {
            codigo: dato.codigo,
            empresa: dato.empresa,
            representante: dato.representante,
            direccion: dato.direccion,
            ruc: dato.ruc,
            correo: dato.correo,
            telefono: dato.telefono,
            producto: dato.producto,
            evaluacion: dato.evaluacion,
        });

        setModalactualizar(false);
    };
    const eliminar = async (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            await deleteDoc(doc(db, "empresas", `${dato.id}`));
            setModalactualizar(false);
        }
    };

    const insertar = () => {
        var valorNuevo = { ...form };
        console.log(valorNuevo);
        setModalinsertar(false);
        agregardatos(valorNuevo);
    }

    const handleChange = (e) => {
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value,
            },
        )
        console.log(form);
    };
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
        <Container>
                <br />
                <Button color="success" onClick={() => mostrarModalInsertar()}>Agregar Equipo</Button>
                <br />
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Representante</th>
                            <th>Ruc</th>
                            <th>Contacto</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                            <th>Información</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.sort((a, b) => (a.indice - b.indice)).map((dato, index) => (
                            <tr key={dato.indice} >
                                <td>{dato.empresa}</td>
                                <td>{dato.representante}</td>
                                <td>{dato.ruc}</td>
                                <td>{dato.telefono}</td>
                                <td>{dato.correo}</td>
                                <td>
                                    <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                                        <Button
                                            color="primary"
                                            onClick={() => mostrarModalActualizar(dato)}
                                        >
                                            Editar
                                        </Button>{" "}
                                        <Button color="danger" onClick={() => eliminar(dato)}>Eliminar</Button>
                                    </Stack>
                                </td>
                                <td>
                                    <IconButton aria-label="delete" color="success" onClick={() => mostrarModalInformacion(dato)}><InfoIcon /></IconButton>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Modal isOpen={modalInformacion}>
                <ModalHeader>
                    <div><h1>Informacion Equipo</h1></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Grid container spacing={4}>
                        <Grid item xs={12}>
                                <label>
                                    Direccion:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.direccion}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Producto/Servicio:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.producto}
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>
                                <label>
                                    Evaluacion:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.evaluacion}
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={() => cerrarModalInformacion()}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalActualizar}>
                <ModalHeader>
                    <div><h3>Editar Registro</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Grid container spacing={4}>
                        <Grid item xs={12}>
                                <label>
                                    Empresa:
                                </label>

                                <input
                                    className="form-control"
                                    name="empresa"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.empresa}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Representante Legal:
                                </label>

                                <input
                                    className="form-control"
                                    name="representante"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.representante}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    RUC:
                                </label>

                                <input
                                    className="form-control"
                                    name="ruc"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.ruc}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Contacto:
                                </label>

                                <input
                                    className="form-control"
                                    name="telefono"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.telefono}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Correo:
                                </label>

                                <input
                                    className="form-control"
                                    name="correo"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.correo}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Direccion:
                                </label>

                                <input
                                    className="form-control"
                                    name="direccion"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.direccion}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Producto/Servicio:
                                </label>

                                <input
                                    className="form-control"
                                    name="producto"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.producto}
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>
                                <label>
                                    Evaluacion:
                                </label>

                                <input
                                    className="form-control"
                                    name="evaluacion"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.evaluacion}
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            
                        </Grid>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => editar(form)}
                    >
                        Editar
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => cerrarModalActualizar()}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal className="{width:0px}" isOpen={modalInsertar}>
                <ModalHeader>
                    <div><h3>Insertar</h3></div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <label>
                                    Empresa:
                                </label>
                                <input
                                    className="form-control"
                                    name="empresa"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid> 
                            <Grid item xs={12}>
                                <label>
                                    Representante Legal:
                                </label>
                                <input
                                    className="form-control"
                                    name="representante"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    RUC:
                                </label>
                                <input
                                    className="form-control"
                                    name="ruc"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Contacto:
                                </label>
                                <input
                                    className="form-control"
                                    name="contacto"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Correo:
                                </label>
                                <input
                                    className="form-control"
                                    name="correo"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Direccion:
                                </label>
                                <input
                                    className="form-control"
                                    name="direccion"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Producto/Servicio:
                                </label>
                                <input
                                    className="form-control"
                                    name="producto"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>
                                <label>
                                    Evaluacion:
                                </label>

                                <input
                                    className="form-control"
                                    name="evaluacion"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            
                        </Grid>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => insertar()}
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
        </>
    );
}

