import React from "react";

import Activosview from "./Activos";

import Comprasview from "./Compras";

// import Formularioview from "./formulario";
import { Routes, Route } from "react-router-dom";
import Vistacontratos from "./Vistacontratos";

import Inicio from "./Presentacion";
import Indicadores from "./Indicadores";
import MenuCompra from "../components/MenuCompra";




export default function UserCompras() {

return(
    <>
        <MenuCompra/>
        <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/activos/equipos" element={<Activosview />} />
        <Route path="/activos/contrato" element={<Vistacontratos />} />
        <Route path="/activos/indicadores" element={<Indicadores/>}/>
        <Route path="/compras" element={<Comprasview/>}/>


        </Routes>

    </>
);

}