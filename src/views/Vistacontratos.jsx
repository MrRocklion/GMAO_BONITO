import React, { useEffect, useState } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/Grid";
import { storage } from "../firebase/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import { Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../hoja-de-estilos/Tabla.css'

export default function Vistacontratos() {
const [elementoscon, setElementoscon] = useState([]);
  const [currentform,setCurrenform]= useState({});
  const [modalInfor, setModalinfor] = useState(false);
  const [url, setUrl] = useState("");

  const getData12 = async () => {
    const reference = query(collection(db, "contratos"));
    const data = await getDocs(reference);
    setElementoscon(
      data.docs.map((doc) => ({ ...doc.data() }))
    );
  }
  console.log(elementoscon);

  const vistainfor = (data) => {
    setCurrenform(data);
    console.log(currentform);
    descargararchivo(data.nameImg);
    setModalinfor(true);
  };

  const cerrarmodalinfor =()=>{
    setModalinfor(false);
  };

  const descargararchivo = (nombre) => {
    getDownloadURL(ref(storage, `contratos/${nombre}`)).then((url) => {
        console.log(url);
        setUrl(url);
    })

};

  useEffect(() => {
    getData12();
  }, [])

    return (
        <>
        <Container>
        <br />
        <h1> Contratos </h1>
        <br />
        <Table>
                <Thead>
                <Tr>
                <Th>#</Th>
                <Th>N. Contrato</Th>
                <Th>Empresa</Th>
                <Th>Descripción</Th>
                <Th>Información</Th>
                </Tr>
                        </Thead>
                        <Tbody>
                  {elementoscon.sort((a, b) => (a.indice - b.indice)).map((contratos, index) => (
                    <Tr key={contratos.indice} >
                    <Td>{index + 1}</Td>
                    <Td>{contratos.ncontrato}</Td>
                    <Td>{contratos.empresa}</Td>
                    <Td>{contratos.descripcion}</Td>
                    <Td>
                        <IconButton aria-label="delete" onClick={() => { vistainfor(contratos) }} color="gris"><InfoIcon /></IconButton>
                        </Td>
                                </Tr>
                        ))}
                 </Tbody>
                </Table>
            </Container>

      <Modal isOpen={modalInfor}>
        <Container>
          <ModalHeader>
            <div><h1>Información Contrato</h1></div>
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
                    value={currentform.finicio}
                  />
                </Grid >
                <Grid item xs={6}>
                  <label>
                    Final Contrato:
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={currentform.ffinal}
                  />
                </Grid >
                <Grid item xs={12}>
                  <label>
                    Equipos:
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={currentform.equipos}
                  />
                </Grid >

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
          <ModalFooter className="modal-footer">
          <Button
                        className="editar"
                        onClick={() => cerrarmodalinfor()}
                    >
                        Cerrar
                    </Button>
          </ModalFooter>

        </Container>
      </Modal>
        </>
    );
}