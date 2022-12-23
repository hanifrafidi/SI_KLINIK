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
import RekamMedikService from '../../service/RekamMedikService'
import { Typography } from '@mui/material';
import axios from 'axios'

export default function RekamMedikTable(props) {      

  const navigate = useNavigate();    

  const openrekam_medikPage = (id) => {

    navigate('/rekam/edit/' + id);
  }

  const [RekamMedikData, setrekam_medikData] = React.useState([])

  const rekam_medik = useQuery("rekam_medik", () => 
  RekamMedikService.getByPasien(props.id_pasien).then(
    (data) => { 
      // console.log(typeof rekam_medikData !== undefined)
      setrekam_medikData(data);
  })); 
  

  React.useEffect(() => {  
    // setrekam_medikData(rekam_medik.data);
    // console.log(RekamMedikData)    
  }, [])

  if (rekam_medik.isLoading) {
        return <p>Loading...          
        </p>
  }
  else if(rekam_medik.isError) {
    return <p>Error: Error Bro      
    </p>
  }  
  else{
    // return console.log(rekam_medik)
  return (        
    <TableContainer component={Paper}>
      
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>            
            <TableCell >Diagnosa</TableCell>
            <TableCell align="right">Tindakan</TableCell>
            <TableCell align="right">Dokter</TableCell>            
            <TableCell align="right">Tanggal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>                   
          {                                                   
            rekam_medik.isLoading ?
            <TableRow><TableCell>Loading...</TableCell></TableRow>:
            rekam_medik.isError ?
            <TableRow><TableCell>Error cek koneksi anda</TableCell></TableRow>:
            typeof rekam_medikData !== undefined ?           
            // console.log(rekam_medikData)
            RekamMedikData.map((item) => (
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none'  }}
                onClick={() => openrekam_medikPage(item._id)}
                >                
                <TableCell component="th" scope="row" >
                    {item.diagnosa}
                </TableCell>
                <TableCell align="right">{item.tindakan}</TableCell>
                <TableCell align="right">{item.dokter}</TableCell>
                <TableCell align="right">{item.tanggal}</TableCell>                
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
}