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
import PasienService from '../../service/PasienService';

export default function AddressForm() {  

  const {pasien_id,type} = useParams()
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

  const { register, handleSubmit, setValue, control} = useForm({        
  });

  
  const createData = async (data) => {
    const {response} = await PasienService.create(data)    
    console.log(response)
  }    
  const updateData = async (datas) => {
    // return await PasienService.update(pasien_id, datas).then(response => console.log(response))    
    const {response} = await PasienService.update(pasien_id, datas)
    return console.log(response)
  }
  
  const createMutation = useMutation(createData)  
  const updateMutation = useMutation(updateData)  

  const onSubmit = data => {    
    type === 'edit' ? updateMutation.mutate(data) : createMutation.mutate(data)    
    // console.log(data)
  }  

  React.useEffect(() => {
    if(type === 'edit') {      
      PasienService.getOne(pasien_id).then((data) => {
        titles.forEach( title => setValue(title, data[title]))
        console.log(data)
      })      
    }
    // console.log(rekam)
  },[])

  return (
    <Container maxWidth='sm'>
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
        <Typography component="h1" variant="h4" align="center" sx={{ my: 2 }}>
          Pasien Baru
        </Typography>
        {                     
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
              <InputLabel id="pekerjaan">Pekerjaan</InputLabel>
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
