import React from 'react'
import PasienService from '../../service/PasienService'
import {useQuery} from 'react-query'
import {Link, useNavigate} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {Box, Typography, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function table() {
  const navigate = useNavigate()  
  const [pasienData, setPasien] = React.useState([])

  const pasien = useQuery("pasien", () => 
  PasienService.getAll().then(
    data => { 
      if(typeof data !== 'undefined' || data !== null) {
        setPasien(data);
      }
  })
  .catch(err => {
    console.log(err.message);
  })
  );

  // React.useEffect(() => {
  //   PasienService.getAll().then((response) => {
  //       if(response !== null && typeof response !== 'undefined'){
  //           setPasien(response)
  //       }
  //   })
  // },[])

  const rows = pasienData;
  
  const columns = [
    { field: 'nama', headerName: 'Nama', width: 150,
        renderCell: (( row => (
            <div onClick={() => navigate('pasien/' + row.id)} style={{cursor : 'pointer'}}>
                {row.row.namaDepan } {row.row.namaBelakang}
            </div>
        )))
     },
    { field: 'notelp', headerName: 'No Telepon', width: 150 },
    { field: 'alamat', headerName: 'Alamat', width: 150 },
    { 
        field: 'option', 
        headerName: 'Option', 
        width: 75,
        renderCell: ( (row) => (
            <>                
                <IconButton aria-label='edit' color='primary' size='small'  component={Link} to={'/pasien/edit/' + row.id}><EditIcon /></IconButton>
                <IconButton aria-label='delete' color='error' size='small'  ><DeleteIcon /></IconButton>
            </>
        ))
    },
  ];

  return (
    <Box sx={{ height: 439, width: '100%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5} 
          getRowId={(row)=>row._id}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{Toolbar : GridToolbar}}
          componentsProps={{
            toolbar: {
                showQuickFilter: true,
                quickFilterProps: {debounceMs: 500},
                sx: { p: 2}
            }
          }}
        />
    </Box>
  )
}
