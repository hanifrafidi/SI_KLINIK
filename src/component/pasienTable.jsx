import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {useQuery} from 'react-query'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Typography } from '@mui/material';

export default function PasienTable() {      

    const navigate = useNavigate();    

    const openPasienPage = (id) => {

      navigate('/pasien/' + id);
    }

  const pasien = useQuery(
    "pasien",
    async () => {
      const { data } = await axios("http://localhost:5000/pasien");
      return data;
    }    
  ); 

  // React.useEffect(() => {}, [pasien])

  if (pasien.isLoading) {
        return <p>Loading...
          {console.log(pasien)}
        </p>
  }
  else if(pasien.isError) {
    return <p>Error: Error Bro
      {console.log(pasien)}
    </p>
  }  
  else{
    // return console.log(pasien)
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
            pasien.data !== undefined ?
            pasien.data.length === 0 ?
            'Data tidak ada' :
            pasien.data.map((item) => (
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none'  }}
                onClick={() => openPasienPage(item._id)}
                >
                <TableCell component="th" scope="row">
                    {item.namaDepan}
                </TableCell>
                <TableCell align="right">{item.alamat}</TableCell>
                <TableCell align="right">{item.umur}</TableCell>
                <TableCell align="right">{item.notelp}</TableCell>                
                </TableRow>
            ))                         
            : ''
          }
        </TableBody>
      </Table>
    </TableContainer>
    );
  
  }
}

    // <TableContainer component={Paper}>
    //   {console.log(pasien)}
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Nama</TableCell>
    //         <TableCell align="right">Alamat</TableCell>
    //         <TableCell align="right">Umur</TableCell>
    //         <TableCell align="right">No Telepon</TableCell>            
    //         {/* <TableCell align="right">Option</TableCell> */}
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>                        
    //       {                    
    //         pasien.data.map((item) => (
    //             <TableRow
    //             key={item._id}
    //             sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none'  }}
    //             onClick={() => openPasienPage(item._id)}
    //             >
    //             <TableCell component="th" scope="row">
    //                 {item.namaDepan}
    //             </TableCell>
    //             <TableCell align="right">{item.alamat}</TableCell>
    //             <TableCell align="right">{item.umur}</TableCell>
    //             <TableCell align="right">{item.notelp}</TableCell>                
    //             </TableRow>
    //         ))            
    //       }
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    // );