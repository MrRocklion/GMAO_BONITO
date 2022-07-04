import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius:3,
};



export default function NestedModal() {
  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setModal1(true);
  };
  const handleClose = () => {
    setModal1(false);
  };
  const handleOpen2 = () => {
    setModal2(true);
  };
  const handleClose2 = () => {
    setModal2(false);
    setModal1(false);
    navigate('/home');
  };
  const handleClose3 =()=>{
    setModal2(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Enviar</Button>
      <Modal
        open={modal1}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Su solicitud fue enviada</h2>
         <Button onClick={handleOpen2}>Salir</Button>
      <Button onClick={handleClose}>Nueva Orden</Button>
      <Modal
        hideBackdrop
        open={modal2}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          {/* <h2 id="child-modal-title">Text in a child modal</h2> */}
          <p id="child-modal-description">
            Esta seguro que desea salir?
          </p>
          <Button onClick={handleClose2}>Si</Button>
          <Button onClick={handleClose3}>No</Button>
        </Box>
      </Modal>
        </Box>
      </Modal>
    </div>
  );
}
