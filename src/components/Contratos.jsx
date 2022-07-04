import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { uploadBytes,ref,getDownloadURL } from "firebase/storage";
import { collection, setDoc, query, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import Grid from "@mui/material/Grid"
import { db,storage } from "../firebase/firebase-config";
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
    const [fechainicio, setFechainicio] = React.useState(new Date('2022-08-01T21:11:54'));
    const [fechafinal, setFechafinal] = React.useState(new Date('2022-08-02T21:11:54'));
   const [ncontrato, setNcontrato]= useState('');
   const [equipos, setEquipos]= useState('');
   const [empresa, setEmpresa]= useState('');
   const [descripcion, setDescripcion]= useState('');
    const [file,setFile]= useState(null);
    const [url, setUrl] = useState("");
    const [form, setForm] = useState({});

    const buscarImagen = (e) =>{
        if (e.target.files[0] !== undefined) {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
        }else{
            console.log('no hay archivo');
        }
    };

 

    const getData = async () => {
        const reference = query(collection(db, "contratos"));
        onSnapshot(reference, (querySnapshot) => {
            console.log(querySnapshot.docs)
            setData(
                querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            );
        });
    }

    const sendData = () =>{
        var contrato = {};
        var val = Date.now();
        if (file === null ){
            contrato = {
                finicio: fechainicio.toDateString(),
                ffinal: fechafinal.toDateString(),
                indice: val,
                ncontrato: ncontrato,
                equipos: equipos,
                empresa: empresa,
                descripcion: descripcion,
                nameImg: 'SP.PNG',
                id:uuidv4(),
              };
              sendFirestore(contrato);
        }else{
         contrato = {
            finicio: fechainicio.toDateString(),
            ffinal: fechafinal.toDateString(),
            indice: val,
            ncontrato: ncontrato,
            equipos: equipos,
            empresa: empresa,
            descripcion: descripcion,
            nameImg: file.name,
            id:uuidv4(),
          };
          sendFirestore(contrato);
          sendStorage();
        }
        setFile(null);
        cerrarModalInsertar();
    };

    const sendFirestore = (contrato) => {
        try {
            setDoc(doc(db, "contratos",`${contrato.id}` ),contrato);
              console.log("Contrato agregada")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    const sendStorage = () =>{
        //pasar parametros variables
        const storageRef = ref(storage, `contratos/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
    };

    // const agregardatos = async (informacion) => {

    //     const newperson = {
    //         finicio: value4.toDateString(),
    //         ffinal: value5.toDateString(),
    //         contrato: informacion.contrato,
    //         equipos: informacion.equipos,
    //         empresa: informacion.empresa,
    //         descripcion: informacion.descripcion,
    //         id: uuidv4(),
    //         indice: Date.now(),
    //     }


    //     try {
    //         await setDoc(doc(db, "contratos", `${newperson.id}`), newperson);

    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }

    // const mostrarModalActualizar = (dato) => {
    //     setForm(dato);
    //     setModalactualizar(true);
    // };

    const mostrarModalInformacion = (dato) => {
        setForm(dato);
        descargararchivo(dato.nameImg);
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

    // const editar = async (dato) => {

    //     var arreglo = data;
    //     console.log(data);
    //     const database = doc(db, "contratos", dato.id);
    //     arreglo.map((registro) => {
    //         if (dato.id === registro.id) {
    //             registro.contrato= dato.contrato;
    //             registro.equipos= dato.equipos;
    //             registro.empresa= dato.empresa;
    //             registro.descripcion= dato.descripcion;
    //             registro.finicio= dato.finicio;
    //             registro.ffinal= dato.ffinal;

    //             return 0;
    //         }
    //         return 0;
    //     });
    //     setData(arreglo);
    //     await updateDoc(database, {
    //         contrato: dato.contrato,
    //         equipos: dato.equipos,
    //         empresa: dato.empresa,
    //         descripcion: dato.descripcion,
    //         finicio: dato.finicio,
    //         ffinal: dato.ffinal,
    //     });

    //     // setModalactualizar(false);
    // };

    const eliminar = async (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            await deleteDoc(doc(db, "contratos", `${dato.id}`));
            // setModalactualizar(false);
        }
    };

  

    const handleChange4 = (newValue) => {
        setFechainicio(newValue);
    };
    const handleChange5 = (newValue) => {
        setFechafinal(newValue);
    };

    const descargararchivo = (nombre) => {
        getDownloadURL(ref(storage, `contratos/${nombre}`)).then((url) => {
            console.log(url);
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
                <Button color="success" onClick={() => mostrarModalInsertar()}>Agregar Contrato</Button>
                <br />
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>N. Contrato</th>
                            <th>Empresa</th>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                            <th>Información</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.sort((a, b) => (a.indice - b.indice)).map((contrato, index) => (
                            <tr key={contrato.indice} >
                                <td>{index+1}</td>
                                <td>{contrato.ncontrato}</td>
                                <td>{contrato.empresa}</td>
                                <td>{contrato.descripcion}</td>
                                <td>
                                    <Stack direction="row" spacing={2} alignitems="center" justifyContent="center" >
                                        {/* <Button
                                            color="primary"
                                            onClick={() => mostrarModalActualizar(dato)}
                                        >
                                            Editar
                                        </Button>{" "} */}
                                        <Button color="danger" onClick={() => eliminar(contrato)}>Eliminar</Button>
                                    </Stack>
                                </td>
                                <td>
                                    <IconButton aria-label="delete" color="success" onClick={() => mostrarModalInformacion(contrato)}><InfoIcon /></IconButton>

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
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={10}>
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
                            <Grid item xs={1}>
                            </Grid>
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
                                            value={fechainicio}
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
                                            value={fechafinal}
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
                                    onChange={(e)=>{setNcontrato(e.target.value)}}
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
                                    onChange={(e)=>{setEmpresa(e.target.value)}}
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
                                    onChange={(e)=>{setEquipos(e.target.value)}}
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
                                    onChange={(e)=>{setDescripcion(e.target.value)}}
                                />
                            </Grid>
            <Grid item xs={12}>
            <div className="mb-3">
                <label className="form-label">Cargar Contrato</label>
                <input className="form-control" onChange={buscarImagen} type="file" id="formFile" />
            </div>
            </Grid>
                        </Grid>
                    </FormGroup>
                    {/* aqui termina el grid */}


                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => sendData()}
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



