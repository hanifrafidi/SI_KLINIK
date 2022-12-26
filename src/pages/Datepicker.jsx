import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(props.value);

  // React.useEffect(() => {    
  //   if(props.type === 'edit'){
  //     setValue(props.value)
  //   }
  // },[])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Tanggal Konsultasi"
        name={props.name}
        value={props.value}
        onChange={(newValue) => {          
          props.onChange(new Date(newValue).toString())
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} variant='standard' />}
      />            
    </LocalizationProvider>    
  );
}