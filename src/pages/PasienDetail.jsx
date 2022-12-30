import React from 'react'
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

import {useParams, Link} from 'react-router-dom'
import {useQuery, useMutation} from 'react-query'
import PasienService from '../../service/PasienService'
import RekamMedikTable from '../component/RekamMedikTable'

export default function Pasien() {
  const {pasien_id} = useParams()      
  const [pasienData,setPasienData] = React.useState()

  var pasienid = 0

  if(typeof pasien_id !== 'undefined'){
    pasienid = pasien_id
  }
    
  const pasien = useQuery("pasien", () => 
    PasienService.getOne(pasienid))
  
  const deleteRecord = async (pasien_id) => {
    return await PasienService.delete(pasien_id).then((response) => console.log(response))
  }

  const mutation = useMutation(deleteRecord)  

  const onSubmit = data => {    
    mutation.mutate(data)        
  }    

  return (    
    <Grid container spacing={10}>               
      <Grid item container xs={12} spacing={2} sx={{ minHeight: 260 }}>
          {
            pasien.isLoading ? <>Loading</> :            
            pasien.isError ? <>Error Silahkan Cek Koneksi Anda</> 
            : pasien.data === null || typeof pasien.data === 'undefined' ? <></>
            :
            <>
              <Grid item xs={12} container justifyContent='space-between' alignItems='center'>
                <Grid item container xs={6} alignItems='center'>
                  <Avatar size='small' sx={{ mr: 2}}>H</Avatar>
                  <Typography variant='h6'>{pasien.data.namaDepan} {pasien.data.namaBelakang}</Typography>
                </Grid>
                <Grid item container xs={6} justifyContent='flex-end'>                  
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    {/* <Typography variant='h6'>{pasien.data._id}</Typography> */}                    
                    <IconButton aria-label='edit' color='primary' size='small'  component={Link} to={'/pasien/edit/' + pasien.data._id}><EditIcon /></IconButton>
                    <IconButton aria-label='delete' color='error' size='small'  onClick={() => deleteRecord(pasien.data._id)}><DeleteIcon /></IconButton>                    
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid item xs={12} container spacing={4}>
                <Grid item container xs={12}>
                  <Grid item xs={3}>
                    <Typography variant='caption'>Nama</Typography>
                    <Typography variant='body1' fontWeight='bold'>{pasien.data.namaDepan} {pasien.data.namaBelakang}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='caption'>Jenis Kelamin</Typography>
                    <Typography variant='body1' fontWeight='bold'>{pasien.data.jenisKelamin}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='caption'>Umur</Typography>
                    <Typography variant='body1' fontWeight='bold'>{pasien.data.umur}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='caption'>Pekerjaan</Typography>
                    <Typography variant='body1' fontWeight='bold'>{pasien.data.pekerjaan}</Typography>
                  </Grid> 
              </Grid>
              <Grid item container>
                <Grid item xs={3}>
                  <Typography variant='caption'>No Telepon</Typography>
                  <Typography variant='body1' fontWeight='bold'>{pasien.data.notelp}</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant='caption'>Alamat</Typography>
                  <Typography variant='body1' fontWeight='bold'>{pasien.data.alamat}</Typography>
                </Grid>
              </Grid>
              </Grid>                          
          </>
          }
        </Grid>                
      
      <Grid item xs={12}>
        <Box sx={{ display : 'flex', alignItems: 'center', justifyContent:'space-between'}}>
          <Typography variant='h6'>Rekam Medik</Typography>
          <Button variant='contained' component={Link} to={'/rekam/insert/' + pasienid + '/0'}>Tambah Rekam Medik</Button>
        </Box>
        <Box sx={{ mt: 2}}>
          <RekamMedikTable pasien_id={pasienid}/>
        </Box>
      </Grid>
    </Grid>
  )
}
