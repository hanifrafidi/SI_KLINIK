import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

import FormRekamMedik from './pages/FormRekamMedik';
import FormPasienBaru from './pages/FormPasienBaru'

export default function App() {
  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        color="default"
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
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4, }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" sx={{ my: 2 }}>
            Rekam Medik
          </Typography>          
            <React.Fragment> 
              {/* <CariPasien />              */}
              {/* <AddressForm /> */}
              <FormRekamMedik />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>                
                {/* <Button
                  variant="contained"                  
                  // sx={{ mt: 3, ml: 1 }}
                >
                  Simpan
                </Button> */}
              </Box>
            </React.Fragment>          
        </Paper>
        {/* <Copyright /> */}
      </Container>
      </React.Fragment>
  );
}
