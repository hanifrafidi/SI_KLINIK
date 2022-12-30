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
import PasienService from '../../service/PasienService'
import PasienTable from '../component/pasienTable'

export default function Pasien() {  
  const [pasienData,setPasienData] = React.useState()
        
  const deleteRecord = async (pasien_id) => {
    return await PasienService.delete(pasien_id).then((response) => console.log(response))
  }

  const mutation = useMutation(deleteRecord)  

  const onSubmit = data => {    
    mutation.mutate(data)    
    
  }    

  return (    
    <Grid container>                     
        <Grid item container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='h6'>Data Pasien</Typography>
          </Grid>
          <Grid item>
            <Button variant='contained' component={Link} to={'/pasien/insert/0'}>Tambah Pasien Baru</Button>
          </Grid>          
        </Grid>              
      <Grid item sx={{ mt: 4}} xs={12}>
        <PasienTable />    
      </Grid>                  
    </Grid>
  )
}
