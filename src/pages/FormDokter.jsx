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
import DokterService from '../../service/DokterService';

export default function AddressForm() {  

  const {dokter_id,type} = useParams()
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
    const {response} = await DokterService.create(data)    
    console.log(response)
  }    
  const updateData = async (datas) => {
    // return await DokterService.update(dokter_id, datas).then(response => console.log(response))    
    const {response} = await DokterService.update(dokter_id, datas)
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
      DokterService.getOne(dokter_id).then((data) => {
        titles.forEach( title => setValue(title, data[title]))
        console.log(data)
      })      
    }
    // console.log(rekam)
  },[])

  return (
    <Grid container>
      <Grid item>      
        <Typography variant="h5" sx={{ my: 2 }}>
          Form Dokter
        </Typography>
        {                     
          <form onSubmit={handleSubmit(onSubmit)}>        
        <Grid container spacing={3} sx={{ pt: 1}}>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Nama Depan</Typography>
            <TextField                          
              fullWidth            
              size='small'
              placeholder='Nama Depan'               
              {...register('namaDepan')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Nama Belakang</Typography>
            <TextField
              placeholder='Nama Belakang'              
              fullWidth            
              size='small'              
              {...register('namaBelakang')}
            />
          </Grid>          
          <Grid item xs={3} >
            <Typography variant='body1' sx={{ mb: 1}}>Umur</Typography>
            <TextField
              placeholder='Umur'
              fullWidth            
              size='small'              
              {...register('umur')}
            />
          </Grid>
          <Grid item xs={4.5}>            
            <Typography variant='body1' sx={{ mb: 1}}>Jenis Kelamin</Typography>
            <FormControl size='small' sx={{ minWidth: '100%' }}>              
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
          <Grid item xs={4.5}>
            <Typography variant='body1' sx={{ mb: 1}}>Nomor Telepon</Typography>
            <TextField 
              placeholder='No Telepon'           
              fullWidth            
              size='small'
              {...register('notelp')}
            />
          </Grid>          
          <Grid item xs={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Alamat</Typography>
            <TextField
              placeholder='Alamat'
              fullWidth            
              size='small'
              multiline
              rows={5}
              {...register('alamat')}
            />
          </Grid>                  
          <Grid item container justifyContent='flex-end'>
            <Button type='submit' variant='contained'>Simpan Data</Button>
          </Grid>
        </Grid>
        </form>
        }
        
      </Grid>
    </Grid>
  );
}
