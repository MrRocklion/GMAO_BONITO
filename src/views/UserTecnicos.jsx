import React from "react";
import MenuTecnicos from "../components/MenuTecnicos";
import Mantenimientoview from "./Mantenimiento";
import Activosview from "./Activos";
import Inventarioview from "./Inventario";
import Reportes from "./reportes";
import Ordentrabajoview from "./ordentrabajo";
import Comprasview from "./Compras";
import Informeview from "./Reporte";
import Contactosempresas from "./Empresacontactos";
import Cuestionario from "./Empresas";
import Formularioscompras from "./Iniciocompras";
import Reportexterno from "./Tablarexternos";
import Contratosview from "./Contratos";
import { Routes, Route } from "react-router-dom";
import Vistacontratos from "./Vistacontratos";
import Planmantenimiento from "./Planmantenimiento";
import Plan from "./Plan";
import Manual from "./Manual";
import Inicio from "./Presentacion";
import Indicadores from "./Indicadores";


export default function UserTecnicos() {

return(
    <>
        <MenuTecnicos/>
        <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/activos/equipos" element={<Activosview />} />
        <Route path="/activos/contrato" element={<Vistacontratos />} />
        <Route path="/activos/indicadores" element={<Indicadores/>}/>
        <Route path="/inventario/invequipos" element={<Inventarioview />} />
        <Route path="/inventario/contratos" element={<Contratosview />} />
        <Route path="/inventario/solicitudcompra" element={<Formularioscompras/>} />
        <Route path="/mantenimiento/estatus" element={<Mantenimientoview />} />
        <Route path="/mantenimiento/mantenimiento" element={<Planmantenimiento/>} />
        <Route path="/mantenimiento/mantenimiento/plan" element={<Plan/>} />
        <Route path="/mantenimiento/mantenimiento/manuales" element={<Manual/>} />
        <Route path="/mantenimiento/contactos" element={<Contactosempresas />} />
        <Route path="/mantenimiento/contactos/cuestionario" element={<Cuestionario />} />
        <Route path="/OTS" element={<Ordentrabajoview/>}/>
        <Route path="/reportes/reportes" element={<Reportes />} />
        <Route path="/reportes/agregar" element={<Informeview/>}/>
        <Route path="/compras" element={<Comprasview/>}/>
        <Route path="/reportes/externos" element={<Reportexterno/>}/>
        </Routes>

    </>
);

}