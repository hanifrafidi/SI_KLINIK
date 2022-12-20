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

export default function AddressForm() {

  const { register, handleSubmit, setValue} = useForm({    
    defaultValues: {
      pasien : '',
      dokter : 'laki',
      diagnosa : '',
      tindakan : '',
      tanggal: new Date().toString(),
  }
  });

  const insertData = async (data) => {
    const {response} = await axios.post('http://localhost:5000/insert', data)    
    console.log(response)
  }    

  const mutation = useMutation(insertData)  

  const onSubmit = data => {    
    mutation.mutate(data)    
  }  

  return (
    <Container maxWidth="sm">
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>      
        <Typography component="h1" variant="h4" align="center" sx={{ my: 2 }}>
          Rekam Medik
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField id="standard-basic" label="Pasien" name='pasien' variant="standard" {...register('pasien')} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ minWidth: '100%' }}>
              <InputLabel id="Dokter">Dokter</InputLabel>
              <Select {...register('dokter')}>              
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
