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
import FormPasienBaru from './pages/FormPasienBaru';
import FormPasienEdit from './pages/FormPasienEdit';
import CariPasien from './pages/CariPasien';
import Pasien from './pages/Pasien'

export default function App() {
  

  return (
    <Box sx={{ pb: 5, backgroundColor:'rgb(227, 242, 253)'}}>
      <AppBar
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
            <Button variant='text' color='inherit' component={Links} to="/rekam">Rekam Medik</Button>
            {/* <Button variant='text' color='inherit' component={Links} to="/pasien">Pasien</Button> */}
            <Button variant='text' color='inherit' component={Links} to="/pasien/insert">Pasien Baru</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mb: 4}}>
            <React.Fragment>    
              <Routes>
                <Route path='/' element={<CariPasien />} />
                <Route path='pasien/insert' element={<FormPasienBaru />} />
                <Route path='pasien/edit/:pasien_id' element={<FormPasienEdit />} />
                <Route path="rekam" element={<FormRekamMedik />} />
                <Route path="/pasien/rekam/insert/:pasien_id" element={<FormRekamMedik />} />
                <Route path="pasien" element={<Pasien />} />
                <Route path="pasien/:pasien_id" element={<Pasien />} />                
              </Routes>           
            </React.Fragment>                  
      </Container>
      </Box>
  );
}
