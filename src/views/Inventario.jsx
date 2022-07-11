import React from "react";
import Ingresoequipos from "../components/Ingreso";
import '../hoja-de-estilos/Tabla.css'

export default function Inventarioview(){

    return(
        <>
        <br />
        <h1>Inventario Equipos</h1>
        <br />
        <h3>Médicos - Industriales</h3>
        <Ingresoequipos/>
        </>
    );
}