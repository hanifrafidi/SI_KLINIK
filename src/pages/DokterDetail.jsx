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
import DokterService from '../../service/DokterService'
import RekamMedikTable from '../component/RekamMedikTable'

export default function Dokter() {
  const {dokter_id} = useParams()      
  const [dokterData,setDokterData] = React.useState()

  var dokterid = 0

  if(typeof dokter_id !== 'undefined'){
    dokterid = dokter_id
  }
    
  const dokter = useQuery("dokter", () => 
    DokterService.getOne(dokterid))
  
  const deleteRecord = async (dokter_id) => {
    return await DokterService.delete(dokter_id).then((response) => console.log(response))
  }

  const mutation = useMutation(deleteRecord)  

  const onSubmit = data => {    
    mutation.mutate(data)    
    
  }    

  return (    
    <Grid container spacing={10}>               
      <Grid item container xs={12} spacing={2} sx={{ minHeight: 260, maxHeight: 300 }}>
          {
            dokter.isLoading ? <>Loading</> :            
            dokter.isError ? <>Error Silahkan Cek Koneksi Anda</> 
            : dokter.data === null || typeof dokter.data === 'undefined' ? <></>
            :
            <>
              <Grid item xs={12} container justifyContent='space-between' alignItems='center'>
                <Grid item container xs={6} alignItems='center'>
                  <Avatar size='small' sx={{ mr: 2}}>H</Avatar>
                  <Typography variant='h6'>{dokter.data.namaDepan} {dokter.data.namaBelakang}</Typography>
                </Grid>
                <Grid item container xs={6} justifyContent='flex-end'>                  
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    {/* <Typography variant='h6'>{dokter.data._id}</Typography> */}                    
                    <IconButton aria-label='edit' color='primary' size='small'  component={Link} to={'/dokter/edit/' + dokter.data._id}><EditIcon /></IconButton>
                    <IconButton aria-label='delete' color='error' size='small'  onClick={() => deleteRecord(dokter.data._id)}><DeleteIcon /></IconButton>                    
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid item xs={12} container spacing={4}>
                <Grid item container xs={12}>
                  <Grid item xs={3}>
                    <Typography variant='caption'>Nama</Typography>
                    <Typography variant='body1' fontWeight='bold'>{dokter.data.namaDepan} {dokter.data.namaBelakang}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='caption'>Jenis Kelamin</Typography>
                    <Typography variant='body1' fontWeight='bold'>{dokter.data.jenisKelamin}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='caption'>Umur</Typography>
                    <Typography variant='body1' fontWeight='bold'>{dokter.data.umur}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='caption'>No Telepon</Typography>
                    <Typography variant='body1' fontWeight='bold'>{dokter.data.notelp}</Typography>
                  </Grid> 
              </Grid>
              <Grid item container>              
                <Grid item xs={12}>
                  <Typography variant='caption'>Alamat</Typography>
                  <Typography variant='body1' fontWeight='bold'>{dokter.data.alamat}</Typography>
                </Grid>
              </Grid>
              </Grid>                          
          </>
          }
        </Grid>                
      
      {/* <Grid item>
        <Box sx={{ display : 'flex', alignItems: 'center', justifyContent:'space-between'}}>
          <Typography variant='h6'>Rekam Medik</Typography>
          <Button variant='contained' component={Link} to={'/rekam/insert/' + dokterid + '/0'}>Tambah Rekam Medik</Button>
        </Box>
        <Box sx={{ mt: 2}}>
          <RekamMedikTable dokter_id={dokterid}/>
        </Box>
      </Grid> */}
    </Grid>
  )
}
