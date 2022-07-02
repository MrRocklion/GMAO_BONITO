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


export default function Ingresoequipos() {
    const [data, setData] = useState([]);
    const [modalActualizar, setModalactualizar] = useState(false);
    const [modalInsertar, setModalinsertar] = useState(false);
    const [modalInformacion, setModalinformacion] = useState(false);
    const [form, setForm] = useState({
        codigo: "",
        equipo: "",
        propietario: "",
        marca: "",
        modelo: "",
        serie: "",
        accesorios: "",
        area: "",
        tipo: "",
        seguro: "",
    });


    const getData = async () => {
        const reference = query(collection(db, "ingreso"));
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
            equipo: informacion.equipo,
            propietario: informacion.propietario,
            marca: informacion.marca,
            modelo: informacion.modelo,
            serie: informacion.serie,
            accesorios: informacion.accesorios,
            area: informacion.area,
            tipo: informacion.tipo,
            seguro: informacion.seguro,
            id: uuidv4(),
            indice: Date.now(),
        }


        try {
            await setDoc(doc(db, "ingreso", `${newperson.id}`), newperson);

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
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
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
                <Button color="success" onClick={() => mostrarModalInsertar()}>Agregar Equipo</Button>
                <br />
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Codigo</th>
                            <th>Equipo</th>
                            <th>Departamento</th>
                            <th>Propietario</th>
                            <th>Seguro</th>
                            <th>Acciones</th>
                            <th>Información</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.sort((a, b) => (a.indice - b.indice)).map((dato, index) => (
                            <tr key={dato.indice} >
                                <td>{index + 1}</td>
                                <td>{dato.codigo}</td>
                                <td>{dato.equipo}</td>
                                <td>{dato.area}</td>
                                <td>{dato.propietario}</td>
                                <td>{dato.seguro}</td>
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
                                    Código Equipo:
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
                                <select  onChange={selecTipo} className="form-select" aria-label="Default select tipo">
                                    <option value="Medico" >Médico</option>
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
                                <select onChange={selecDepartamento} className="form-select" aria-label="Default select departamento">
                                    <option value="Imágenes">Imágenes</option>
                                    <option value="Cedicardio">Cedicardio</option>
                                    <option value="Emergencia">Emergencia</option>
                                    <option value="Endoscopia">Endoscopia</option>
                                    <option value="Clínico">Lab. Clínico</option>
                                    <option value="Covid">Lab. Covid</option>
                                    <option value="Neonatología">Neonatología</option>
                                    <option value="Quirófano">Quirófano</option>
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

                                <select  onChange={selecSeguro}  className="form-select" aria-label="Default select seguro">
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
                                    Código Equipo:
                                </label>
                                <input
                                    className="form-control"
                                    name="codigo"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Tipo de Equipo:
                                </label>
                                <select  onChange={selecTipo} className="form-select" aria-label="Default select tipo">
                                    <option value="Medico" >Médico</option>
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
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Departamento:
                                </label>
                                <select onChange={selecDepartamento} className="form-select" aria-label="Default select departamento">
                                    <option value="Imágenes">Imágenes</option>
                                    <option value="Cedicardio">Cedicardio</option>
                                    <option value="Emergencia">Emergencia</option>
                                    <option value="Endoscopia">Endoscopia</option>
                                    <option value="Clínico">Lab. Clínico</option>
                                    <option value="Covid">Lab. Covid</option>
                                    <option value="Neonatología">Neonatología</option>
                                    <option value="Quirófano">Quirófano</option>
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
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <label>
                                    Seguro:
                                </label>
                                <select   onChange={selecSeguro}  className="form-select" aria-label="Default select seguro">
                                    <option value="Asegurado" selected >Asegurado</option>
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



