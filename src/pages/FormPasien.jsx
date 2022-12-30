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
import {useParams, useNavigate} from 'react-router-dom'
import PasienService from '../../service/PasienService';
import Alert from '../component/Alert'

export default function AddressForm({ history }) {  
  const navigate = useNavigate();
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
  const [alertStatus, setAlert] = React.useState('')

  
  const createData = useMutation((data) => {    
    PasienService.create(data)
    .then( response => {
      console.log(response) 
      setAlert({ type : 'create', message : response.response })
      setTimeout(() => {navigate(-1)}, 2000)      
    })    
    .catch(err => { console.log(err) })
  })

  const updateData = useMutation((data) => {    
    PasienService.update(pasien_id,data).then( response => {
      // console.log(response) 
      setAlert({ type : 'update', message : response })
      setTimeout(() => {navigate(-1)}, 2000)      
    })    
    .catch(err => { 
      setAlert({ type : 'error', message : err.data })      
    })
  })          

  const onSubmit = data => {    
    type === 'edit' ? updateData.mutate(data) : createData.mutate(data)    
    // console.log(data)
  }  

  React.useEffect(() => {
    if(type === 'edit') {      
      PasienService.getOne(pasien_id).then((data) => {
        titles.forEach( title => setValue(title, data[title]))
        // console.log(data)
      })      
    }
    // console.log(rekam)
  },[])

  return (
    <Grid container>
      <Grid item>      
        <Typography variant="h5" sx={{ my: 2 }}>
          Form Pasien
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
          <Grid item xs={4.5} >            
            <Typography variant='body1' sx={{ mb: 1}}>Pekerjaan</Typography>
            <FormControl size='small' sx={{ minWidth: '100%' }}>
              
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
          <Grid item xs={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Alergi</Typography>
            <TextField 
              placeholder='Alergi'           
              fullWidth            
              size='small'              
              multiline
              rows={5}
              {...register('alergi')}
            />
          </Grid>          
          <Grid item xs={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Penyakit</Typography>
            <TextField            
              placeholder='Penyakit'
              fullWidth        
              size='small'                             
              multiline
              rows={5}
              {...register('penyakit')}
            />
          </Grid> 
          <Grid item container justifyContent='flex-end'>
            <Button type='submit' variant='contained'>Simpan Data</Button>
          </Grid>
        </Grid>
        </form>
        }        
      </Grid>
      { alertStatus ? <Alert key={Math.random()} type={alertStatus.type} message={alertStatus.message} /> : null}
    </Grid>
  );
}
