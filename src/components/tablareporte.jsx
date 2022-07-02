import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
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

export default function Tablareporte() {
    const [data, setData] = useState([]);
    const [modalActualizar, setModalactualizar] = useState(false);
    const [modalInsertar, setModalinsertar] = useState(false);
    const [modalInformacion, setModalinformacion] = useState(false);
    const [value, setValue] = React.useState(new Date('2022-08-01T21:11:54'));
    const [value2, setValue2] = React.useState(new Date('2022-08-02T21:11:54'));
    const [form, setForm] = useState({
        fechainicio: "",
        fechatermino: "",
        codigoot: "",
        cedulat: "",
        codigoe: "",
        estadoequipo: "",
        tipomant: "",
        nivelalerta: "",
        falla: "",
        causas: "",
        actividades: "",
        hperdidas: "",
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



    const agregardatos = async (informacion) => {

        const newperson = {
            fechainicio: value.toDateString(),
            fechatermino: value2.toDateString(),
            codigoot: informacion.codigoot,
            cedulat: informacion.cedulat,
            codigoe: informacion.codigoe,
            estadoequipo: informacion.estadoequipo,
            tipomant: informacion.tipomant,
            nivelalerta: informacion.nivelalerta,
            falla: informacion.falla,
            causas: informacion.causas,
            actividades: informacion.actividades,
            hperdidas: informacion.hperdidas,
            repuestos: informacion.repuestos,
            costo: informacion.costo,
            observaciones1: informacion.observaciones1,
            verificador: informacion.verificador,
            id: uuidv4(),
            indice: Date.now(),
        }


        try {
            await setDoc(doc(db, "reportesint", `${newperson.id}`), newperson);

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
        const database = doc(db, "reportesint", dato.id);
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                registro.fechainicio = dato.fechainicio;
                registro.fechatermino = dato.fechatermino;
                registro.codigoot = dato.codigoot;
                registro.cedulat = dato.cedulat;
                registro.codigoe = dato.codigoe;
                registro.estadoequipo = dato.estadoequipo;
                registro.tipomant = dato.tipomant;
                registro.nivelalerta = dato.nivelalerta;
                registro.falla = dato.falla;
                registro.causas = dato.causas;
                registro.actividades = dato.actividades;
                registro.hperdidas = dato.hperdidas;
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
            fechainicio: dato.fechainicio,
            fechatermino: dato.fechatermino,
            codigoot: dato.codigoot,
            cedulat: dato.cedulat,
            codigoe: dato.codigoe,
            estadoequipo: dato.estadoequipo,
            tipomant: dato.tipomant,
            nivelalerta: dato.nivelalerta,
            falla: dato.falla,
            causas: dato.causas,
            actividades: dato.actividades,
            hperdidas: dato.hperdidas,
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

    const selecMantenimiento = (e)=>{
        console.log(e.target.value);
        var newForm2 = form;
        newForm2.tipomant = e.target.value;
        setForm(newForm2);
    };

    const selecEstado = (e)=>{
        console.log(e.target.value);
        var newForm2 = form;
        newForm2.estadoequipo = e.target.value;
        setForm(newForm2);
    };

    const selecAlerta = (e)=>{
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
                <Button color="success" onClick={() => mostrarModalInsertar()}>Agregar Reporte</Button>
                <br />
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Culminacion</th>
                            <th>Código O/T</th>
                            <th>Estado Equipo</th>
                            <th>Falla</th>
                            <th>H.Perdidas</th>
                            <th>Costo</th>
                            <th>Acciones</th>
                            <th>Información</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.sort((a, b) => (a.indice - b.indice)).map((dato, index) => (
                            <tr key={dato.indice} >
                                <td>{index + 1}</td>
                                <td>{dato.id}</td>
                                <td>{dato.fechainicio}</td>
                                <td>{dato.fechatermino}</td>
                                <td>{dato.codigoot}</td>
                                <td>{dato.estadoequipo}</td>
                                <td>{dato.falla}</td>
                                <td>{dato.hperdidas}</td>
                                <td>{dato.costo}</td>
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
                            CedulaT:
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
                            Código Equipo:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.codigoe}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <label>
                            Tipo Mantenimiento:
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
                            Nivel Alerta:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.nivelalerta}
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
                            name="fechainicio"
                            type="text"
                            onChange={handleChange}
                            value={form.fechainicio}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Fecha Termino
                        </label>
                        <input
                            className="form-control"
                            name="fechatermino"
                            type="text"
                            onChange={handleChange}
                            value={form.fechatermino}
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
                            Código Equipo:
                        </label>
                        <input
                            className="form-control"
                            name="codigoe"
                            type="text"
                            onChange={handleChange}
                            value={form.codigoe}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Estado:
                        </label>
                        <select  onChange={selecEstado} className="form-select" aria-label="Default select tipo">
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
                        <select  onChange={selecMantenimiento} className="form-select" aria-label="Default select tipo">
                                    <option value="Preventivo" >Preventivo</option>
                                    <option value="Correctivo">Correctivo</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Nivel de Alerta:
                        </label>
                        <select  onChange={selecAlerta} className="form-select" aria-label="Default select tipo">
                                    <option value="Funcional" >Funcional</option>
                                    <option value="Catastrófico">Catastrófico</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Falla:
                        </label>
                        <input
                            className="form-control"
                            name="falla"
                            type="text"
                            onChange={handleChange}
                            value={form.falla}
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
                            value={form.causas}
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
                            value={form.actividades}
                        />
                    </FormGroup>
                    <FormGroup>
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
                            value={form.repuestos}
                        />
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
                        <input
                            className="form-control"
                            name="observaciones1"
                            type="text"
                            onChange={handleChange}
                            value={form.observaciones1}
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
                            value={form.verificador}
                        />
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
                                    CI Tecnico:
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
                                    Código Equipo:
                                </label>
                                <input
                                    className="form-control"
                                    name="codigoe"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid >
                            <Grid item xs={6}>
                                <label>
                                    Tipo de Mantenimiento:
                                </label>
                                <select  onChange={selecMantenimiento} className="form-select" aria-label="Default select tipo">
                                    <option value="Preventivo" >Preventivo</option>
                                    <option value="Correctivo">Correctivo</option>
                                </select>
                                
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Estado:
                                </label>
                                <select  onChange={selecEstado} className="form-select" aria-label="Default select tipo">
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
                                <select  onChange={selecAlerta} className="form-select" aria-label="Default select tipo">
                                    <option value="Funcional" >Funcional</option>
                                    <option value="Catastrófico">Catastrófico</option>
                                </select>
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    H.Perdidas:
                                </label>
                                <input
                                    className="form-control"
                                    name="hperdidas"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
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



