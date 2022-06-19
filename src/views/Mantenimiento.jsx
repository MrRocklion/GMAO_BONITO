import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import '../hoja-de-estilos/Mantenimiento.css';
import { useNavigate } from 'react-router-dom';
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";



// const columns = [

//     { field: 'id', headerName: 'ID', width: 300 },
//     { field: 'cedula', headerName: 'CI Solicitante', width: 130 },
//     { field: 'departamento', headerName: 'Departamento Solicitante', width: 180 },
//     { field: 'prioridad1', headerName: 'Prioridad', width: 180 },
//     { field: 'tipotrabajo', headerName: 'Tipo de Trabajo', width: 180 },
//     { field: 'asunto', headerName: 'Asunto', width: 180 },
//     { field: 'problematica', headerName: 'Problemática', width: 180 },
//     { field: 'observaciones', headerName: 'Observaciones', width: 180 },
//     { field: 'status', headerName: 'Estado', width: 180 },
//     { field: 'acc', headerName: 'Acciones', width: 180 },

// ]
export default function Mantenimientoview() {

    const navigate = useNavigate();

    const [elementosfb, setElementosfb] = useState([]);


    const getData = async () => {
        const reference = query(collection(db, "ordenes"));
        const data = await getDocs(reference);
        setElementosfb(
            data.docs.map((doc) => ({ ...doc.data() }))
        );


    }
    console.log(elementosfb);
    const agregarformulario = () => {
        navigate('/home/reportes/agregar')
    }


    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <h1> Módulo Gestión de Mantenimiento </h1>
            <div style={{ height: 800, width: '100%' }}>
                <div className='container.fluid'>
                    <div className='row'>
                        <div className='col'>
                            <table className='table table-light table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>CI Solicitante</th>
                                        <th>Departamento</th>
                                        <th>Prioridad</th>
                                        <th>Tipo de Trabajo</th>
                                        <th>Asunto</th>
                                        <th>Problemática</th>
                                        <th>Observaciones</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elementosfb.map((orden) => (
                                        <tr key={orden.id}>
                                            <td>{orden.id}</td>
                                            <td>{orden.cedula}</td>
                                            <td>{orden.departamento}</td>
                                            <td>{orden.prioridad1}</td>
                                            <td>{orden.tipotrabajo}</td>
                                            <td>{orden.asunto}</td>
                                            <td>{orden.problematica}</td>
                                            <td>{orden.observaciones}</td>
                                            <td>{orden.estado}</td>
                                            <td>
                                                <button className="btn btn-danger mx-2">Cambiar Estado</button>
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

            {<Button variant="contained" color='success' className="boton" onClick={agregarformulario}>Agregar Reporte</Button>}
        </>

    );
}