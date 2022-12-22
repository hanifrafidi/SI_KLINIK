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
import {useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'

export default function AddressForm() {
  const {pasien_id} = useParams();    
  const { register, handleSubmit, setValue} = useForm({    
    defaultValues: {
      pasien_id : pasien_id,
      dokter : '',
      diagnosa : '',
      tindakan : '',
      tanggal: new Date().toString(),
  }
  });
  var pasienid = 0

  if(pasien_id !== undefined){
    pasienid = pasien_id
  }

  const pasienData = useQuery(
    "pasien",
    async () => {      
        const { data } = await axios("http://localhost:5000/pasien/" + pasienid);      
        return data;      
    }    
  );  

  // const dokterData = useQuery(
  //   "dokter",
  //   async () => {
  //     const { data } = await axios("http://localhost:5000/dokter/");      
  //     return data;
  //   }    
  // );

  const insertData = async (input) => {
    const cek = await axios.post('http://localhost:5000/rekam_medik/insert', input)    
    console.log(cek)
  }    

  const mutation = useMutation(insertData)  

  const onSubmit = data => {    
    // console.log(data)
    mutation.mutate(data) 

  }  

  return (
    <Container maxWidth="sm">      
    {console.log(pasienData)}
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
        <Typography component="h1" variant="h4" align="center" sx={{ my: 2 }}>
          Rekam Medik
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>                        
            { 
              pasienData.isLoading 
              ? 
              'Loading...' :
              pasienData.isError
              ?
              pasienData.error.response.data.data :           
              <>
                <Typography variant='h6' sx={{ mt: 2 }}>Pasien : {pasienData.data.namaDepan}</Typography>
                <input type="text" value={pasienData.data._id} {...register('pasien_id')} hidden />
              </>
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ minWidth: '100%' }}>
              <InputLabel id="Dokter">Dokter</InputLabel>
              <Select defaultValue='' {...register('dokter')}>              
                <MenuItem value=''>Select...</MenuItem>
                <MenuItem value={'laki'}>Laki</MenuItem>
                <MenuItem value={'perempuan'}>Perempuan</MenuItem>              
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker setTanggal={(date) => setValue('tanggal', date)} />          
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="diagnosa"
              label="Diagnosa"
              multiline
              rows={4}            
              {...register('diagnosa')}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="tindakan"
              label="Tindakan"
              multiline
              rows={4}            
              {...register('tindakan')}
              variant="standard"
              fullWidth
            />
          </Grid>                
        </Grid>
        <Button
        variant='contained'
        sx={{ mr : 'auto', my: 2}}
        type="submit"
        >simpan</Button>       
        </form>       
      </Paper>
    </Container>
  );
}
