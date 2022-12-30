import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

import {Routes,Route, Link as Links} from 'react-router-dom'

import FormRekamMedik from './pages/FormRekamMedik';
import FormPasien from './pages/FormPasien';
import CariPasien from './pages/CariPasien';
import PasienDetail from './pages/PasienDetail'
import PasienList from './pages/PasienList'
import RekamMedikList from './pages/RekamMedikList'
import Layout from './pages/Layout'

export default function App() {
  

  return (
    // <Box sx={{ pb: 5, backgroundColor:'rgb(227, 242, 253)'}}>
    <Box>
      {/* <AppBar
        position="absolute"        
        elevation={0}
        sx={{
          position: 'relative',          
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
          <Box sx={{ ml: 'auto', display: 'block'}}>
            <Button variant='text' color='inherit' component={Links} to="/" >Home</Button>
            <Button variant='text' color='inherit' component={Links} to="/rekam_medik/list">Rekam Medik</Button>            
            <Button variant='text' color='inherit' component={Links} to={"/pasien/list"}>Pasien</Button>
          </Box>
        </Toolbar>
      </AppBar> */}
      {/* <Container sx={{ mb: 4}}> */}
            <React.Fragment>    
              <Routes>
                <Route path='/' element={<Layout />} />                                
                <Route path="/pasien/list" element={<PasienList />} />   
                <Route path="/rekam_medik/list" element={<RekamMedikList />} />
                <Route path="/pasien/:pasien_id" element={<PasienDetail />} />   
                <Route path="/rekam_medik" element={<FormRekamMedik />} />                
                <Route path='/pasien/:type/:pasien_id' element={<FormPasien />} />                      
                <Route path="/rekam/:type/:pasien_id/:rekam_id" element={<FormRekamMedik />} />                                       
              </Routes>           
            </React.Fragment>                  
      {/* </Container> */}
      </Box>
  );
}
