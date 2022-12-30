import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
  Grid,
  Avatar,
  IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {useQuery} from 'react-query'
import {Link, useNavigate} from 'react-router-dom'
import DokterService from '../../service/DokterService'

export default function DokterTable() {      

  const navigate = useNavigate();    

  const openDokterPage = (id) => {

    navigate('/dokter/' + id);
  }

  const deleteRecord = async (dokter_id) => {
    return await DokterService.delete(dokter_id).then((response) => console.log(response))
  }

  const [dokterData, setDokterData] = React.useState([])

  const dokter = useQuery("dokter", () => 
  DokterService.getAll().then(
    data => { 
      if(data !== undefined || null) {
        setDokterData(data);
      }
  }));
  

  React.useEffect(() => {  
    // setDokterData(dokter.data);
    if(dokter.isError){
      console.log(dokter)
    }
  }, [])
  
  return (        
    <TableContainer>
      
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>Alamat</TableCell>
            <TableCell>Umur</TableCell>
            <TableCell>No Telepon</TableCell>            
            <TableCell>Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>                   
          {                                                   
            dokter.isLoading ?
            <TableRow><TableCell>Loading...</TableCell></TableRow>:
            dokter.isError ?
            <TableRow><TableCell>Error cek koneksi anda</TableCell></TableRow>:
            typeof dokterData !== 'undefined' ?           
            // console.log(dokterData)
            dokterData.map((item) => (
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none'  }}                
                >                
                <TableCell component="th" scope="row" onClick={() => openDokterPage(item._id)}>
                    {item.namaDepan}
                </TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>{item.umur}</TableCell>
                <TableCell>{item.notelp}</TableCell>                
                <TableCell>
                    <IconButton aria-label='edit' color='primary' size='small'  component={Link} to={'/dokter/edit/' + item._id}><EditIcon /></IconButton>
                    <IconButton aria-label='delete' color='error' size='small'  onClick={() => deleteRecord(item._id)}><DeleteIcon /></IconButton>                    
                </TableCell>
                </TableRow>
            ))                         
            :
            <TableRow><TableCell>Tidak ada data dokter / cek koneksi anda</TableCell></TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
    );
  
  
}

    // <TableContainer component={Paper}>
    //   {console.log(dokter)}
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
    //         dokter.data.map((item) => (
    //             <TableRow
    //             key={item._id}
    //             sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none'  }}
    //             onClick={() => openDokterPage(item._id)}
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