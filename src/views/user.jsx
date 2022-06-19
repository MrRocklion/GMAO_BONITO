import React from "react";
import MenuApp2 from "../components/Menuapp";
import Mantenimientoview from "./Mantenimiento";
import Activosview from "./Activos";
import Inventarioview from "./Inventario";
import Reportes from "./reportes";
import Personal  from "./personal"
import Tercerizacion from "./tercerizacion"
import Ordentrabajoview from "./ordentrabajo";
import Comprasview from "./Compras";
import Informeview from "./Reporte";
import Contactosempresas from "./Empresacontactos";
import Cuestionario from "./Empresas";
import Formularioscompras from "./Iniciocompras";
import Reportexterno from "./Tablarexternos";
import Intervencionesview from "./Intervenciones";
// import Formularioview from "./formulario";
import { Routes, Route } from "react-router-dom";




export default function Userview() {

return(
    <>
        <MenuApp2 />
        <Routes>
        <Route path="/activos" element={<Activosview />} />
        <Route path="/inventario" element={<Inventarioview />} />
        <Route path="/inventario/solicitudcompra" element={<Formularioscompras/>} />
        <Route path="/mantenimiento/estatus" element={<Mantenimientoview />} />
        <Route path="/mantenimiento/contactos" element={<Contactosempresas />} />
        <Route path="/mantenimiento/contactos/cuestionario" element={<Cuestionario />} />
        <Route path="/OTS" element={<Ordentrabajoview/>}/>
        <Route path="/reportes/reportes" element={<Reportes />} />
        <Route path="/reportes/agregar" element={<Informeview/>}/>
        <Route path="/compras" element={<Comprasview/>}/>
        <Route path="/tercerizacion" element={<Tercerizacion />} />
        <Route path="/personal/datospersonal" element={<Personal />} />
        <Route path="/personal/historicos" element={< Intervencionesview/>}/>
        <Route path="/reportes/externos" element={<Reportexterno/>}/>
        </Routes>

    </>
);

}