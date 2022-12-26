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
import RekamMedikTable from '../component/RekamMedikTable'

export default function RekamMedikList() {        
  
  const deleteRecord = async (pasien_id) => {
    return await PasienService.delete(pasien_id).then((response) => console.log(response))
  }

  const mutation = useMutation(deleteRecord)  

  const onSubmit = data => {    
    mutation.mutate(data)    
    
  }    

  return (    
    <Container maxWidth='lg' sx={{ mt: 3}}>               
      <Paper sx={{ mt: 2, p: 3}}>
        <Box sx={{ display : 'flex', alignItems: 'center', justifyContent:'space-between'}}>
          <Typography variant='h6'>Rekam Medik</Typography>          
        </Box>        
      </Paper>            
      <Box sx={{ mt: 2}}>
        <RekamMedikTable id_pasien={0} />    
      </Box>            
    </Container>
  )
}
