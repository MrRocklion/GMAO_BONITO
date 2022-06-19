import React, { useEffect, useState } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export default function Comprasview(){


    const [elementoscom, setElementoscom] = useState([]);

    const getData3 = async () => {
        const reference = query(collection(db, "compras"));
        const data = await getDocs(reference);
        setElementoscom(
            data.docs.map((doc) => ({ ...doc.data() }))
        );
    }
    console.log(elementoscom);

    useEffect(() => {
        getData3();
    }, [])
    return(
        <>
        <h1> Solicitud de Compras </h1>
        <Autocomplete
            multiple
            id="combo-box-demo"
            options={estado}
            sx={{ '& > :not(style)': { m: 2, width: '60ch'},}}
            renderInput={(params) => <TextField {...params} label="Tipo" color="secondary" focused />}
        />
        <div style={{ height: 800, width: '100%' }}>
                <div className='container.fluid'>
                    <div className='row'>
                        <div className='col'>
                            <table className='table table-light table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>CI Solicitante</th>
                                        <th>Codigo Equipo</th>
                                        <th>Equipo</th>
                                        <th>Artículo</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Proveedor</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {elementoscom.map((compras) => (
                                        <tr key={compras.id}>
                                            <td>{compras.id}</td>
                                            <td>{compras.fechacom}</td>
                                            <td>{compras.cedulacom}</td>
                                            <td>{compras.codigoeqcom}</td>
                                            <td>{compras.equipocom}</td>
                                            <td>{compras.articulocom}</td>
                                            <td>{compras.cantidadcom}</td>
                                            <td>{compras.preciocom}</td>
                                            <td>{compras.proveedorcom}</td>
                                            <td>{compras.estadocom}</td>
                                            <td>
                                                <button className="btn btn-danger mx-2">Cambiar Estado</button>
                                                <button className="btn btn-success">Comentarios</button>
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

 const estado = [ 
     { label: 'Aprobada'},
     { label: 'Rechazada'},
    { label: 'En Proceso'},  
 ]