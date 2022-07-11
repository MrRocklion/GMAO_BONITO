import React, { useEffect, useState } from "react";
import { collection, setDoc, query, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db,storage } from "../firebase/firebase-config"
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "reactstrap";
import IconButton from '@mui/material/IconButton';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SchoolIcon from '@mui/icons-material/School';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import { v4 as uuidv4 } from 'uuid';
import Grid from "@mui/material/Grid";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { uploadBytes,ref,getDownloadURL } from "firebase/storage";

export default function Tablav2() {
  const [data, setData] = useState([]);
  const [modalActualizar, setModalactualizar] = useState(false);
  const [modalInsertar, setModalinsertar] = useState(false);
  const [modalDatosp, setModaldatosp] = useState(false);
  const [modalDatosa, setModaldatosa] = useState(false);
  const [modalDatosl, setModaldatosl] = useState(false);
  const [file,setFile]= useState(null);
  const [url, setUrl] = useState("");
  const [form, setForm] = useState({
    codigo: "",
    nombres: "",
    apellidos: "",
    ruc: "",
    fechanacimiento: "",
    contacto: "",
    correo: "",
    niveledu: "",
    titulacion: "",
    cargo: "",
    horario: "",
    capacitacioni: "",
    puesto:"",
  });

  const buscarImagen = (e) =>{
    if (e.target.files[0] !== undefined) {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }else{
        console.log('no hay archivo');
    }
};

  const getData = async () => {
    const reference = query(collection(db, "dpersonales"));
    onSnapshot(reference, (querySnapshot) => {
      console.log(querySnapshot.docs)
      setData(
        querySnapshot.docs.map((doc) => ({ ...doc.data() }))
      );
    });

  };

  const agregardatos = async (informacion) => {
    var newperson = {};
    var val = Date.now();
    if (file === null ){
    newperson = {
      codigo: informacion.codigo,
      nombres: informacion.nombres,
      apellidos: informacion.apellidos,
      ruc: informacion.ruc,
      fechanacimiento: informacion.fechanacimiento,
      contacto: informacion.contacto,
      correo: informacion.correo,
      niveledu: informacion.niveledu,
      titulacion: informacion.titulacion,
      cargo: informacion.cargo,
      horario: informacion.horario,
      capacitacioni: informacion.capacitacioni,
      puesto:informacion.puesto,
      nameImg: 'SP.PNG',
      indice:val,
      id: uuidv4(),
    };
    sendFirestore(newperson);
        }else{
          newperson = {
          codigo: informacion.codigo,
          nombres: informacion.nombres,
          apellidos: informacion.apellidos,
          ruc: informacion.ruc,
          fechanacimiento: informacion.fechanacimiento,
          contacto: informacion.contacto,
          correo: informacion.correo,
          niveledu: informacion.niveledu,
          titulacion: informacion.titulacion,
          cargo: informacion.cargo,
          horario: informacion.horario,
          capacitacioni: informacion.capacitacioni,
          puesto:informacion.puesto,
          nameImg: file.name,
          indice:val,
          id: uuidv4(),
        };
        sendFirestore(newperson);
        sendStorage();
      }
      setFile(null);
      cerrarModalInsertar();
  };

  const sendFirestore = (newperson) => {
    try {
      setDoc(doc(db, "dpersonales", `${newperson.id}`), newperson);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const sendStorage = () =>{
    const storageRef = ref(storage, `dpersonales/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
};

  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalactualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalactualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalinsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalinsertar(false);
  };

  const mostrarModaldp =(dato) =>{
    setForm(dato);
    setModaldatosp(true);
  };

  const cerrarModaldp =()=>{
    setModaldatosp(false);
  };

  const mostrarModalda =(dato) =>{
    setForm(dato);
    descargararchivo(dato.nameImg);
    setModaldatosa(true);
  };

  const cerrarModalda =()=>{
    setModaldatosa(false);
  };

  const mostrarModaldl =(dato) =>{
    setForm(dato);
    setModaldatosl(true);
  };

  const cerrarModaldl =()=>{
    setModaldatosl(false);
  };

  const editar = async (dato) => {

    var arreglo = data;
    console.log(data);
    const database = doc(db, "dpersonales", dato.id);
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        registro.codigo = dato.codigo;
        registro.nombres = dato.nombres;
        registro.apellidos = dato.apellidos;
        registro.ruc = dato.ruc;
        registro.fechanacimiento = dato.fechanacimiento;
        registro.contacto = dato.contacto;
        registro.correo = dato.correo;
        registro.niveledu = dato.niveledu;
        registro.titulacion = dato.titulacion;
        registro.puesto=dato.puesto;
        registro.cargo = dato.cargo;
        registro.horario = dato.horario;
        registro.capacitacioni = dato.capacitacioni;
        return 0;

      }
      return 0;
    });
    setData(arreglo);
    await updateDoc(database, {
      codigo: dato.codigo,
      nombres: dato.nombres,
      apellidos: dato.apellidos,
      ruc: dato.ruc,
      fechanacimiento: dato.fechanacimiento,
      contacto: dato.ruc,
      correo: dato.correo,
      niveledu: dato.niveledu,
      titulacion: dato.titulacion,
      cargo: dato.cargo,
      puesto:dato.puesto,
      horario: dato.horario,
      capacitacioni: dato.capacitacioni,
    });

    cerrarModalActualizar();
  };

  const eliminar = async (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    if (opcion === true) {
      await deleteDoc(doc(db, "dpersonales", `${dato.id}`));
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

  const descargararchivo = (nombre) => {
    getDownloadURL(ref(storage, `dpersonales/${nombre}`)).then((url) => {
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
        <Button color="success" onClick={() => mostrarModalInsertar()}>Agregar Empleado</Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Código Empleado</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              {/* <th>RUC</th>
                <th>Fecha de Nacimiento</th>
                <th>Contacto</th>
                <th>Correo</th> */}
              <th>Datos Personales</th>
              <th>Datos Académicos</th>
              <th>Datos Laborales</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.map((dato) => (

              <tr key={dato.id} >
                <td>{dato.codigo}</td>
                <td>{dato.nombres}</td>
                <td>{dato.apellidos}</td>
                {/* <td>{dato.ruc}</td>
                  <td>{dato.fechanacimiento}</td>
                  <td>{dato.contacto}</td>
                  <td>{dato.correo}</td> */}
                <td>
                  <IconButton aria-label="delete" color="success" onClick={() => mostrarModaldp(dato)}><AssignmentIndIcon /></IconButton>
                </td>
                <td>
                  <IconButton aria-label="delete" color="success" onClick={() => mostrarModalda(dato)}><SchoolIcon /></IconButton>
                </td>
                <td>
                  <IconButton aria-label="delete" color="success" onClick={() => mostrarModaldl(dato)}><FolderSharedIcon /></IconButton>
                </td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => mostrarModalActualizar(dato)}
                  >
                    Editar
                  </Button>{" "}
                  <Button color="danger" onClick={() => eliminar(dato)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={modalActualizar}>
      <Container>
        <ModalHeader>
          <div><h3>Editar Registro</h3></div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
          <Grid container spacing={4}>
          <Grid item xs={6}>
          <label>
              Código Empleado:
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
              Nombres:
            </label>
            <input
              className="form-control"
              name="nombres"
              type="text"
              onChange={handleChange}
              value={form.nombres}
            />
          </Grid>
          <Grid item xs={6}>
          <label>
              Apellidos:
            </label>
            <input
              className="form-control"
              name="apellidos"
              type="text"
              onChange={handleChange}
              value={form.apellidos}
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
              Fecha de nacimiento:
            </label>
            <input
              className="form-control"
              name="fechanacimiento"
              type="text"
              onChange={handleChange}
              value={form.fechanacimiento}
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
              value={form.contacto}
            />
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
          <label>
              Nivel Educativo:
            </label>
            <input
              className="form-control"
              name="niveledu"
              type="text"
              onChange={handleChange}
              value={form.niveledu}
            />
          </Grid>
          <Grid item xs={6}>
          <label>
              Titulacion:
            </label>
            <input
              className="form-control"
              name="titulacion"
              type="text"
              onChange={handleChange}
              value={form.titulacion}
            />
          </Grid>
          <Grid item xs={6}>
          <label>
              Cargo:
            </label>
            <input
              className="form-control"
              name="cargo"
              type="text"
              onChange={handleChange}
              value={form.cargo}
            />
          </Grid>
          <Grid item xs={6}>
          <label>
              Horario:
            </label>
            <input
              className="form-control"
              name="horario"
              type="text"
              onChange={handleChange}
              value={form.horario}
            />
          </Grid>
          <Grid item xs={12}>
          <label>
              Puesto de trabajo:
            </label>
            <input
              className="form-control"
              name="puesto"
              type="text"
              onChange={handleChange}
              value={form.puesto}
            />
          </Grid>
          <Grid item xs={12}>
          <label>
              Capacitación Interna:
            </label>
            <TextareaAutosize
              aria-label="empty textarea"  
              name="capacitacioni"         
              placeholder=""
              className="form-control"
              onChange={handleChange}
              defaultValue={form.capacitacioni}
            />

            {/* <input
              className="form-control"
              name="capacitacioni"
              type="text"
              onChange={handleChange}
              value={form.capacitacioni}
            /> */}
            </Grid>
          </Grid>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => editar(form)}> Editar</Button>
          <Button color="danger" onClick={() => cerrarModalActualizar()}>Cancelar</Button>
        </ModalFooter>
        </Container>
      </Modal>

      <Modal isOpen={modalInsertar}>
      <Container>
        <ModalHeader>
          <div><h3>Insertar</h3></div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
          <Grid container spacing={4}>
          <Grid item xs={6}>
          <label>
              Código Empleado:
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
              Nombres:
            </label>
            <input
              className="form-control"
              name="nombres"
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
          <label>
              Apellidos:
            </label>
            <input
              className="form-control"
              name="apellidos"
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
              Fecha de Nacimiento:
            </label>
            <input
              className="form-control"
              name="fechanacimiento"
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
          <label>
              Nivel Educativo:
            </label>
            <input
              className="form-control"
              name="niveledu"
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
          <label>
              Titulacion:
            </label>
            <input
              className="form-control"
              name="titulacion"
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
          <label>
              Cargo:
            </label>
            <input
              className="form-control"
              name="cargo"
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
          <label>
              Horario:
            </label>
            <input
              className="form-control"
              name="horario"
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
          <label>
              Puesto:
            </label>
            <input
              className="form-control"
              name="puesto"
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
          <label>
              Capacitación Interna:
            </label>

            <TextareaAutosize
              aria-label="empty textarea"  
              name="capacitacioni"          
              placeholder=""
              className="form-control"
              onChange={handleChange}
            />
            
            {/* <input
              className="form-control"
              name="capacitacioni"
              type="text"
              onChange={handleChange}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <div className="mb-3">
                <label className="form-label">Cargar Curriculum</label>
                <input className="form-control" onChange={buscarImagen} type="file" id="formFile" />
            </div>
            </Grid>
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
        </Container>
      </Modal>


      <Modal isOpen={modalDatosp}>
                <ModalHeader>
                    <div><h1>Datos Personales</h1></div>
                </ModalHeader>
                <ModalBody>
                <FormGroup>
                    <Grid container spacing={4}>
                    <Grid item xs={1.5}></Grid>
                    <Grid item xs={9}>
                    <label>
                            RUC:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.ruc}
                        />
                    </Grid>
                    <Grid item xs={1.5}></Grid>
                    <Grid item xs={1.5}></Grid>
                        <Grid item xs={9}>
                        <label>
                            Fecha de Nacimiento:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.fechanacimiento}
                        />
                        </Grid>
                        <Grid item xs={1.5}></Grid>
                        <Grid item xs={1.5}></Grid>
                        <Grid item xs={9}>
                        <label>
                            Contacto:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.contacto}
                        />
                        </Grid>
                        <Grid item xs={1.5}></Grid>
                        <Grid item xs={1.5}></Grid>
                        <Grid item xs={9}>
                        <label>
                            Correo:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.correo}
                        /> 
                        </Grid>
                        <Grid item xs={1.5}></Grid>
                    </Grid>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={() => cerrarModaldp()}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalDatosa}>
                <ModalHeader>
                    <div><h1>Datos Académicos</h1></div>
                </ModalHeader>
                <ModalBody>
                <FormGroup>
                    <Grid container spacing={4}>
                    <Grid item xs={1.5}></Grid>
                    <Grid item xs={9}>
                    <label>
                            Nivel Educativo:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.niveledu}
                        />
                    </Grid>
                    <Grid item xs={1.5}></Grid>
                    <Grid item xs={1.5}></Grid>
                        <Grid item xs={9}>
                        <label>
                            Titulación:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.titulacion}
                        />
                        </Grid>
                        <Grid item xs={1.5}></Grid>
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
                        onClick={() => cerrarModalda()}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalDatosl}>
                <ModalHeader>
                    <div><h1>Datos Laborales</h1></div>
                </ModalHeader>
                <ModalBody>
                <FormGroup>
                    <Grid container spacing={4}>
                    <Grid item xs={1.5}></Grid>
                    <Grid item xs={9}>
                    <label>
                            Cargo:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.cargo}
                        />
                    </Grid>
                    <Grid item xs={1.5}></Grid>
                    <Grid item xs={1.5}></Grid>
                        <Grid item xs={9}>
                        <label>
                            Puesto de Trabajo:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.puesto}
                        />
                        </Grid>
                        <Grid item xs={1.5}></Grid>
                        <Grid item xs={1.5}></Grid>
                        <Grid item xs={9}>
                        <label>
                            Horario:
                        </label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.horario}
                        />
                        </Grid>
                        <Grid item xs={1.5}></Grid>
                        <Grid item xs={1.5}></Grid>
                        <Grid item xs={9}>
                        <label>
                            Capacitación Interna:
                        </label>
                        
                        <TextareaAutosize
              aria-label="empty textarea" 
              readOnly            
              placeholder=""
              className="form-control"
              defaultValue={form.capacitacioni}
            />
                        </Grid>
                        <Grid item xs={1.5}></Grid>
                    </Grid>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={() => cerrarModaldl()}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
    </>
  );

}



