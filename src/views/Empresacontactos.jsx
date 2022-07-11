import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { collection, setDoc, query, doc, deleteDoc, onSnapshot, updateDoc, } from "firebase/firestore";
import Grid from "@mui/material/Grid";
import { db, storage } from "../firebase/firebase-config";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../hoja-de-estilos/Tabla.css'
import {
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
    const [empresa, setEmpresa] = useState('');
    const [representante, setRepresentante] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ruc, setRuc] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [producto, setProducto] = useState('');
    const [evaluacion, setEvaluacion] = useState('');
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const [form, setForm] = useState({});

    const buscarImagen = (e) => {
        if (e.target.files[0] !== undefined) {
            setFile(e.target.files[0]);
        } else {
            console.log('no hay archivo');
        }
    };

    const getData = async () => {
        const reference = query(collection(db, "empresas"));
        onSnapshot(reference, (querySnapshot) => {
            setData(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });
    };

    const actualizar = async () => {
        const database = doc(db, "empresas", form.id);
        await updateDoc(database, form);
        cerrarModalActualizar();
    };

    const agregardatos = async () => {
        var contactos = {};
        if (file === null) {
            contactos = {
                empresa: empresa,
                representante: representante,
                direccion: direccion,
                ruc: ruc,
                correo: correo,
                telefono: telefono,
                producto: producto,
                evaluacion: evaluacion,
                nameImg: 'SP.PNG',
                id: uuidv4(),
                indice: Date.now(),
            };
            sendFirestore(contactos);
        } else {
            contactos = {
                empresa: empresa,
                representante: representante,
                direccion: direccion,
                ruc: ruc,
                correo: correo,
                telefono: telefono,
                producto: producto,
                evaluacion: evaluacion,
                nameImg: file.name,
                id: uuidv4(),
                indice: Date.now(),
            };
            sendFirestore(contactos);
            sendStorage();
        }
        setFile(null);
    };
    const sendFirestore = (contactos) => {
        try {
            setDoc(doc(db, "empresas", `${contactos.id}`), contactos);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    const sendStorage = () => {
        //pasar parametros variables
        const storageRef = ref(storage, `evaluaciones/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
        });
    };

    const mostrarModalActualizar = (dato) => {
        setForm(dato);
        setModalactualizar(true);
    };


    const mostrarModalInformacion = (dato) => {
        setForm(dato);
        descargararchivo(dato.nameImg);
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

    const eliminar = async (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            await deleteDoc(doc(db, "empresas", `${dato.id}`));
        }
    };

    const handleChange = (e) => {
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value,
            },
        )
    };

    const descargararchivo = (nombre) => {
        getDownloadURL(ref(storage, `evaluaciones/${nombre}`)).then((url) => {
            setUrl(url);
        })

    };


    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Container>
                <br />
                <h1>Empresas Contratistas</h1>
                <br />
                <Button className="agregar" onClick={() => mostrarModalInsertar()}>Agregar Empresa</Button>
                <br />
                <Table className='table table-light table-hover'>
                <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Empresa</Th>
                            <Th>Representante</Th>
                            <Th>Ruc</Th>
                            <Th>Contacto</Th>
                            <Th>Correo</Th>
                            <Th>Acciones</Th>
                            <Th>Información</Th>
                          
                            </Tr>
                    </Thead>

                    <Tbody>
                        {data.sort((a, b) => (a.indice - b.indice)).map((contactos, index) => (
                         <Tr  key={contactos.indice} >
                              <Td>{index + 1}</Td>
                              <Td>{contactos.empresa}</Td>
                              <Td>{contactos.representante}</Td>
                              <Td>{contactos.ruc}</Td>
                              <Td>{contactos.telefono}</Td>
                              <Td>{contactos.correo}</Td>
                              <Td>
                                    <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                                        <button className="btn btn-outline-warning" onClick={() => mostrarModalActualizar(contactos)}>Editar</button>
                                        <button className="btn btn-outline-danger" onClick={() => eliminar(contactos)}>Eliminar</button>
                                        {/* <Button
                                            color="primary"
                                            onClick={() => mostrarModalActualizar(contactos)}
                                        >
                                            Editar
                                        </Button>{" "}
                                        <Button color="danger" onClick={() => eliminar(contactos)}>Eliminar</Button> */}
                                    </Stack>
                                    </Td>
                                <Td>
                                    <IconButton aria-label="delete" color="gris" onClick={() => mostrarModalInformacion(contactos)}><InfoIcon /></IconButton>
                                    </Td>
                            </Tr>
                        ))}
                    </Tbody>
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
                                    Visualizar Contrato
                                </a>
                            </Grid >
                        </Grid>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button
                        className="editar"
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
                    <Button className="editar" onClick={() => actualizar()}>Guardar Cambios</Button>
                    <Button className="cancelar" onClick={() => cerrarModalActualizar()}>Cancelar </Button>
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
                                    onChange={(e) => { setEmpresa(e.target.value) }}
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
                                    onChange={(e) => { setRepresentante(e.target.value) }}
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
                                    onChange={(e) => { setRuc(e.target.value) }}
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
                                    onChange={(e) => { setTelefono(e.target.value) }}
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
                                    onChange={(e) => { setCorreo(e.target.value) }}
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
                                    onChange={(e) => { setDireccion(e.target.value) }}
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
                                    onChange={(e) => { setProducto(e.target.value) }}
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
                                    onChange={(e) => { setEvaluacion(e.target.value) }}
                                />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={12}>
                                <div className="mb-3">
                                    <label className="form-label">Cargar Evaluacion</label>
                                    <input className="form-control" onChange={buscarImagen} type="file" id="formFile" />
                                </div>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        className="editar"
                        onClick={() => agregardatos()}
                    >
                        Insertar
                    </Button>
                    <Button
                        className="cancelar"
                        onClick={() => cerrarModalInsertar()}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

