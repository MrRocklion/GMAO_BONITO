import React, { useEffect, useState } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/Grid"
import { Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";

export default function Vistacontratos() {
const [elementoscon, setElementoscon] = useState([]);
  const [currentform,setCurrenform]= useState({});
  const [modalInfor, setModalinfor] = useState(false);

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
    setModalinfor(true);
  }

  const cerrarmodalinfor =()=>{
    setModalinfor(false);
  }
  useEffect(() => {
    getData12();
  }, [])

    return (
        <>
        <h1> Contratos </h1>
        <div style={{ height: 800, width: '100%' }}>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <table className='table table-light table-hover'>
                <thead>
                  <tr>
                    <th>N.Contrato</th>
                    <th>Empresa</th>
                    <th>Descripción</th>
                    <th>Información</th>
                  </tr>
                </thead>

                <tbody>
                  {elementoscon.sort((a, b) => (a.indice - b.indice)).map((contratos, index) => (
                    <tr key={contratos.indice} >
                      <td>{contratos.contrato}</td>
                      <td>{contratos.empresa}</td>
                      <td>{contratos.descripcion}</td>
                      <td>
                        <IconButton aria-label="delete" onClick={() => { vistainfor(contratos) }} color="success"><InfoIcon /></IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
               
              </Grid>
            </FormGroup>
          </ModalBody>
          <ModalFooter className="modal-footer">
            <button className="btn btn-success" onClick={() => { cerrarmodalinfor(false) }}>Cerrar</button>
          </ModalFooter>

        </Container>
      </Modal>
        </>
    );
}