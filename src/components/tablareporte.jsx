import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { collection, setDoc, query, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import Grid from "@mui/material/Grid";
import { db } from "../firebase/firebase-config";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import TextareaAutosize from '@mui/material/TextareaAutosize';
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
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Tablareporte() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [modalActualizar, setModalactualizar] = useState(false);
    const [modalInsertar, setModalinsertar] = useState(false);
    const [modalInformacion, setModalinformacion] = useState(false);
    const [value, setValue] = React.useState(new Date('2022-08-01T21:11:54'));
    const [value2, setValue2] = React.useState(new Date('2022-08-02T21:11:54'));
    const [form, setForm] = useState({
        feinicio: "",
        fetermino: "",
        codigoot: "",
        cedulat: "",
        nombre: "",
        codigo: "",
        equipo: "",
        serie: "",
        estadoequipo: "",
        tipomant: "",
        nivelalerta: "",
        falla: "",
        causas: "",
        actividades: "",
        // hperdidas: "",
        repuestos: "",
        costo: "",
        observaciones1: "",
        verificador: "",
    });


    const getData = async () => {
        const reference = query(collection(db, "reportesint"));
        onSnapshot(reference, (querySnapshot) => {
            console.log(querySnapshot.docs)
            setData(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });
    }



    const agregardatos = (informacion) => {
        if (informacion.codigoot !== '' && informacion.cedulat !== '' && informacion.codigo !== '' && informacion.estadoequipo !== '' && informacion.tipomant !== '' && informacion.falla !== '') {
            var newperson = {
                feinicio: value.toLocaleString('en-US'),
                fetermino: value2.toLocaleString('en-US'),
                codigoot: informacion.codigoot,
                cedulat: informacion.cedulat,
                nombre: informacion.nombre,
                codigo: informacion.codigo,
                equipo: informacion.equipo,
                serie: informacion.serie,
                estadoequipo: informacion.estadoequipo,
                tipomant: informacion.tipomant,
                nivelalerta: informacion.nivelalerta,
                falla: informacion.falla,
                causas: informacion.causas,
                actividades: informacion.actividades,
                // hperdidas: informacion.hperdidas,
                repuestos: informacion.repuestos,
                costo: informacion.costo,
                observaciones1: informacion.observaciones1,
                verificador: informacion.verificador,
                id: uuidv4(),
                indice: Date.now(),
            }
            sendFirestore(newperson);
        } else {
            console.log('faltan campos');
            var opcion = window.confirm("Faltan Campos. Por favor complete toda la informacion.");
            if (opcion === true) {
                navigate('/home/reportes/reportes');
                // handleClose();
            }
        };
    };

    const sendFirestore = (newperson) => {
        try {
            setDoc(doc(db, "reportesint", `${newperson.id}`), newperson);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

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
        const database = doc(db, "reportesint", dato.id);
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                registro.feinicio = dato.feinicio;
                registro.fetermino = dato.fetermino;
                registro.codigoot = dato.codigoot;
                registro.cedulat = dato.cedulat;
                registro.nombre = dato.nombre;
                registro.codigo = dato.codigo;
                registro.equipo = dato.equipo;
                registro.serie = dato.serie;
                registro.estadoequipo = dato.estadoequipo;
                registro.tipomant = dato.tipomant;
                registro.nivelalerta = dato.nivelalerta;
                registro.falla = dato.falla;
                registro.causas = dato.causas;
                registro.actividades = dato.actividades;
                // registro.hperdidas = dato.hperdidas;
                registro.repuestos = dato.repuestos;
                registro.costo = dato.costo;
                registro.observaciones1 = dato.observaciones1;
                registro.verificador = dato.verificador;

                return 0;
            }
            return 0;
        });
        setData(arreglo);
        await updateDoc(database, {
            feinicio: dato.feinicio,
            fetermino: dato.fetermino,
            codigoot: dato.codigoot,
            cedulat: dato.cedulat,
            nombre: dato.nombre,
            codigo: dato.codigo,
            equipo: dato.equipo,
            estadoequipo: dato.estadoequipo,
            tipomant: dato.tipomant,
            nivelalerta: dato.nivelalerta,
            falla: dato.falla,
            causas: dato.causas,
            actividades: dato.actividades,
            // hperdidas: dato.hperdidas,
            repuestos: dato.repuestos,
            costo: dato.costo,
            observaciones1: dato.observaciones1,
            verificador: dato.verificador,
        });

        setModalactualizar(false);
    };

    const eliminar = async (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            await deleteDoc(doc(db, "reportesint", `${dato.id}`));
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
    };

    const handleChange2 = (newValue) => {
        setValue(newValue);
    };
    const handleChange3 = (newValue) => {
        setValue2(newValue);
    };

    const selecMantenimiento = (e) => {
        console.log(e.target.value);
        var newForm2 = form;
        newForm2.tipomant = e.target.value;
        setForm(newForm2);
    };

    const selecEquipo = (e) => {
        console.log(e.target.value);
        var newForm2 = form;
        newForm2.equipo = e.target.value;
        setForm(newForm2);
    };

    const selecEstado = (e) => {
        console.log(e.target.value);
        var newForm2 = form;
        newForm2.estadoequipo = e.target.value;
        setForm(newForm2);
    };

    const selecAlerta = (e) => {
        console.log(e.target.value);
        var newForm2 = form;
        newForm2.nivelalerta = e.target.value;
        setForm(newForm2);
    };


    useEffect(() => {
        getData();
    }, [])



    return (
        <>
            <Container>
                <br />
                <h1>Reporte Mantenimiento</h1>
                <br />
                <h3>Internos</h3>
                <Button className="agregar" onClick={() => mostrarModalInsertar()}>Agregar Reporte</Button>
                <br />
                <br />
                <Table>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Fecha Inicio</Th>
                            <Th>Fecha Culminación</Th>
                            <Th>Código O/T</Th>
                            <Th>Estado Equipo</Th>
                            <Th>Falla</Th>
                            <Th>Nivel</Th>
                            <Th>Acciones</Th>
                            <Th>Información</Th>

                        </Tr>
                    </Thead>

                    <Tbody>
                        {data.sort((a, b) => (a.indice - b.indice)).map((dato, index) => (
                            <Tr key={dato.indice} >
                                <Td>{index + 1}</Td>
                                <Td>{dato.feinicio}</Td>
                                <Td>{dato.fetermino}</Td>
                                <Td>{dato.codigoot}</Td>
                                <Td>{dato.estadoequipo}</Td>
                                <Td>{dato.falla}</Td>
                                <Td>{dato.nivelalerta}</Td>
                                <Td>
                                    <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                                        {/* <Button
                                            color="primary"
                                            onClick={() => mostrarModalActualizar(dato)}
                                        >
                                            Editar
                                        </Button>{" "}
                                        <Button color="danger" onClick={() => eliminar(dato)}>Eliminar</Button> */}
                                        <button className="btn btn-outline-warning" onClick={() => mostrarModalActualizar(dato)}>Editar</button>
                                        <button className="btn btn-outline-danger" onClick={() => eliminar(dato)}>Eliminar</button>
                                    </Stack>
                                </Td>
                                <Td>
                                    <IconButton aria-label="delete" color="gris" onClick={() => mostrarModalInformacion(dato)}><InfoIcon /></IconButton>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Container>

            <Modal isOpen={modalInformacion}>
                <ModalHeader>
                    <div><h1>Informacion Reporte</h1></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Grid container spacing={4}>
                            <Grid item xs={1.5}>
                            </Grid>
                            <Grid item xs={9}>
                                <label>
                                    Código Reporte:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.id}
                                />
                            </Grid>
                            <Grid item xs={1.5}>
                            </Grid>
                        </Grid>
                    </FormGroup>

                    <FormGroup>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <label>
                                    Cédula Técnico:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.cedulat}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Nombre Técnico:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.nombre}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Código Equipo:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.codigo}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Equipo:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.equipo}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    T. Mantenimiento:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.tipomant}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Costo:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.costo}
                                />
                            </Grid>

                        </Grid>
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Causas:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.causas}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Actividades:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.actividades}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Repuestos:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.repuestos}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Observaciones:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.observaciones1}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Verificador:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.verificador}
                                />
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
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
                        <label>
                            Id:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.id}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Fecha Inicio
                        </label>
                        <input
                            className="form-control"
                            name="feinicio"
                            type="text"
                            onChange={handleChange}
                            value={form.feinicio}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Fecha Termino
                        </label>
                        <input
                            className="form-control"
                            name="fetermino"
                            type="text"
                            onChange={handleChange}
                            value={form.fetermino}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Código OT
                        </label>
                        <input
                            className="form-control"
                            name="codigoot"
                            type="text"
                            onChange={handleChange}
                            value={form.codigoot}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            CI:
                        </label>
                        <input
                            className="form-control"
                            name="cedulat"
                            type="text"
                            onChange={handleChange}
                            value={form.cedulat}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Nombre Técnicos:
                        </label>
                        <input
                            className="form-control"
                            name="nombre"
                            type="text"
                            onChange={handleChange}
                            value={form.nombre}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Código Equipo:
                        </label>
                        <input
                            className="form-control"
                            name="codigo"
                            type="text"
                            onChange={handleChange}
                            value={form.codigo}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Equipo:
                        </label>
                        <select onChange={selecEquipo} className="form-select" aria-label="Default select tipo">
                            <option selected>Equipo:</option>
                            <option value="Máquina de Anestesia" >Máquina de Anestesia</option>
                            <option value="Monitor Multiparámetros">Monitor Multiparámetros</option>
                            <option value="Bomba de Infusión">Bomba de Infusión</option>
                            <option value="Electrocardiograma">Electrocardiograma</option>
                            <option value="Cama">Cama</option>
                            <option value="Desfibrilador">Desfibrilador</option>
                            <option value="Monitor Fetal">Monitor Fetal</option>
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Estado:
                        </label>
                        <select onChange={selecEstado} className="form-select" aria-label="Default select tipo">
                            <option selected>Estado del reporte:</option>
                            <option value="Reparado Completamente" >Reparado Completamente</option>
                            <option value="Reparado Parcialmente">Reparado Parcialmente</option>
                            <option value="En espera de repuestos">En espera de repuestos</option>
                            <option value="Baja">Baja</option>
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Tipo:
                        </label>
                        <select onChange={selecMantenimiento} className="form-select" aria-label="Default select tipo">
                            <option selected>T. Mantenimiento:</option>
                            <option value="Preventivo" >Preventivo</option>
                            <option value="Correctivo">Correctivo</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Nivel de Alerta:
                        </label>
                        <select onChange={selecAlerta} className="form-select" aria-label="Default select tipo">
                            <option selected>Nivel de alerta:</option>
                            <option value="Funcional" >Funcional</option>
                            <option value="No Funcional">No Funcional</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Falla:
                        </label>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            name="falla"
                            placeholder=""
                            className="form-control"
                            onChange={handleChange}
                            defaultValue={form.falla}
                        />
                        {/* <input
                            className="form-control"
                            name="falla"
                            type="text"
                            onChange={handleChange}
                            value={form.falla}
                        /> */}
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Causas:
                        </label>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            name="causas"
                            placeholder=""
                            className="form-control"
                            onChange={handleChange}
                            defaultValue={form.causas}
                        />
                        {/* <input
                            className="form-control"
                            name="causas"
                            type="text"
                            onChange={handleChange}
                            value={form.causas}
                        /> */}
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Actividades:
                        </label>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            name="actividades"
                            placeholder=""
                            className="form-control"
                            onChange={handleChange}
                            defaultValue={form.actividades}
                        />
                        {/* <input
                            className="form-control"
                            name="actividades"
                            type="text"
                            onChange={handleChange}
                            value={form.actividades}
                        /> */}
                    </FormGroup>
                    {/* <FormGroup>
                        <label>
                            H.Perdidas
                        </label>
                        <input
                            className="form-control"
                            name="hperdidas"
                            type="text"
                            onChange={handleChange}
                            value={form.hperdidas}
                        />
                    </FormGroup> */}
                    <FormGroup>
                        <label>
                            Repuestos:
                        </label>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            name="repuestos"
                            placeholder=""
                            className="form-control"
                            onChange={handleChange}
                            defaultValue={form.repuestos}
                        />
                        {/* <input
                            className="form-control"
                            name="repuestos"
                            type="text"
                            onChange={handleChange}
                            value={form.repuestos}
                        /> */}
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Costo:
                        </label>
                        <input
                            className="form-control"
                            name="costo"
                            type="text"
                            onChange={handleChange}
                            value={form.costo}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Observaciones:
                        </label>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            name="observaciones1"
                            placeholder=""
                            className="form-control"
                            onChange={handleChange}
                            defaultValue={form.observaciones1}
                        />
                        {/* <input
                            className="form-control"
                            name="observaciones1"
                            type="text"
                            onChange={handleChange}
                            value={form.observaciones1}
                        /> */}
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Verificador:
                        </label>
                        <input
                            className="form-control"
                            name="verificador"
                            type="text"
                            onChange={handleChange}
                            value={form.verificador}
                        />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        className="editar"
                        onClick={() => editar(form)}
                    >
                        Editar
                    </Button>
                    <Button
                        className="cancelar"
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
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            label="Fecha Inicio"
                                            value={value}
                                            onChange={handleChange2}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DateTimePicker
                                            label="Fecha Termino"
                                            value={value2}
                                            onChange={handleChange3}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Código O/T:
                                </label>
                                <input
                                    className="form-control"
                                    name="codigoot"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    CI Técnico:
                                </label>
                                <input
                                    className="form-control"
                                    name="cedulat"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <label>
                                    Nombre Técnico:
                                </label>
                                <input
                                    className="form-control"
                                    name="nombre"
                                    type="text"
                                    onChange={handleChange}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Código Equipo:
                                </label>
                                <input
                                    className="form-control"
                                    name="codigo"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid >
                            <Grid item xs={6}>
                                <label>
                                    Equipo:
                                </label>
                                <select onChange={selecEquipo} className="form-select" aria-label="Default select tipo">
                                    <option selected>Equipo:</option>
                                    <option value="Máquina de Anestesia" >Máquina de Anestesia</option>
                                    <option value="Monitor Multiparámetros">Monitor Multiparámetros</option>
                                    <option value="Bomba de Infusión">Bomba de Infusión</option>
                                    <option value="Electrocardiograma">Electrocardiograma</option>
                                    <option value="Cama">Cama</option>
                                    <option value="Desfibrilador">Desfibrilador</option>
                                    <option value="Monitor Fetal">Monitor Fetal</option>
                                </select>
                            </Grid >
                            <Grid item xs={6}>
                                <label>
                                    T. Mantenimiento:
                                </label>
                                <select onChange={selecMantenimiento} className="form-select" aria-label="Default select tipo">
                                    <option selected>Tipo de mantenimiento:</option>
                                    <option value="Preventivo" >Preventivo</option>
                                    <option value="Correctivo">Correctivo</option>
                                </select>

                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Estado:
                                </label>
                                <select onChange={selecEstado} className="form-select" aria-label="Default select estado">
                                    <option selected>Estado de la solicitud:</option>
                                    <option value="Reparado Completamente" >Reparado Completamente</option>
                                    <option value="Reparado Parcialmente">Reparado Parcialmente</option>
                                    <option value="En espera de repuestos">En espera de repuestos</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Nivel Alerta:
                                </label>
                                <select onChange={selecAlerta} className="form-select" aria-label="Default select tipo">
                                    <option selected>Nivel de alerta:</option>
                                    <option value="Funcional" >Funcional</option>
                                    <option value="No Funcional">No Funcional</option>
                                </select>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <label>
                                    H.Perdidas:
                                </label>
                                <input
                                    className="form-control"
                                    name="hperdidas"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <label>
                                    Costo:
                                </label>
                                <input
                                    className="form-control"
                                    name="costo"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>

                        </Grid>
                    </FormGroup>
                    {/* aqui termina el grid */}

                    <FormGroup>
                        <label>
                            Falla:
                        </label>
                        <input
                            className="form-control"
                            name="falla"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Causas:
                        </label>
                        <input
                            className="form-control"
                            name="causas"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Actividades:
                        </label>
                        <input
                            className="form-control"
                            name="actividades"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Repuestos:
                        </label>
                        <input
                            className="form-control"
                            name="repuestos"
                            type="text"
                            onChange={handleChange}
                        />

                    </FormGroup>
                    <FormGroup>
                        <label>
                            Observaciones:
                        </label>
                        <input
                            className="form-control"
                            name="observaciones1"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Verificador:
                        </label>
                        <input
                            className="form-control"
                            name="verificador"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>

                </ModalBody>

                <ModalFooter>
                    <Button
                        // color="primary"
                        className="editar"
                        onClick={() => insertar()}
                    >
                        Insertar
                    </Button>
                    <Button
                        // className="btn btn-danger"
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



