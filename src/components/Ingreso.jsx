import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { collection, setDoc, query, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase/firebase-config";
import Autocomplete from '@mui/material/Autocomplete';
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


export default function Ingresoequipos() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [modalActualizar, setModalactualizar] = useState(false);
    const [modalInsertar, setModalinsertar] = useState(false);
    const [modalInformacion, setModalinformacion] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [equipo, setEquipo] = useState('');
    const [propietario, setPropietario] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [serie, setSerie] = useState('');
    const [accesorios, setAccesorios] = useState('');
    const [area, setArea] = useState('');
    const [tipo, setTipo] = useState('');
    const [seguro, setSeguro] = useState('');
    const [form, setForm] = useState({});


    const getData = async () => {
        const reference = query(collection(db, "ingreso"));
        onSnapshot(reference, (querySnapshot) => {
            console.log(querySnapshot.docs)
            setData(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });
    }



    const agregardatos = async () => {
        if (codigo !== '' && equipo !== '' && marca !== '' && modelo !== '' && serie !== '' && tipo !== '' && seguro !== '') {
            var newperson = {
                codigo: codigo,
                equipo: equipo,
                propietario: propietario,
                marca: marca,
                modelo: modelo,
                serie: serie,
                accesorios: accesorios,
                area: area,
                tipo: tipo,
                seguro: seguro,
                id: uuidv4(),
                indice: Date.now(),
            }
            sendFirestore(newperson);
        } else {
            console.log('faltan campos');
            var opcion = window.confirm("Faltan Campos. Por favor complete toda la informacion de las casillas en ROJO. ");
            if (opcion === true) {
                navigate('/home/inventario/invequipos');
            }
        };
    };
    const sendFirestore = (newperson) => {
        try {
            setDoc(doc(db, "ingreso", `${newperson.id}`), newperson);

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
        const database = doc(db, "ingreso", dato.id);
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                registro.codigo = dato.codigo;
                registro.equipo = dato.equipo;
                registro.propietario = dato.propietario;
                registro.marca = dato.marca;
                registro.modelo = dato.modelo;
                registro.serie = dato.serie;
                registro.accesorios = dato.accesorios;
                registro.area = dato.area;
                registro.tipo = dato.tipo;
                registro.seguro = dato.seguro;

                return 0;
            }
            return 0;
        });
        setData(arreglo);
        await updateDoc(database, {
            codigo: dato.codigo,
            equipo: dato.equipo,
            propietario: dato.propietario,
            marca: dato.marca,
            modelo: dato.modelo,
            serie: dato.serie,
            accesorios: dato.accesorios,
            area: dato.area,
            tipo: dato.tipo,
            seguro: dato.seguro,
        });

        setModalactualizar(false);
    };

    const eliminar = async (dato) => {
        var opcion = window.confirm("Est??s Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            await deleteDoc(doc(db, "ingreso", `${dato.id}`));
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
    const selecSeguro = (e) => {
        console.log(e.target.value);
        var newForm = form;
        newForm.seguro = e.target.value;
        setForm(newForm);
    };
    const selecTipo = (e) => {
        console.log(e.target.value);
        var newForm = form;
        newForm.tipo = e.target.value;
        setForm(newForm);
    };
    const selecDepartamento = (e) => {
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
                <Button className="agregar" onClick={() => mostrarModalInsertar()}>Agregar Equipo</Button>
                <br />
                <Table className='table table-light table-hover'>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>C??digo</Th>
                            <Th>Equipo</Th>
                            <Th>Departamento</Th>
                            <Th>Propietario</Th>
                            <Th>Seguro</Th>
                            <Th>Acciones</Th>
                            <Th>Informaci??n</Th>

                        </Tr>
                    </Thead>

                    <Tbody>
                        {data.sort((a, b) => (a.indice - b.indice)).map((dato, index) => (
                            <Tr key={dato.indice}>
                                <Td>{index + 1}</Td>
                                <Td>{dato.codigo}</Td>
                                <Td>{dato.equipo}</Td>
                                <Td>{dato.area}</Td>
                                <Td>{dato.propietario}</Td>
                                <Td>{dato.seguro}</Td>
                                <Td>
                                    <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                                        {/* <Button color="primary" onClick={() => mostrarModalActualizar(dato)}>Editar</Button>{" "} */}
                                        <button className="btn btn-outline-warning" onClick={() => mostrarModalActualizar(dato)}>Editar</button>
                                        <button className="btn btn-outline-danger" onClick={() => eliminar(dato)}>Eliminar</button>
                                        {/* <Button class="btn btn-outline-primary" onClick={() => eliminar(dato)}>Eliminar</Button> */}
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
                    <div><h1>Informacion Equipo</h1></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <label>
                                    Tipo de Equipo:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.tipo}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Marca:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.marca}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Modelo:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.modelo}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Serie:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.serie}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <label>
                                    Accesorios:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={form.accesorios}
                                />
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
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <label>
                                    C??digo Equipo:
                                </label>

                                <input
                                    className="form-control"
                                    name="codigo"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.codigo}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Tipo Equipo:
                                </label>
                                {/* <Autocomplete
                                    disableClearable
                                    id="combo-box-demo"
                                    options={tipoe}
                                    onChange={(event, newvalue) => setTipo(newvalue.label)}
                                    renderInput={(params) => <TextField {...params} fullWidth label="Tipo de equipo" color={tipo !== '' ? "gris" : "oficial"} type="text" focused />}
                                /> */}
                                <select onChange={selecTipo} className="form-select" aria-label="Default select tipo">
                                    <option selected>Open this select menu</option>
                                    <option value="Medico" >M??dico</option>
                                    <option value="Industrial">Industrial</option>
                                </select>
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Equipo:
                                </label>

                                <input
                                    className="form-control"
                                    name="equipo"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.equipo}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Departamento:
                                </label>
                                {/* <Autocomplete
                                    disableClearable
                                    id="combo-box-demo"
                                    options={departamentos}
                                    onChange={(event, newvalue) => setArea(newvalue.label)}
                                    renderInput={(params) => <TextField {...params} fullWidth label="Departamento solicitante" color={area !== '' ? "gris" : "oficial"} type="text" focused />}
                                /> */}
                                <select onChange={selecDepartamento} className="form-select" aria-label="Default select departamento">
                                    <option selected>Open this select menu</option>
                                    <option value="Im??genes">Im??genes</option>
                                    <option value="Cedicardio">Cedicardio</option>
                                    <option value="Emergencia">Emergencia</option>
                                    <option value="Endoscopia">Endoscopia</option>
                                    <option value="Cl??nico">Lab. Cl??nico</option>
                                    <option value="Covid">Lab. Covid</option>
                                    <option value="Neonatolog??a">Neonatolog??a</option>
                                    <option value="Quir??fano">Quir??fano</option>
                                </select>
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Marca:
                                </label>

                                <input
                                    className="form-control"
                                    name="marca"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.marca}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Modelo:
                                </label>

                                <input
                                    className="form-control"
                                    name="modelo"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.modelo}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Serie:
                                </label>

                                <input
                                    className="form-control"
                                    name="serie"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.serie}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Propietario:
                                </label>

                                <input
                                    className="form-control"
                                    name="propietario"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.propietario}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Seguro:
                                </label>
                                {/* <Autocomplete
                                    disableClearable
                                    id="combo-box-demo"
                                    options={tseguro}
                                    onChange={(event, newvalue) => setSeguro(newvalue.label)}
                                    renderInput={(params) => <TextField {...params} fullWidth label="Seguro" color={seguro !== '' ? "gris" : "oficial"} type="text" focused />}
                                /> */}
                                <select onChange={selecSeguro} className="form-select" aria-label="Default select seguro">
                                    <option selected>Open this select menu</option>
                                    <option value="Asegurado" >Asegurado</option>
                                    <option value="Sin seguro" >Sin seguro</option>
                                </select>
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Accesorios:
                                </label>
                                <input
                                    className="form-control"
                                    name="accesorios"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.accesorios}
                                />
                            </Grid>
                        </Grid>
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
                            <Grid item xs={12}>
                                {/* <label>
                                    C??digo Equipo:
                                </label> */}
                                <TextField color={codigo !== '' ? "gris" : "oficial"} fullWidth label="C??digo Equipo" focused type="int" onChange={(e) => setCodigo(e.target.value)} />
                                {/* <input
                                    className="form-control"
                                    name="codigo"
                                    type="text"
                                    onChange={handleChange}
                                /> */}
                            </Grid>
                            <Grid item xs={6}>
                                {/* <label>
                                    Tipo de Equipo:
                                </label> */}
                                <Autocomplete
                                    disableClearable
                                    id="combo-box-demo"
                                    options={tipoe}
                                    onChange={(event, newvalue) => setTipo(newvalue.label)}
                                    renderInput={(params) => <TextField {...params} fullWidth label="Tipo de equipo" color={tipo !== '' ? "gris" : "oficial"} type="text" focused />}
                                />
                                {/* <select onChange={selecTipo} className="form-select" aria-label="Default select tipo">
                                    <option value="Medico" >M??dico</option>
                                    <option value="Industrial">Industrial</option>
                                </select> */}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField color={equipo !== '' ? "gris" : "oficial"} fullWidth label="Equipo" focused type="int" onChange={(e) => setEquipo(e.target.value)} />
                                {/* <label>
                                    Equipo:
                                </label> */}

                                {/* <input
                                    className="form-control"
                                    name="equipo"
                                    type="text"
                                    onChange={handleChange}
                                /> */}
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disableClearable
                                    id="combo-box-demo"
                                    options={departamentos}
                                    onChange={(event, newvalue) => setArea(newvalue.label)}
                                    renderInput={(params) => <TextField {...params} fullWidth label="Departamento solicitante" color={tipo !== '' ? "gris" : "oficial"} type="text" focused />}
                                />
                                {/* <label>
                                    Departamento:
                                </label>
                                <select onChange={selecDepartamento} className="form-select" aria-label="Default select departamento">
                                    <option value="Im??genes">Im??genes</option>
                                    <option value="Cedicardio">Cedicardio</option>
                                    <option value="Emergencia">Emergencia</option>
                                    <option value="Endoscopia">Endoscopia</option>
                                    <option value="Cl??nico">Lab. Cl??nico</option>
                                    <option value="Covid">Lab. Covid</option>
                                    <option value="Neonatolog??a">Neonatolog??a</option>
                                    <option value="Quir??fano">Quir??fano</option>
                                </select> */}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField color={marca !== '' ? "gris" : "oficial"} fullWidth label="Marca" focused type="int" onChange={(e) => setMarca(e.target.value)} />
                                {/* <label>
                                    Marca:
                                </label>
                                <input
                                    className="form-control"
                                    name="marca"
                                    type="text"
                                    onChange={handleChange}
                                /> */}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField color={modelo !== '' ? "gris" : "oficial"} fullWidth label="Modelo" focused type="int" onChange={(e) => setModelo(e.target.value)} />
                                {/* <label>
                                    Modelo:
                                </label>
                                <input
                                    className="form-control"
                                    name="modelo"
                                    type="text"
                                    onChange={handleChange}
                                /> */}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField color={serie !== '' ? "gris" : "oficial"} fullWidth label="Serie" focused type="int" onChange={(e) => setSerie(e.target.value)} />
                                {/* <label>
                                    Serie:
                                </label>
                                <input
                                    className="form-control"
                                    name="serie"
                                    type="text"
                                    onChange={handleChange}
                                /> */}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField color={propietario !== '' ? "gris" : "oficial"} fullWidth label="Propietario" focused type="int" onChange={(e) => setPropietario(e.target.value)} />
                                {/* <label>
                                    Propietario:
                                </label>
                                <input
                                    className="form-control"
                                    name="propietario"
                                    type="text"
                                    onChange={handleChange}
                                /> */}
                            </Grid>
                            <Grid item xs={6}>
                                {/* <label>
                                    Seguro:
                                </label> */}
                                <Autocomplete
                                    disableClearable
                                    id="combo-box-demo"
                                    options={tseguro}
                                    onChange={(event, newvalue) => setSeguro(newvalue.label)}
                                    renderInput={(params) => <TextField {...params} fullWidth label="Seguro" color={seguro !== '' ? "gris" : "oficial"} type="text" focused />}
                                />
                                {/* <select onChange={selecSeguro} className="form-select" aria-label="Default select seguro">
                                    <option value="Asegurado" selected >Asegurado</option>
                                    <option value="Sin seguro" >Sin seguro</option>
                                </select> */}
                            </Grid>
                            <Grid item xs={12}>
                                {/* <label>
                                    Accesorios:
                                </label>
                                <input
                                    className="form-control"
                                    name="accesorios"
                                    type="text"
                                    onChange={handleChange}
                                /> */}
                                <TextField color={accesorios !== '' ? "gris" : "oficial"} fullWidth label="Accesorios" focused type="int" onChange={(e) => setAccesorios(e.target.value)} />
                            </Grid>
                        </Grid>
                    </FormGroup>
                    {/* aqui termina el grid */}


                </ModalBody>

                <ModalFooter>
                    <Button
                        className="editar"
                        onClick={() => insertar()}
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

const tipoe = [
    { label: 'M??dico' },
    { label: 'Industrial' },
]

const departamentos = [
    { label: 'Im??genes' },
    { label: 'Cedicardio' },
    { label: 'Emergencia' },
    { label: 'Endoscopia' },
    { label: 'Lab. Cl??nico' },
    { label: 'Lab. Covid' },
    { label: 'Neonatolog??a' },
    { label: 'Quir??fano' },
]

const tseguro = [
    { label: 'Asegurado' },
    { label: 'Sin seguro' },
]
