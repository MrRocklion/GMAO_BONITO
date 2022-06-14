import React from "react";
import MenuApp2 from "../components/Menuapp";
import Mantenimientoview from "./Mantenimiento";
import Activosview from "./Activos";
import Inventarioview from "./Inventario";
import Reportes from "./reportes"
import Personal  from "./personal"
import Tercerizacion from "./tercerizacion"
import Ordentrabajoview from "./ordentrabajo";
import Comprasview from "./Compras";
// import Formularioview from "./formulario";

import { Routes, Route } from "react-router-dom";


export default function Userview() {

return(
    <>
        <MenuApp2 />
        <Routes>
        <Route path="/activos" element={<Activosview />} />
        <Route path="/inventario" element={<Inventarioview />} />
        <Route path="/mantenimiento/estatus" element={<Mantenimientoview />} />
        <Route path="/OTS" element={<Ordentrabajoview/>}/>
        <Route path="/reportes" element={<Reportes />} />
        {/* <Route path="/compras" element={<Comprasview />} /> */}
        <Route path="/compras" element={<Comprasview/>}/>
        <Route path="/tercerizacion" element={<Tercerizacion />} />
        <Route path="/personal" element={<Personal />} />
        {/* <Route path="/formulario" element={<Formularioview />} /> */}
        </Routes>

    </>
);

}