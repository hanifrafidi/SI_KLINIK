import React from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
  Grid  
} from '@mui/material'

import {useParams, Link} from 'react-router-dom'
import {useQuery, useMutation} from 'react-query'
import DokterService from '../../service/DokterService'
import DokterTable from '../component/dokterTable'

export default function Dokter() {  
  const [dokterData,setDokterData] = React.useState()
        
  const deleteRecord = async (dokter_id) => {
    return await DokterService.delete(dokter_id).then((response) => console.log(response))
  }

  const mutation = useMutation(deleteRecord)  

  const onSubmit = data => {    
    mutation.mutate(data)    
    
  }    

  return (    
    <Grid container spacing={3}>
        <Grid item container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='h6'>Data Dokter</Typography>
          </Grid>
          <Grid item>
            <Button variant='contained' component={Link} to={'/dokter/insert/0'}>Tambah Dokter Baru</Button>
          </Grid>          
        </Grid>              
      <Grid item xs={12} sx={{ minHeight: '80%'}}>
        <DokterTable />    
      </Grid>            
    </Grid>
  )
}
