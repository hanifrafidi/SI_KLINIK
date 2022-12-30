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
import RekamMedikService from '../../service/RekamMedikService'
import moment from 'moment'

export default function RekamMedikTable(props) {      

  const navigate = useNavigate();    

  const openrekam_medikPage = (pasien_id, rekam_id) => {

    navigate('/rekam/edit/'+ pasien_id + '/' + rekam_id);
  }

  const [RekamMedikData, setRekamMedikData] = React.useState([])

  const rekam_medik = useQuery("rekam_medik", () => 
  
  {
    if(props.pasien_id === 0 || typeof props.pasien_id === "undefined"){
      RekamMedikService.getAll().then(data => {        
        setRekamMedikData(data)
        
      })
    }else{
      RekamMedikService.getByPasien(props.pasien_id).then(
        (data) => {           
          setRekamMedikData(data);          
      })
    }
  })
  ;   
  
  React.useEffect(() => {      
    
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
    <TableContainer >
      
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>            
            <TableCell >Pasien</TableCell>
            <TableCell >Diagnosa</TableCell>
            <TableCell>Tindakan</TableCell>
            <TableCell>Dokter</TableCell>            
            <TableCell>Tanggal</TableCell>
            <TableCell>Option</TableCell>
          </TableRow>
        </TableHead>        
        <TableBody>                   
          {                                                   
            rekam_medik.isLoading ?
            <TableRow><TableCell>Loading...</TableCell></TableRow>:
            rekam_medik.isError ?
            <TableRow><TableCell>Error cek koneksi anda</TableCell></TableRow>:
            typeof RekamMedikData !== 'undefined' || RekamMedikData.length > 0 ?
            // console.log(rekam_medikData)
            RekamMedikData.map((item) => (
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none'  }}                
                >                
                <TableCell>
                    {/* {item.pasien_id} */}
                </TableCell>
                <TableCell>
                    {item.diagnosa}
                </TableCell>
                <TableCell >{item.tindakan}</TableCell>
                <TableCell >{item.dokter}</TableCell>
                <TableCell >{moment(item.tanggal).format('DD-MMM-YY')}</TableCell>
                <TableCell>
                    <IconButton aria-label='edit' color='primary' size='small'  component={Link} to={'/rekam/edit/' + item.pasien_id + '/' + item._id}><EditIcon /></IconButton>
                    <IconButton aria-label='delete' color='error' size='small'  onClick={() => deleteRecord(item._id)}><DeleteIcon /></IconButton>                    
                </TableCell>
                </TableRow>
            ))                         
            :            
            <TableRow><TableCell>Belum ada Rekam Medik</TableCell></TableRow>
          }
        </TableBody>                
      </Table>
    </TableContainer>
    );
  
  }
}