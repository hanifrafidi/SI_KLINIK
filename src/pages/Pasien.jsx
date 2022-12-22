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
import {useQuery} from 'react-query'
import axios from 'axios'

export default function Pasien() {
  const {pasien_id} = useParams()    
    
  const pasien = useQuery(
    "pasien",
    async () => {
      const { data } = await axios("http://localhost:5000/pasien/" + pasien_id);
      return data;
    }    
  );

  const rekam = useQuery(
    "rekam",
    async () => {
      const { data } = await axios("http://localhost:5000/rekam/cari/" + pasien_id);
      console.log(data)
      return data;
    }    
  );

  return (
    pasien.isLoading ? <>Loading</>
    :
    <Container maxWidth='lg' sx={{ mt: 3}}>         
      <Paper 
        sx={{
          padding: 3,
          
        }}
      >        
        <Grid container>
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
            <Button variant='contained' color='error' size='small' component={Link} to={'/pasien/edit/' + pasien.data._id}>Hapus</Button>
          </Grid>
        </Grid>          
      </Paper>
      <Paper sx={{ mt: 2, p: 3}}>
        <Box sx={{ display : 'flex', alignItems: 'center', justifyContent:'space-between'}}>
          <Typography variant='h6'>Rekam Medik</Typography>
          <Button variant='contained' component={Link} to={'/pasien/rekam/insert/' + pasien_id}>Tambah Rekam Medik</Button>
        </Box>
      </Paper>
    </Container>
  )
}
