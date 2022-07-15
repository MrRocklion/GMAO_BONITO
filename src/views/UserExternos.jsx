import React from "react";
import Tercerizacion from "./tercerizacion";
import { Routes, Route } from "react-router-dom";

import Inicio from "./Presentacion";
import MenuExternos from "../components/menuExternos";

export default function UserviewExt() {

return(
    <>
        <MenuExternos/>
        <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/tercerizacion" element={<Tercerizacion/>}/>
        </Routes>

    </>
);

}