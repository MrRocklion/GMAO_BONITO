import React, { useEffect, useState } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/Grid"
import { Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";

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
      <h1> Módulo Gestión de Activos</h1>
      <div style={{ height: 800, width: '100%' }}>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <table className='table table-light table-hover'>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Equipo</th>
                    <th>Departamento</th>
                    <th>Propietario</th>
                    <th>Seguro</th>
                    <th>Información</th>
                  </tr>
                </thead>

                <tbody>
                  {elementosin.sort((a, b) => (a.indice - b.indice)).map((ingresos, index) => (
                    <tr key={ingresos.indice} >
                      <td>{ingresos.codigo}</td>
                      <td>{ingresos.equipo}</td>
                      <td>{ingresos.area}</td>
                      <td>{ingresos.propietario}</td>
                      <td>{ingresos.seguro}</td>

                      <td>
                        <IconButton aria-label="delete" onClick={() => { vistainformacion1(ingresos) }} color="gris"><InfoIcon /></IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalInformacion1}>
        <Container>
          <ModalHeader>
            <div><h1>Información Solicitud</h1></div>
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
            <button className="btn btn-success" onClick={() => { cerrarmodalinf(false) }}>Cerrar</button>
          </ModalFooter>

        </Container>
      </Modal>

    </>
  );
}





