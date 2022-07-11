import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function TableExample(props) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Codigo</Th>
          <Th>Equipo</Th>
          <Th>Departamento</Th>
          <Th>Propietario</Th>
          <Th>Seguro</Th>
          <Th>Acciones</Th>
          <Th>Información</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Tablescon</Td>
          <Td>9 April 2019</Td>
          <Td>Tablescon</Td>
          <Td>9 April 2019</Td>
          <Td>Tablescon</Td>
          <Td>9 April 2019</Td>
          <Td>Tablescon</Td>
          <Td>9 April 2019</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}