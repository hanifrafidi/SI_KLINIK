import React from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
  Grid  
} from '@mui/material'

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
    <Container maxWidth='lg' sx={{ mt: 3}}>         
      <Paper 
        sx={{
          padding: 3,          
        }}
      >        
        <Grid container>
          {
            pasien.isLoading ? <>Loading</> :            
            pasien.isError ? <>Error Silahkan Cek Koneksi Anda</> 
            : pasien.data === null || pasien.data === undefined ? <>Pasien tidak ditemukan</>
            :
            <>
            <Grid item xs={7}>
            <Typography variant='h4'>{pasien.data.namaDepan}</Typography>        
            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
              <Typography variant='body2' sx={{ mr: 2}}>{pasien.data.alamat}</Typography>              
              <Typography variant='body2'>{pasien.data._id}</Typography>
            </Box>
          </Grid>
          <Grid item xs={5} container>
            <Grid item xs={3}>
              <Typography variant='body2'>Umur</Typography>              
              <Typography variant='body2'>Jenis Kelamin</Typography>
              <Typography variant='body2'>Pekerjaan</Typography>              
            </Grid>            
            <Grid item xs={6}>
              <Typography variant='body2'>{pasien.data.umur}</Typography>
              <Typography variant='body2'>{pasien.data.jenisKelamin}</Typography>
              <Typography variant='body2'>{pasien.data.pekerjaan}</Typography>              
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant='contained' color='primary' size='small' component={Link} to={'/pasien/edit/' + pasien.data._id}>Edit</Button>
            <Button variant='contained' color='error' size='small' onClick={() => deleteRecord(pasien.data._id)}>Hapus</Button>
          </Grid>
            </>
          }
          
        </Grid>          
      </Paper>
      <Paper sx={{ mt: 2, p: 3}}>
        <Box sx={{ display : 'flex', alignItems: 'center', justifyContent:'space-between'}}>
          <Typography variant='h6'>Rekam Medik</Typography>
          <Button variant='contained' component={Link} to={'/rekam/insert/' + pasienid + '/0'}>Tambah Rekam Medik</Button>
        </Box>
        <Box sx={{ mt: 2}}>
          <RekamMedikTable pasien_id={pasienid}/>
        </Box>
      </Paper>
    </Container>
  )
}
