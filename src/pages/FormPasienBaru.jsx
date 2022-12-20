import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from "axios";
import {useMutation, useQuery} from 'react-query'
import {useForm} from 'react-hook-form'

export default function AddressForm() {
  const { register, handleSubmit, setValue} = useForm({    
    defaultValues: {
      namaDepan : '',
      namaBelakang : '',
      alamat : '',
      jenisKelamin : '',
      umur: '',
      pekerjaan: '',
      notelp: '',
      alergi: '',
      penyakit: '',
      tanggal: new Date().toString(),
  }
  });

  const insertData = async (data) => {
    const {response} = await axios.post('http://localhost:5000/pasien/insert', data)    
    console.log(response)
  }    

  const mutation = useMutation(insertData)  

  const onSubmit = data => {    
    mutation.mutate(data)    
    console.log(data)
  }  

  return (
    <Container maxWidth='sm'>
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
        <Typography component="h1" variant="h4" align="center" sx={{ my: 2 }}>
          Pasien Baru
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom sx={{ my: 6}}>
          
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField          
              label='Nama Depan'  
              fullWidth            
              variant="standard"
              {...register('namaDepan')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Nama Belakang'              
              fullWidth            
              variant="standard"
              {...register('namaBelakang')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Alamat'
              fullWidth            
              variant="standard"
              {...register('alamat')}
            />
          </Grid>        
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ minWidth: '100%' }}>
              <InputLabel id="jenisKelamin">Jenis Kelamin</InputLabel>
              <Select      
                label='Jenis Kelamin'        
                {...register('jenisKelamin')}              
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={'laki'}>Laki</MenuItem>
                <MenuItem value={'perempuan'}>Perempuan</MenuItem>              
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Umur'
              fullWidth            
              variant="standard"
              {...register('umur')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ minWidth: '100%' }}>
              <InputLabel id="pekerjaan">Pekerjaan</InputLabel>
              <Select              
                {...register('pekerjaan')}
              >
                <MenuItem value="tidak bekerja">
                  tidak bekerja
                </MenuItem>
                <MenuItem value={'karyawan'}>karyawan</MenuItem>
                <MenuItem value={'swasta'}>swasta</MenuItem>              
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField 
              label='No Telepon'           
              fullWidth            
              variant="standard"
              {...register('notelp')}
            />
          </Grid>          
          <Grid item xs={6}>
            <TextField 
              label='Alergi'           
              fullWidth            
              variant="standard"
              {...register('alergi')}
            />
          </Grid>          
          <Grid item xs={6}>
            <TextField            
              label='Penyakit'
              fullWidth            
              variant="standard"
              {...register('penyakit')}
            />
          </Grid> 
          <Grid item xs={12} sx={{ mt: 5}}>
            <Button type='submit' variant='contained' fullWidth>Simpan</Button>
          </Grid>
        </Grid>
        </form>
      </Paper>
    </Container>
  );
}
