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
import DokterService from '../../service/DokterService';
import Alert from '../component/Alert'
import * as Yup from 'yup'

export default function AddressForm() {  

  const {dokter_id,type} = useParams()
  const titles = [
    'namaDepan',
    'namaBelakang',
    'alamat',        
    'umur',    
    'jenisKelamin',
    'notelp',    
  ]        

  const validationSchema = Yup.object().shape({
    namaDepan: Yup.string()
        .required('Nama Depan is required'),
    namaBelakang: Yup.string()
        .required('Nama Belakang is required'),
    umur: Yup.number()
        .required('Umur is required'),
    notelp: Yup.number()        
        .required('Nomor telepon is required'),        
  })
  
  const yupResolver = validationSchema =>
  React.useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );

  const navigate = useNavigate()

  const { register, handleSubmit, setValue, control, formState: { errors }} = useForm({       
    resolver: yupResolver(validationSchema) 
  });
  
  const [alert,setAlert] = React.useState({
    type : '',    
    message : ''
  })

  const createData = useMutation((data) => {    
    DokterService.create(data)
    .then( response => {
      console.log(response) 
      setAlert({
        type : 'create',        
        message : 'data berhasil diinputkan'
      })
      setTimeout(() => {navigate(-1)}, 2000)      
    })    
    .catch(err => { console.log(err) })
  })  
  
  const updateData = useMutation((data) => {    
    DokterService.update(dokter_id,data).then( response => {
      // console.log(response) 
      setAlert({
        type : 'create',        
        message : 'data berhasil diinputkan'
      })
      setTimeout(() => {navigate(-1)}, 2000)      
    })    
    .catch(err => { 
      setAlert(true)      
    })
  })          

  const onSubmit = data => {    
    type === 'edit' ? updateData.mutate(data) : createData.mutate(data)    
    // console.log(data)
  }  

  React.useEffect(() => {
    if(type === 'edit') {      
      DokterService.getOne(dokter_id).then((data) => {
        if(data !== null){
          titles.forEach( title => setValue(title, data[title]))
          console.log(data)
        }
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
              error = { errors.namaDepan ? true : false}                      
              fullWidth            
              size='small'
              placeholder='Nama Depan'               
              {...register('namaDepan')}
            />
            <Typography variant='subtitle1' color='error'>{errors.namaDepan ? errors.namaDepan.message : ''}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Nama Belakang</Typography>
            <TextField
              error = { errors.namaBelakang ? true : false}                      
              placeholder='Nama Belakang'              
              fullWidth            
              size='small'              
              {...register('namaBelakang')}
            />
            <Typography variant='subtitle1' color='error'>{errors.namaBelakang ? errors.namaBelakang.message : ''}</Typography>
          </Grid>          
          <Grid item xs={3} >
            <Typography variant='body1' sx={{ mb: 1}}>Umur</Typography>
            <TextField
              error = { errors.umur ? true : false}                      
              placeholder='Umur'
              fullWidth            
              size='small'              
              {...register('umur')}
            />
            <Typography variant='subtitle1' color='error'>{errors.umur ? errors.umur.message : ''}</Typography>
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
              error = { errors.notelp ? true : false}                      
              placeholder='No Telepon'           
              fullWidth            
              size='small'
              {...register('notelp')}
            />
            <Typography variant='subtitle1' color='error'>{errors.notelp ? errors.notelp.message : ''}</Typography>
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
      <Alert         
        type = {alert.type}
        message={alert.message}  />
    </Grid>
  );
}
