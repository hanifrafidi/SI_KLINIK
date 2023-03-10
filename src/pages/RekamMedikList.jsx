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
  return (    
    <Grid container>               
      <Grid item>
        <Box sx={{ display : 'flex', alignItems: 'center', justifyContent:'space-between'}}>
          <Typography variant='h6'>Rekam Medik</Typography>          
        </Box>        
      </Grid>            
      <Grid item sx={{ minWidth: '100%', minHeight: '78%'}}>
        <RekamMedikTable id_pasien={0} />    
      </Grid>            
    </Grid>
  )
}
