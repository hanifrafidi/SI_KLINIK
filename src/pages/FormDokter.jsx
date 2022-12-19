import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FormDokter() {
  const [kelamin, setKelamin] = React.useState('');

  const kelaminChange = (event) => {
    setKelamin(event.target.value);
  };

  const [pekerjaan, setPekerjaan] = React.useState('');

  const pekerjaanChange = (event) => {
    setPekerjaan(event.target.value);
  };

  return (
    <Box sx={{ mb: 3}}>
      <Typography variant="h6" gutterBottom sx={{ my: 6}}>
        
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="namaDepan"
            name="namaDepan"
            label="Nama Depan"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="namaBelakang"
            name="namaBelakang"
            label="Nama Belakang"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="alamat"
            name="alamat"
            label="Alamat"
            fullWidth
            autoComplete="alamat rumah"
            variant="standard"
          />
        </Grid>        
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ minWidth: '100%' }}>
            <InputLabel id="jenisKelamin">Jenis Kelamin</InputLabel>
            <Select
              labelId="jenisKelamin"
              id="jenisKelamin"
              value={kelamin}
              onChange={kelaminChange}
              label="jenisKelamin"
            >
              <MenuItem value="Jenis">
                <sm>None</sm>
              </MenuItem>
              <MenuItem value={'laki'}>Laki</MenuItem>
              <MenuItem value={'perempuan'}>Perempuan</MenuItem>              
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="umur"
            name="umur"
            label="Umur"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ minWidth: '100%' }}>
            <InputLabel id="pekerjaan">Pekerjaan</InputLabel>
            <Select
              labelId="pekerjaan"
              id="pekerjaan"
              value={pekerjaan}
              onChange={pekerjaanChange}
              label="pekerjaan"
            >
              <MenuItem value="tidak bekerja">
                <sm>None</sm>
              </MenuItem>
              <MenuItem value={'karyawan'}>karyawan</MenuItem>
              <MenuItem value={'swasta'}>swasta</MenuItem>              
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField            
            id="telepon"
            name="telepon"
            label="Nomor Telepon"
            fullWidth
            autoComplete="nomor telepon"
            variant="standard"
          />
        </Grid>          
        <Grid item xs={6}>
          <TextField            
            id="alergi"
            name="alergi"
            label="Penyakit Alergi "
            fullWidth
            autoComplete="tidak ada"
            variant="standard"
          />
        </Grid>          
        <Grid item xs={6}>
          <TextField            
            id="penyakit"
            name="penyakit"
            label="Penyakit Penting "
            fullWidth
            autoComplete="tidak ada"
            variant="standard"
          />
        </Grid>          
      </Grid>
    </Box>
  );
}
