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

import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import axios from 'axios'

export default function Pasien() {
  const {pasien_id} = useParams()
  const { isLoading, isError, data, error, refetch } = useQuery(
    "pasien",
    async () => {
      const { data } = await axios("http://localhost:5000/pasien/id=" + pasien_id);
      return data;
    }
  );

  return (
    <Container maxWidth='lg' sx={{ mt: 3}}>      
      <Paper 
        sx={{
          padding: 3,
          
        }}
      >        
        <Grid container>
          <Grid item xs={7}>
            <Typography variant='h4'>Nama</Typography>        
            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
              <Typography variant='body2' sx={{ mr: 2}}>Alamat</Typography>
              <Typography variant='body2'>No Telp</Typography>
            </Box>
          </Grid>
          <Grid item xs={5} container>
            <Grid item xs={3}>
              <Typography variant='body2'>Umur</Typography>
              <Typography variant='body2'>Jenis Kelamin</Typography>
              <Typography variant='body2'>Pekerjaan</Typography>              
            </Grid>            
            <Grid item xs={6}>
              <Typography variant='body2'>Umur</Typography>
              <Typography variant='body2'>Jenis Kelamin</Typography>
              <Typography variant='body2'>Pekerjaan</Typography>              
            </Grid>
          </Grid>
        </Grid>          
      </Paper>
      <Paper sx={{ mt: 2, p: 3}}>
        <Typography variant='h6'>Rekam Medik</Typography>
      </Paper>
    </Container>
  )
}
