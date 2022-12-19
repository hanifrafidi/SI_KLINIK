import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'

export default function BasicDatePicker({setTanggal}) {
  const [value, setValue] = React.useState(Date());  

  const setDate = (values) => {
    setTanggal(new Date(values).toString());
    setValue(values);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Tanggal Konsultasi"
        value={value}
        onChange={(newValue) => {          
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} variant='standard' />}
      />            
    </LocalizationProvider>    
  );
}