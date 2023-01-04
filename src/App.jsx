import React from 'react'
import {Container,Grid,Box,Typography,TextField,Button,Paper,Avatar} from '@mui/material'
import Data from './component/data'
import DatePicker from './component/datepicker'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FaceIcon from '@mui/icons-material/Face';

import {Routes,Route, Link as Links} from 'react-router-dom'

import FormRekamMedik from './pages/FormRekamMedik';
import FormPasien from './pages/FormPasien';
import FormDokter from './pages/FormDokter';
import CariPasien from './pages/CariPasien';
import PasienDetail from './pages/PasienDetail'
import PasienList from './pages/PasienList'
import RekamMedikList from './pages/RekamMedikList'
import DokterList from './pages/DokterList'
import DokterDetail from './pages/DokterDetail'

import image from '../src/image.png'

export default function Layout() {
  return (
    <Container disableGutters sx={{ 
        m: 0, 
        p: 2.5, 
        backgroundColor: '#255F85', 
        minWidth:'100%', 
        maxHeight: '100vh', 
        minHeight: '100vh',
        overflow: 'hidden', 
        position: 'sticky'}}>
      <Grid container>
        <Grid item container xs={2} justifyContent='space-between' flexDirection='column' sx={{ position: 'sticky'}}>
            <Grid item container spacing={8} >
                <Grid item>
                    <Typography variant='h4' color='white' >SI - KLINIK</Typography>
                </Grid>
                <Grid item container spacing={2} flexDirection='column'>
                    <Grid item>
                        <Button variant='text' size='large' sx={{ color: 'white' }} startIcon={<HomeIcon />} component={Links} to="/">Home</Button>
                    </Grid>
                    <Grid item>
                        <Button variant='text' size='large' sx={{ color: 'white' }} startIcon={<FaceIcon />} component={Links} to="/pasien/list">Pasien</Button>
                    </Grid>
                    <Grid item>
                        <Button variant='text' size='large' sx={{ color: 'white' }} startIcon={<PersonIcon />} component={Links} to="/dokter/list">Dokter</Button>
                    </Grid>
                    <Grid item>
                        <Button variant='text' size='large' sx={{ color: 'white' }} startIcon={<LibraryBooksIcon />} component={Links} to="/rekam_medik/list">Rekam Medik</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <img src={image} alt='image' width='200' height='200'  />
            </Grid>
        </Grid>
        <Grid item container xs={10} component={Paper} sx={{ p: 2, maxHeight: '95vh', minHeight: '95vh'}} spacing={1}>
            <Grid item container xs={8} sx={{ px: 2}} display='block'>
                {/* <Grid item container justifyContent='space-between' sx={{  mb: 3, pr: 2}}>
                    <Typography variant='h6'>Welcome</Typography>
                    <TextField size='small' placeholder='Search Patient Here' />
                </Grid> */}
                <Grid item container sx={{ minHeight: '100%', maxHeight: '79vh', overflow: 'scroll', pr: 2}}>
                    <React.Fragment>    
                        <Routes>                                                            
                            <Route path="/" element={<CariPasien />} />   
                            <Route path="/pasien/list" element={<PasienList />} />   
                            <Route path="/pasien/:pasien_id" element={<PasienDetail />} />   
                            <Route path='/pasien/:type/:pasien_id' element={<FormPasien />} />                            
                            <Route path="/rekam_medik/list" element={<RekamMedikList />} />
                            <Route path="/rekam_medik" element={<FormRekamMedik />} />
                            <Route path="/rekam/:type/:pasien_id/:rekam_id" element={<FormRekamMedik />} />                                       
                            <Route path="/dokter/list" element={<DokterList />} />
                            <Route path="/dokter/:dokter_id" element={<DokterDetail />} />                               
                            <Route path='/dokter/:type/:dokter_id' element={<FormDokter />} />
                            
                        </Routes>           
                    </React.Fragment> 
                </Grid>
            </Grid>
            <Grid item container xs={4} flexDirection='column'>
                {/* <Grid item container alignItems='center' spacing={2} >
                    <Grid item>
                        <Avatar>H</Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant='body2'>hmm@mgi.com</Typography>
                    </Grid>
                </Grid>                 */}
                <Grid item>
                    <DatePicker />
                </Grid>
            </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
