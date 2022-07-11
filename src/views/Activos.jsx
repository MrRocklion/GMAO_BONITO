import React, { useEffect, useState } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/Grid"
import {Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../hoja-de-estilos/Tabla.css'

export default function Activosview() {
  const [elementosin, setElementosin] = useState([]);
  const [currentform,setCurrenform]= useState({});
  const [modalInformacion1, setModalinformacion1] = useState(false);
  const getData7 = async () => {
    const reference = query(collection(db, "ingreso"));
    const data = await getDocs(reference);
    setElementosin(
      data.docs.map((doc) => ({ ...doc.data() }))
    );
  }
  console.log(elementosin);

  const vistainformacion1 = (data) => {
    setCurrenform(data);
    console.log(currentform);
    setModalinformacion1(true);
  }

  const cerrarmodalinf =()=>{
    setModalinformacion1(false);
  }
  useEffect(() => {
    getData7();
  }, [])
  return (
    <>
      
      <Container>
      <br />
        <h1>Inventario Equipos</h1>
        <br />
        <h3>Médicos - Industriales</h3>
                <br />
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Código</Th>
                            <Th>Equipo</Th>
                            <Th>Departamento</Th>
                            <Th>Propietario</Th>
                            <Th>Seguro</Th>
                            <Th>Información</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                  {elementosin.sort((a, b) => (a.indice - b.indice)).map((ingresos, index) => (
                    <Tr key={ingresos.indice} >
                       <Td>{ingresos.codigo}</Td>
                       <Td>{ingresos.equipo}</Td>
                       <Td>{ingresos.area}</Td>
                       <Td>{ingresos.propietario}</Td>
                       <Td>{ingresos.seguro}</Td>
                       <Td>
                        <IconButton aria-label="delete" onClick={() => { vistainformacion1(ingresos) }} color="gris"><InfoIcon /></IconButton>
                        </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Container>

      <Modal className="{width:0px}" isOpen={modalInformacion1}>
          <ModalHeader>
            <div><h3>Información Solicitud</h3></div>
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
                    value={currentform.tipo}
                  />
                </Grid >
                <Grid item xs={6}>
                  <label>
                    Marca:
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={currentform.marca}
                  />
                </Grid >
                <Grid item xs={6}>
                  <label>
                    Modelo:
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={currentform.modelo}
                  />
                </Grid >
                <Grid item xs={6}>
                  <label>
                    Serie:
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={currentform.serie}
                  />
                </Grid >
                <Grid item xs={12}>
                  <label>
                    Accesorios:
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={currentform.accesorios}
                  />
                </Grid >
              </Grid>
            </FormGroup>
          </ModalBody>
          <ModalFooter className="modal-footer">
          <Button
                        className="editar"
                        onClick={() => cerrarmodalinf()}
                    >
                        Cerrar
                    </Button>
          </ModalFooter>
      </Modal>

    </>
  );
}





