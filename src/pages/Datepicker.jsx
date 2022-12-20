import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(Date());    

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Tanggal Konsultasi"
        value={value}
        onChange={(newValue) => {          
          props.setTanggal(new Date(newValue).toString())
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} variant='standard' />}
      />            
    </LocalizationProvider>    
  );
}