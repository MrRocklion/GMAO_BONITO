import React from "react";
// import perfil from '../components/imagenes/imagen1.jpg';
// import imagen1 from '../components/imagenes/imagen4.jpg';
import imagen2 from '../components/imagenes/imagen5.jpg';
import imagen3 from '../components/imagenes/imagen6.jpg';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { Box } from "@mui/material";
import '../hoja-de-estilos/Presentacion.css';
export default function Inicio() {
    return (
        <>
        <h1 className="titulo">Software de Mantenimiento</h1>
        <h3 className="subtitulo">Hospital Santa Inés</h3>
        <p className="texto"> ¡Bienvenidas y bienvenidos, el departamento de Ingeniería Clínica del Hospital Santa Inés</p>
        <p> agradece su colaboración!</p>
<Box  sx={{position:"center",paddingLeft:30 , paddingRight:30, paddingTop:5}}>

<Carousel>
  <Carousel.Item interval={200}>
    <img
      className="d-block w-20"
      src={imagen2}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={200}>
    <img
      className="d-block w-20"
      src={imagen3}
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-20"
      src={imagen2}
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-20"
      src={imagen3}
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</Box>
</>
    );
}