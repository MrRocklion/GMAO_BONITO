import React, { useEffect, useState } from "react";
import { collection, setDoc, query, doc, updateDoc, deleteDoc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase/firebase-config"
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
export default function Tablav2(){
    const [data,setData]=useState([]);
    const [modalActualizar,setModalactualizar]=useState(false);
    const [modalInsertar,setModalinsertar]=useState(false);
    const [form,setForm] = useState({
        nombres: "",
        apellidos: "",
        ruc:"",
        fechanacimiento:"",
        contacto:"",
        correo:"",
    });

    const getData = async () => {
    const reference = query(collection(db, "dpersonales"));
   onSnapshot(reference, (querySnapshot) => {
            console.log(querySnapshot.docs)
                 setData(
        querySnapshot.docs.map((doc) => ({ ...doc.data()}))
    );
      });

    }
    
    
    
    const agregardatos = async (informacion) => {

      const newperson = {
        nombres: informacion.nombres,
          apellidos: informacion.apellidos,
          ruc: informacion.ruc,
          fechanacimiento: informacion.fechanacimiento,
          contacto: informacion.contacto,
          correo: informacion.correo,  
          id: uuidv4(),
      }


      try {
      await setDoc(doc(db, "dpersonales",`${newperson.id}`),newperson);

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
    
     const  mostrarModalInsertar = () => {
        // this.setState({
        //   modalInsertar: true,
        // });
        setModalinsertar(true);
      };
    
      const cerrarModalInsertar = () => {
        // this.setState({ modalInsertar: false });
        setModalinsertar(false);
      };
    
      const editar = async(dato) => {
      
        var arreglo = data;
        console.log(data);
    const database = doc(db, "dpersonales",dato.id);
        arreglo.map((registro) => {
          if (dato.id === registro.id) {
            registro.nombres = dato.nombres;
            registro.apellidos = dato.apellidos;
            registro.ruc = dato.ruc;
            registro.fechanacimiento = dato.fechanacimiento;
            registro.contacto = dato.contacto;
            registro.correo = dato.correo;
            return 0;
          }
          return 0;
        });
        setData(arreglo);
        await updateDoc(database, {
           
            nombres:dato.nombres,
            apellidos:dato.apellidos,
            ruc:dato.ruc,
            fechanacimiento:dato.fechanacimiento,
            contacto:dato.ruc,
            correo:dato.correo,
        });

        setModalactualizar(false);
      };
    
      const eliminar = async(dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
        if (opcion === true) {
            await deleteDoc(doc(db, "dpersonales",`${dato.id}`));
          setModalactualizar(false);
        }
      };
    
      const insertar= ()=>{
        var valorNuevo= {...form};
        console.log(valorNuevo);
        setModalinsertar(false);
        agregardatos(valorNuevo);
      }
    
      const  handleChange = (e) => {
          setForm(
            {
                ...form,
                [e.target.name]: e.target.value,
              },
          ) 
      };
    


      useEffect(() => {
        getData();
    }, [])



    return(
        <>
        <Container>
        <br />
          <Button color="success" onClick={()=>mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>RUC</th>
                <th>Fecha de Nacimiento</th>
                <th>Contacto</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {data.map((dato,index) => (

                <tr key={dato.id} >
                  <td>{index}</td>
                  <td>{dato.id}</td>
                  <td>{dato.nombres}</td>
                  <td>{dato.apellidos}</td>
                  <td>{dato.ruc}</td>
                  <td>{dato.fechanacimiento}</td>
                  <td>{dato.contacto}</td>
                  <td>{dato.correo}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> eliminar(dato)}>Eliminar</Button>
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
                Nombres:
              </label>
              <input
                className="form-control"
                name="nombres"
                type="text"
                onChange={handleChange}
                value={form.nombres}
              />
            </FormGroup>
            
            <FormGroup>
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
            </FormGroup>

            <FormGroup>
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
            </FormGroup>

            <FormGroup>
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
            </FormGroup>

            <FormGroup>
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
            </FormGroup>

            <FormGroup>
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



        <Modal isOpen={modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar</h3></div>
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
                value={data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombres:
              </label>
              <input
                className="form-control"
                name="nombres"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellidos:
              </label>
              <input
                className="form-control"
                name="apellidos"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                RUC:
              </label>
              <input
                className="form-control"
                name="ruc"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha de Nacimiento
              </label>
              <input
                className="form-control"
                name="fechanacimiento"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Contacto:
              </label>
              <input
                className="form-control"
                name="contacto"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Correo:
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() =>insertar()}
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



