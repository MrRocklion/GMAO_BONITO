import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [ 
    { field: 'id', headerName: '# Solicitud', width: 100 },
    { field: 'fi', headerName: 'Fecha', width: 150 },
    { field: 'ci', headerName: 'CI Solicitante', width: 150 },
    { field: 'eq', headerName: 'Equipo', width: 150 },
    { field: 'cod', headerName: 'Codigo Equipo', width: 150 },  
    { field: 'art', headerName: 'Articulo', width: 250 },
    { field: 'est', headerName: 'Cantidad', width: 120 }, 
    { field: 'rep', headerName: 'Precio', width: 120 }, 
    { field: 'obs', headerName: 'Proveedor', width: 150 }, 
    { field: 'prof', headerName: 'Profroma', width: 180 },
    { field: 'state', headerName: 'Estado', width: 180 },
    { field: 'opt', headerName: 'Opciones', width: 180 },
];



export default function Tablacompras(props) {
  const rows = props.datos;
  return (
    <div style={{ height: 900, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
}
