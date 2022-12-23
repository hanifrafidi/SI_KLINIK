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
import PasienService from '../../service/PasienService'
import { Typography } from '@mui/material';
import axios from 'axios'

export default function PasienTable() {      

  const navigate = useNavigate();    

  const openPasienPage = (id) => {

    navigate('/pasien/' + id);
  }

  const [pasienData, setPasienData] = React.useState([])

  const pasien = useQuery("pasien", () => 
  PasienService.getAll().then(
    (data) => { 
      setPasienData(data);
  })); 
  

  React.useEffect(() => {  
    // setPasienData(pasien.data);
    if(pasien.isError){
      console.log(pasien)
    }
  }, [])
  
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
            pasien.isLoading ?
            <TableRow><TableCell>Loading...</TableCell></TableRow>:
            pasien.isError ?
            <TableRow><TableCell>Error cek koneksi anda</TableCell></TableRow>:
            typeof pasienData !== undefined ?           
            // console.log(pasienData)
            pasienData.map((item) => (
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none'  }}
                onClick={() => openPasienPage(item._id)}
                >                
                <TableCell component="th" scope="row" >
                    {item.namaDepan}
                </TableCell>
                <TableCell align="right">{item.alamat}</TableCell>
                <TableCell align="right">{item.umur}</TableCell>
                <TableCell align="right">{item.notelp}</TableCell>                
                </TableRow>
            ))                         
            :
            <TableRow><TableCell>Tidak ada</TableCell></TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
    );
  
  
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