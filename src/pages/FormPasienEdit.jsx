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
import {useForm, Controller} from 'react-hook-form'
import {useParams} from 'react-router-dom'

export default function AddressForm() {
  

  const {pasien_id} = useParams()
  const pasien = useQuery(
    "pasien",
    async () => {
      const { data } = await axios("http://localhost:5000/pasien/" + pasien_id);            
      const titles = [
        'namaDepan',
        'namaBelakang',
        'alamat',        
        'umur',
        'pekerjaan',
        'jenisKelamin',
        'notelp',
        'alergi',
        'penyakit'
      ]      
      titles.forEach( title => setValue(title,data[title]))      
      return data
    }    
  );  

  React.useEffect(()=>{
    
  }, [])

  const { register, handleSubmit, setValue, control} = useForm({        
  });

  const editData = async (data) => {
    const {response} = await axios.post('http://localhost:5000/pasien/edit/' + pasien_id, data)    
    console.log(response)
  }    

  const mutation = useMutation(editData)  

  const onSubmit = data => {    
    mutation.mutate(data)    
    // console.log(data)
  }  

  return (
    <Container maxWidth='sm'>
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
        <Typography component="h1" variant="h4" align="center" sx={{ my: 2 }}>
          Pasien Baru
        </Typography>
        { 
          pasien.isLoading ? 
          <>Loading...</>
          :
          pasien.isError ? 
          <>Error</>
          : 
          pasien.data === null || pasien.data === undefined ?
          'kosong'
          :
          <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom sx={{ my: 6}}>
          
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField                          
              fullWidth            
              variant="standard"
              label='Nama Depan'                            
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
              <Controller                
                name="jenisKelamin"
                control={control}
                defaultValue=''
                render={({ field: { onChange, value } }) => (                
                  
                    <Select          
                      name='jenisKelamin' 
                      defaultValue=''   
                      onChange={onChange}
                      value={value}                      
                    >
                      <MenuItem value=''></MenuItem>
                      <MenuItem value='laki'>Laki</MenuItem>
                      <MenuItem value='perempuan'>Perempuan</MenuItem>              
                    </Select>
                  
                )}
              />
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
              <InputLabel id="jenisKelamin">Jenis Kelamin</InputLabel>
              <Controller                
                name="pekerjaan"
                control={control}
                defaultValue='tidak bekerja'
                render={({ field: { onChange, value } }) => (                
                  
                    <Select          
                      name='pekerjaan' 
                      defaultValue='tidak bekerja'   
                      onChange={onChange}
                      value={value}                      
                    >
                      <MenuItem value='tidak bekerja'>Tidak Bekerja</MenuItem>
                      <MenuItem value='karyawan'>Karyawan</MenuItem>
                      <MenuItem value='swasta'>swasta</MenuItem>              
                    </Select>
                  
                )}
              />
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
        }
        
      </Paper>
    </Container>
  );
}
