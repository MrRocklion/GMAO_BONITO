import React, { useEffect, useState } from "react";
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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function Tablareporte() {
    const [data, setData] = useState([]);
    const [modalActualizar, setModalactualizar] = useState(false);
    const [modalInsertar, setModalinsertar] = useState(false);
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
    const [value2, setValue2] = React.useState(new Date('2015-08-18T21:11:54'));
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



    useEffect(() => {
        getData();
    }, [])



    return (
        <>
            <Container>
                <br />
                <Button color="success" onClick={() => mostrarModalInsertar()}>Crear</Button>
                <br />
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Culminacion</th>
                            <th>Codigo O/T</th>
                            <th>CI Tecnico</th>
                            <th>Codigo Equipo</th>
                            <th>Estado Equipo</th>
                            <th>Tipo Mantenimiento</th>
                            <th>Nivel Alerta</th>
                            <th>Falla</th>
                            <th>Causas</th>
                            <th>Actividades</th>
                            <th>H.Perdidas</th>
                            <th>Repuestos</th>
                            <th>Costo</th>
                            <th>Observaciones</th>
                            <th>Verificador</th>
                            <th>Acciones</th>
                            <th>Información</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.map((dato, index) => (

                            <tr key={dato.id} >
                                <td>{index}</td>
                                <td>{dato.id}</td>
                                <td>{dato.fechainicio}</td>
                                <td>{dato.fechatermino}</td>
                                <td>{dato.codigoot}</td>
                                <td>{dato.cedulat}</td>
                                <td>{dato.codigoe}</td>
                                <td>{dato.estadoequipo}</td>
                                <td>{dato.tipomant}</td>
                                <td>{dato.nivelalerta}</td>
                                <td>{dato.falla}</td>
                                <td>{dato.causas}</td>
                                <td>{dato.actividades}</td>
                                <td>{dato.hperdidas}</td>
                                <td>{dato.repuestos}</td>
                                <td>{dato.costo}</td>
                                <td>{dato.observaciones1}</td>
                                <td>{dato.verificador}</td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() => mostrarModalActualizar(dato)}
                                    >
                                        Editar
                                    </Button>{" "}
                                    <Button color="danger" onClick={() => eliminar(dato)}>Eliminar</Button>
                                </td>
                                <td>
                                    <Button color="info" onClick={() => eliminar(dato)}>Información</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

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
                            Codigo OT
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
                            Codigo Equipo:
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
                        <input
                            className="form-control"
                            name="estadoequipo"
                            type="text"
                            onChange={handleChange}
                            value={form.estadoequipo}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Tipo:
                        </label>
                        <input
                            className="form-control"
                            name="tipomant"
                            type="text"
                            onChange={handleChange}
                            value={form.tipomant}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Alerta:
                        </label>
                        <input
                            className="form-control"
                            name="nivelalerta"
                            type="text"
                            onChange={handleChange}
                            value={form.nivelalerta}
                        />
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
                                        <DesktopDatePicker
                                        label="Fecha Inicio"
                                        inputFormat="MM/dd/yyyy"
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
                                    <DesktopDatePicker
                                    label="Fecha Termino"
                                    inputFormat="MM/dd/yyyy"
                                    value={value2}
                                    onChange={handleChange3}
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                            <label>
                            Codigo O/T:
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
                            Codigo Equipo:
                        </label>
                        <input
                            className="form-control"
                            name="codigoe"
                            type="text"
                            onChange={handleChange}
                        />
                            </Grid>


                        </Grid>
                    </FormGroup>
                    {/* aqui termina el grid */}
                    

                    <FormGroup>
                        <label>
                            Estado:
                        </label>
                        <input
                            className="form-control"
                            name="estadoequipo"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Tipo:
                        </label>
                        <input
                            className="form-control"
                            name="tipomant"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Alerta:
                        </label>
                        <input
                            className="form-control"
                            name="nivelalerta"
                            type="text"
                            onChange={handleChange}
                        />
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
                            H.Perdidas:
                        </label>
                        <input
                            className="form-control"
                            name="hperdidas"
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
                            Costo:
                        </label>
                        <input
                            className="form-control"
                            name="costo"
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



