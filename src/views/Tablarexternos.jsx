import React, { useEffect, useState } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export default function Reportexterno() {

    const [elementosext, setElementosext] = useState([]);

    const getData5 = async () => {
        const reference = query(collection(db, "reportes externos"));
        const data = await getDocs(reference);
        setElementosext(
            data.docs.map((doc) => ({ ...doc.data() }))
        );
    }
    console.log(elementosext);

    useEffect(() => {
        getData5();
    }, [])

    return (
        <>
            <h1> Estatus Reportes Externos</h1>
            <div style={{ height: 800, width: '100%' }}>
                <div className='container.fluid'>
                    <div className='row'>
                        <div className='col'>
                            <table className='table table-light table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Empresa</th>
                                        <th>Numero de Reporte</th>
                                        <th>Equipo</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elementosext.map((rexterno) => (
                                        <tr key={rexterno.id}>
                                            <td>{rexterno.id}</td>
                                            <td>{rexterno.fechaext}</td>
                                            <td>{rexterno.empresaext}</td>
                                            <td>{rexterno.numeroreportefisico}</td>
                                            <td>{rexterno.equipoter}</td>
                                            <td>{rexterno.estadoext}</td>
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

        </>
    );
}
