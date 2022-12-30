import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DatePicker from '../pages/Datepicker'

import axios from "axios";
import {useMutation, useQuery} from 'react-query'
import {useForm, Controller} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import PasienService from '../../service/PasienService';
import RekamMedikService from '../../service/RekamMedikService';

export default function AddressForm() {
  const {type, rekam_id, pasien_id} = useParams();    
  const { register, handleSubmit, setValue, control} = useForm({    
    defaultValues: {
      pasien_id : pasien_id,
      dokter : '',
      diagnosa : '',
      tindakan : '',
      tanggal: new Date().toString(),
  }
  });
  const titles = [
    'diagnosa',
    'dokter',
    'tanggal',        
    'tindakan',    
  ]      
  var pasienid = 0

  if(typeof pasien_id !== 'undefined'){
    pasienid = pasien_id
  }
  
  const pasien = useQuery("pasien", () => PasienService.getOne(pasienid))    

  const insertData = async (input) => {
    const {response} = await RekamMedikService.create(input)    
    console.log(response)
  }    
  const updateData = async (input) => {
    const {response} = await RekamMedikService.update(rekam_id,input)
    console.log(response)
  }    

  const createRekam = useMutation(insertData)
  const updateRekam = useMutation(updateData)

  const onSubmit = data => {    
    type === 'insert' ? 
    createRekam.mutate(data) 
    :
    updateRekam.mutate(data)

  }  

  React.useEffect(() => {
    if(type === 'edit') {      
      RekamMedikService.getOne(rekam_id).then((data) => {
        titles.forEach( title => setValue(title, data[title]))
        // console.log(data)
      })      
    }
    // console.log(rekam)
  },[])

  return (
    <Grid container>              
      <Grid item>      
        <Typography component="h1" variant="h4" align="center" sx={{ my: 2 }}>
          Rekam Medik
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>          
        <Grid container spacing={4}>
          <Grid item xs={12}>                        
            { 
              pasien.isLoading 
              ? 
              'Loading...' :
              pasien.isLoading ? <>Loading</> :
              pasien.data === null || pasien.data === undefined ? <>Pasien tidak ditemukan</>
              :
              <Grid item>
                <Typography variant='h6' sx={{ mb: 1}}>Pasien</Typography>
                <Typography variant='body1' sx={{ mb: 1}}>{pasien.data.namaDepan}</Typography>
                <input type="text" value={pasien.data._id} {...register('pasien_id')} hidden />
              </Grid>
              
            }
          </Grid>
          <Grid item xs={6}>
            <FormControl size='small' sx={{ minWidth: '100%' }}>
              <Typography variant='body1' sx={{ mb: 1}}>Dokter</Typography>
              <Controller                
                name="dokter"
                control={control}
                defaultValue=''
                render={({ field: { onChange, value } }) => (                
                  
                    <Select          
                      name='dokter' 
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
            <Typography variant='body1' sx={{ mb: 1}}>Tanggal</Typography>
            <Controller                
                name="tanggal"
                control={control}                
                render={({ field: { onChange, value } }) => (                                                      
                    <DatePicker type={type} name='tanggal' onChange={onChange} value={value} />                     
                )}
              />       
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Diagnosa</Typography>
            <TextField
              placeholder='Diagnosa'
              multiline
              rows={4}            
              {...register('diagnosa')}              
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Tindakan</Typography>
            <TextField
              placeholder='Tindakan'
              multiline
              rows={4}            
              {...register('tindakan')}              
              fullWidth
            />
          </Grid>                
          <Grid item container justifyContent='flex-end'>
            <Button
              variant='contained'              
              type="submit"
              >
            Simpan Data
            </Button>       
          </Grid>
        </Grid>
        
        </form>       
      </Grid>
    </Grid>
  );
}
