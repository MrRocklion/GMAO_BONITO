import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
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
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function Ingresoequipos() {
    const [data, setData] = useState([]);
    // const [modalActualizar, setModalactualizar] = useState(false);
    const [modalInsertar, setModalinsertar] = useState(false);
    const [modalInformacion, setModalinformacion] = useState(false);
    const [value4, setValue4] = React.useState(new Date('2022-08-01T21:11:54'));
    const [value5, setValue5] = React.useState(new Date('2022-08-02T21:11:54'));
    const [form, setForm] = useState({
        contrato: "",
        empresa: "",
        descripcion: "",
        equipos: "",
        finicio: "",
        ffinal: "",
    });


    const getData = async () => {
        const reference = query(collection(db, "contratos"));
        onSnapshot(reference, (querySnapshot) => {
            console.log(querySnapshot.docs)
            setData(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });
    }



    const agregardatos = async (informacion) => {

        const newperson = {
            finicio: value4.toDateString(),
            ffinal: value5.toDateString(),
            contrato: informacion.contrato,
            equipos: informacion.equipos,
            empresa: informacion.empresa,
            descripcion: informacion.descripcion,
            id: uuidv4(),
            indice: Date.now(),
        }


        try {
            await setDoc(doc(db, "contratos", `${newperson.id}`), newperson);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // const mostrarModalActualizar = (dato) => {
    //     setForm(dato);
    //     setModalactualizar(true);
    // };

    const mostrarModalInformacion = (dato) => {
        setForm(dato);
        setModalinformacion(true);
    };

    const cerrarModalInformacion = () => {
        // this.setState({ modalActualizar: false });
        setModalinformacion(false);
    };

    // const cerrarModalActualizar = () => {
    //     // this.setState({ modalActualizar: false });
    //     setModalactualizar(false);
    // };

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
        const database = doc(db, "contratos", dato.id);
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                registro.contrato= dato.contrato;
                registro.equipos= dato.equipos;
                registro.empresa= dato.empresa;
                registro.descripcion= dato.descripcion;
                registro.finicio= dato.finicio;
                registro.ffinal= dato.ffinal;

                return 0;
            }
            return 0;
        });
        setData(arreglo);
        await updateDoc(database, {
            contrato: dato.contrato,
            equipos: dato.equipos,
            empresa: dato.empresa,
            descripcion: dato.descripcion,
            finicio: dato.finicio,
            ffinal: dato.ffinal,
        });

        // setModalactualizar(false);
    };

    const eliminar = async (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            await deleteDoc(doc(db, "contratos", `${dato.id}`));
            // setModalactualizar(false);
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

    const handleChange4 = (newValue) => {
        setValue4(newValue);
    };
    const handleChange5 = (newValue) => {
        setValue5(newValue);
    };
    const selecSeguro = (e)=>{
        console.log(e.target.value);
        var newForm = form;
        newForm.seguro = e.target.value;
        setForm(newForm);
    };
    const selecTipo = (e)=>{
        console.log(e.target.value);
        var newForm = form;
        newForm.tipo = e.target.value;
        setForm(newForm);
    };
    const selecDepartamento = (e)=>{
        console.log(e.target.value);
        var newForm = form;
        newForm.area = e.target.value;
        setForm(newForm);
    };


    useEffect(() => {
        getData();
    }, [])



    return (
        <>
            <Container>
                <br />
                <Button color="success" onClick={() => mostrarModalInsertar()}>Agregar Contrato</Button>
                <br />
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>N. Contrato</th>
                            <th>Empresa</th>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                            <th>Información</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.sort((a, b) => (a.indice - b.indice)).map((dato, index) => (
                            <tr key={dato.indice} >
                                <td>{dato.contrato}</td>
                                <td>{dato.empresa}</td>
                                <td>{dato.descripcion}</td>
                                <td>
                                    <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                                        {/* <Button
                                            color="primary"
                                            onClick={() => mostrarModalActualizar(dato)}
                                        >
                                            Editar
                                        </Button>{" "} */}
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
                            <Grid item xs={6}>
                                <label>
                                    Inicio Contrato:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.finicio}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Final Contrato:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.ffinal}
                                />
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Equipos:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.equipos}
                                />
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid className="fila" item xs={12}>
                                    <label className="archivo">
                                        Archivo:
                                    </label>
                                    <Link
                                        component="button"
                                        variant="body2"  
                                    >
                                        Visualizar Contrato
                                    </Link>
                                </Grid >
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

            {/* <Modal isOpen={modalActualizar}>
                <ModalHeader>
                    <div><h3>Editar Registro</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Grid container spacing={4}>
                        <Grid item xs={6}>
                                <label>
                                    Inicio Contrato:
                                </label>

                                <input
                                    className="form-control"
                                    name="finicio"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.finicio}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Final Contrato:
                                </label>

                                <input
                                    className="form-control"
                                    name="ffinal"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.ffinal}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    N. Contrato:
                                </label>

                                <input
                                    className="form-control"
                                    name="contrato"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.contrato}
                                />
                            </Grid>
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
                                    Descripcion:
                                </label>
                                <input
                                    className="form-control"
                                    name="descripcion"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.descripcion}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Equipo/s:
                                </label>

                                <input
                                    className="form-control"
                                    name="equipos"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.equipos}
                                />
                            </Grid>
                          
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
            </Modal> */}

            <Modal className="{width:0px}" isOpen={modalInsertar}>
                <ModalHeader>
                    <div><h3>Insertar</h3></div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <Grid container spacing={4}>
                        <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            label="Fecha Inicio"
                                            value={value4}
                                            onChange={handleChange4}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            label="Fecha Final"
                                            value={value5}
                                            onChange={handleChange5}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    N. Contrato:
                                </label>
                                <input
                                    className="form-control"
                                    name="contrato"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
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
                                    Equipo/s:
                                </label>
                                <input
                                    className="form-control"
                                    name="equipos"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Descripcion:
                                </label>
                                <input
                                    className="form-control"
                                    name="descripcion"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </FormGroup>
                    {/* aqui termina el grid */}


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



