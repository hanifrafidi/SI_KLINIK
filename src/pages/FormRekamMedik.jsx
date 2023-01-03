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

import {useMutation, useQuery} from 'react-query'
import {useForm, Controller} from 'react-hook-form'
import {useParams, useNavigate} from 'react-router-dom'
import PasienService from '../../service/PasienService';
import RekamMedikService from '../../service/RekamMedikService';
import Alert from '../component/Alert'
import * as Yup from 'yup'

export default function AddressForm() {
  const navigate = useNavigate();
  const {type, rekam_id, pasien_id} = useParams();    
  const [alertStatus, setAlert] = React.useState('')
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

  const validationSchema = Yup.object().shape({
    diagnosa: Yup.string()
        .required('Diagnosa is required'),
    tindakan: Yup.string()
        .required('Tindakan is required'),
    dokter: Yup.string()
        .required('Dokter is required'),
  })

  const { register, handleSubmit, setValue, control, formState: { errors }} = useForm({       
    resolver: yupResolver(validationSchema) 
  });

  const createData = useMutation((data) => {    
    RekamMedikService.create(data)
    .then( response => {
      console.log(response) 
      setAlert({ type : 'create', message : response.response })
      setTimeout(() => {navigate(-1)}, 2000)      
    })    
    .catch(err => { console.log(err) })
  })

  const updateData = useMutation((data) => {    
    RekamMedikService.update(rekam_id,data).then( response => {
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
      RekamMedikService.getOne(rekam_id).then((data) => {
        titles.forEach( title => setValue(title, data[title]))
        // console.log(data)
      })      
    }
    // console.log(type)
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
                      error = {errors.dokter ? true : false}
                      name='dokter' 
                      defaultValue={0}   
                      onChange={onChange}
                      value={value}                      
                    >
                      <MenuItem value={0}></MenuItem>
                      <MenuItem value='laki'>Laki</MenuItem>
                      <MenuItem value='perempuan'>Perempuan</MenuItem>              
                    </Select>
                  
                )}
              />              
            </FormControl>
            <Typography variant='subtitle1' color='error'>{errors.dokter ? errors.dokter.message : ''}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Tanggal</Typography>
            <Controller                
                name="tanggal"
                defaultValue={new Date()}
                control={control}                
                render={({ field: { onChange, value } }) => (                                                      
                    <DatePicker type={type} name='tanggal' onChange={onChange} value={value} />                     
                )}
              />       
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Diagnosa</Typography>
            <TextField
              error = { errors.diagnosa ? true : false}     
              placeholder='Diagnosa'
              multiline
              rows={4}            
              {...register('diagnosa')}              
              fullWidth
            />
            <Typography variant='subtitle1' color='error'>{errors.diagnosa ? errors.diagnosa.message : ''}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1' sx={{ mb: 1}}>Tindakan</Typography>
            <TextField
              error = { errors.tindakan ? true : false}     
              placeholder='Tindakan'
              multiline
              rows={4}            
              {...register('tindakan')}              
              fullWidth
            />
            <Typography variant='subtitle1' color='error'>{errors.tindakan ? errors.tindakan.message : ''}</Typography>
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
      { alertStatus ? <Alert key={Math.random()} type={alertStatus.type} message={alertStatus.message} /> : null}      
    </Grid>
  );
}
