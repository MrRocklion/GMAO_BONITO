import React, { useEffect, useState } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Contactosempresas() {
    const navigate = useNavigate();

    const [elementosce, setElementosce] = useState([]);

    const getData2 = async () => {
        const reference = query(collection(db, "contactos"));
        const data = await getDocs(reference);
        setElementosce(
            data.docs.map((doc) => ({ ...doc.data() }))
        );
    }
    console.log(elementosce);
    const agregarcuestionario = () => {
        navigate('/home/mantenimiento/contactos/cuestionario')
    }
    useEffect(() => {
        getData2();
    }, [])
    return (
        <>
            <h1> Empresas Contratistas</h1>
            <div style={{ height: 800, width: '100%' }}>
                <div className='container.fluid'>
                    <div className='row'>
                        <div className='col'>
                            <table className='table table-light table-hover'>
                                <thead>
                                    <tr>
                                        <th>Empresa</th>
                                        <th>Representante</th>
                                        <th>Correo</th>
                                        <th>Teléfono</th>
                                        <th>Evaluacion</th>
                                        <th>Actividad</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elementosce.map((contactoemp) => (
                                        <tr key={contactoemp.empresa}>
                                            <td>{contactoemp.empresa}</td>
                                            <td>{contactoemp.representante}</td>
                                            <td>{contactoemp.correo}</td>
                                            <td>{contactoemp.contacto}</td>
                                            <td>{contactoemp.evaluacion}</td>
                                            <td>{contactoemp.actividad}</td>
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
            {<Button variant="contained" color='success' className="boton" onClick={agregarcuestionario}>Agregar Empresa</Button>}
        </>
    );
}

