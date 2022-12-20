import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {useQuery} from 'react-query'
import {Link} from 'react-router-dom'
import axios from 'axios'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
    const { isLoading, isError, data, error, refetch } = useQuery(
        "pasien",
        async () => {
            const { data } = await axios("http://localhost:5000/pasien");
            return data;
        }
    );  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell align="right">Alamat</TableCell>
            <TableCell align="right">Umur</TableCell>
            <TableCell align="right">No Telepon</TableCell>            
            <TableCell align="right">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            isLoading 
            ? <>Loading</>
            :
            data.map((item) => (
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none'  }}
                component={Link}
                to={'/pasien/' + item._id}
                >
                <TableCell component="th" scope="row">
                    {item.namaDepan}
                </TableCell>
                <TableCell align="right">{item.alamat}</TableCell>
                <TableCell align="right">{item.umur}</TableCell>
                <TableCell align="right">{item.notelp}</TableCell>                
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}