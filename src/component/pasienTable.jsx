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
import PasienService from '../../service/PasienService'
import Dialog from '../component/Dialog'
import Backdrop from '../component/Backdrop'

export default function PasienTable() {      
  const [dialog, setDialog] = React.useState(false)
  const [backdrop, setBackdrop] = React.useState(false)
  const [hapus, setHapus] = React.useState('')

  const navigate = useNavigate();    

  const openPasienPage = (id) => {

    navigate('/pasien/' + id);
  }

  const confirmHapus = (id) => {
    setHapus(id);
    setDialog(true)
  }

  const deleteRecord = async () => {
    setBackdrop(true)
    await PasienService.delete(hapus).then((response) => console.log(response))
    setHapus('')    
    setTimeout(() => setBackdrop((prevState) => prevState = false), 2000)
  }

  const [pasienData, setPasienData] = React.useState([])

  const pasien = useQuery("pasien", () => 
  PasienService.getAll().then(
    data => { 
      if(data !== undefined || null) {
        setPasienData(data);
      }
  }));
  

  React.useEffect(() => {  
    // setPasienData(pasien.data);
    if(pasien.isError){
      console.log(pasien)
    }
  }, [])
  
  return (        
    <>
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
            pasien.isLoading ?
            <TableRow><TableCell>Loading...</TableCell></TableRow>:
            pasien.isError ?
            <TableRow><TableCell>Error cek koneksi anda</TableCell></TableRow>:
            typeof pasienData !== 'undefined' ?           
            // console.log(pasienData)
            pasienData.map((item) => (
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none'  }}                
                >                
                <TableCell component="th" scope="row" onClick={() => openPasienPage(item._id)}>
                    {item.namaDepan}
                </TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>{item.umur}</TableCell>
                <TableCell>{item.notelp}</TableCell> 
                <TableCell>
                    <IconButton aria-label='edit' color='primary' size='small'  component={Link} to={'/pasien/edit/' + item._id}><EditIcon /></IconButton>
                    <IconButton aria-label='delete' color='error' size='small'  onClick={() => confirmHapus(item._id) }><DeleteIcon /></IconButton>
                </TableCell>
                                 
                </TableRow>
            ))                         
            :
            <TableRow><TableCell>Tidak ada data pasien / cek koneksi anda</TableCell></TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog isOpen={dialog} setIsOpen={() => setDialog(!dialog)} confirm={() => deleteRecord()} />
    <Backdrop isOpen={backdrop} setIsOpen={() => setBackdrop(!backdrop)} />
    {console.log(hapus)}
    {console.log('dialog : ' + dialog)}
    {console.log('backdrop : ' + backdrop)}
    </>
    );    
}    