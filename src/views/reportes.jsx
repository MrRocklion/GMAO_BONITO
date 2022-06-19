import React, { useEffect, useState } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Reportes(){
    const navigate = useNavigate();

    const [elementosre, setElementosre] = useState([]);

    const getData1 = async () => {
        const reference = query(collection(db, "reportes"));
        const data = await getDocs(reference);
        setElementosre(
            data.docs.map((doc) => ({ ...doc.data() }))
        );
    }

    const agregarformulario1 = () => {
        navigate('/home/reportes/agregar')
    }

    console.log(elementosre);

    useEffect(() => {
        getData1();
    }, [])
    return(
        <>
        <h1> Módulo Gestión de Reportes</h1>
        <div style={{ height: 800, width: '100%' }}>
                <div className='container.fluid'>
                    <div className='row'>
                        <div className='col'>
                            <table className='table table-light table-hover'>
                                <thead>
                                    <tr>
                                        <th>Código O/T</th>
                                        <th>Fecha Inicio</th>
                                        <th>Fecha Termino</th>
                                        <th>Código Empleado</th>
                                        <th>Código Equipo</th>
                                        {/* <th>Equipo</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Serie</th> */}
                                        <th>Actividades</th>
                                        <th>Estado del equipo</th>
                                        <th>Repuestos</th>
                                        <th>Costo</th>
                                        <th>Observaciones</th>
                                        <th>Verificador</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elementosre.map((reporte) => (
                                        <tr key={reporte.codigo}>
                                            <td>{reporte.codigo}</td>
                                            <td>{reporte.fechai}</td>
                                            <td>{reporte.fechat}</td>
                                            <td>{reporte.cedulat}</td>
                                            <td>{reporte.codigoe}</td>
                                            {/* <td>{reporte.equipor}</td>
                                            <td>{reporte.marcar}</td>
                                            <td>{reporte.modelor}</td>
                                            <td>{reporte.serier}</td> */}
                                            <td>{reporte.actividades}</td>
                                            <td>{reporte.estadoequipo}</td>
                                            <td>{reporte.repuestos}</td>
                                            <td>{reporte.costo}</td>
                                            <td>{reporte.observaciones1}</td>
                                            <td>{reporte.verificador}</td>
                                            <td>
                                                <button className="btn btn-danger mx-2">Editar</button>
                                                <button className="btn btn-success">Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {<Button variant="contained" color='success' className="boton" onClick={agregarformulario1}>Agregar Reporte</Button>}
        </>
    );
}