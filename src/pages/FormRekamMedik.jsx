import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DatePicker from '../pages/Datepicker'

export default function AddressForm() {
  const [dokter, setDokter] = React.useState('');
  const [tanggal, setTanggal] = React.useState(new Date().toString());
  const [diagnosa, setDiagnosa] = React.useState('');
  const [tindakan, setTindakan] = React.useState('');

  const dokterChange = (event) => {
    setDokter(event.target.value);
  };    

  const tanggalChange = (event) => {    
    setTanggal(event)
  };
  
  const diagnosaChange = (event) => {
    setDiagnosa(event.target.value);
  };

  const tindakanChange = (event) => {
    setTindakan(event.target.value);
  };

  const [view, setView] = React.useState(false)  

  const changeP = (event) => {
    setView(!view)
  }

  return (
    <Box sx={{ mb: 3}}>
      <Typography variant="h6" gutterBottom sx={{ my: 6}}>
        
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField id="standard-basic" label="Pasien" variant="standard" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ minWidth: '100%' }}>
            <InputLabel id="Dokter">Dokter</InputLabel>
            <Select
              labelId="Dokter"
              id="Dokter"
              value={dokter}              
              onChange={dokterChange}
              label="Dokter"
            >              
              <MenuItem value={'laki'}>Laki</MenuItem>
              <MenuItem value={'perempuan'}>Perempuan</MenuItem>              
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker setTanggal = {tanggalChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="diagnosa"
            label="Diagnosa"
            multiline
            rows={4}
            value={diagnosa}
            onChange={diagnosaChange}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tindakan"
            label="Tindakan"
            multiline
            rows={4}
            value={tindakan}
            onChange={tindakanChange}
            variant="standard"
            fullWidth
          />
        </Grid>                
      </Grid>
      <Button
       variant='contained'
       sx={{ mr : 'auto', my: 2}}
       onClick={changeP}
       >simpan</Button>       

       <Box hidden={view}>
         {tindakan}<br/>
         {diagnosa}<br/>
         {dokter}<br/>
         {tanggal}
       </Box>
    </Box>
  );
}
