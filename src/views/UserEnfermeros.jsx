import React from "react";
import Ordentrabajoview from "./ordentrabajo";
import { Routes, Route } from "react-router-dom";
import Inicio from "./Presentacion";
import MenuEnfermeras from "../components/MenuEnferneros";





export default function UserEnfermeras() {

return(
    <>
        <MenuEnfermeras />
        <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/OTS" element={<Ordentrabajoview/>}/>
        </Routes>

    </>
);

}