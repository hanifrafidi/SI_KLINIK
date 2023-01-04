import * as React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
  Grid,
  Avatar,
  IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {useQuery, useQueryClient, useMutation} from 'react-query'
import {Link, useNavigate} from 'react-router-dom'
import PasienService from '../../service/PasienService'
import Dialog from '../component/Dialog'

export default function PasienTable() {          
  const navigate = useNavigate();    
  const queryClient = useQueryClient()
  const [hapus, setHapus] = React.useState('')
  const [deleteStatus, setDeleteStatus] = React.useState('')  
  const [pasienData, setPasien] = React.useState([])    

  const confirmHapus = (id) => {
    setHapus(id);
    setDeleteStatus('ask')    
  }
  
  const deletePasien = useMutation({
    mutationFn : () => PasienService.delete(hapus),
    onSuccess: data => {
      queryClient.invalidateQueries(['pasien'])
      setHapus('')      
      setTimeout(() => setDeleteStatus(''), 2000) 
      // setAlert({ type : 'create', message : 'data berhasil dihapus' })
      console.log(data)        
    },
    onError: data => {
      setHapus('')      
      setDeleteStatus('')
      // setAlert({ type : 'error', message : data.data })        
    },
    refetchOnWindowFocus: false,
  })

  const deleteRecord = () => {    
    // await PasienService.delete(hapus).then((response) => console.log(response))    
    deletePasien.mutate(hapus)     
  }    

  const pasien = useQuery("pasien", () => 
  PasienService.getAll().then(
    data => { 
      if(typeof data !== 'undefined' || data !== null) {
        setPasien(data);
      }
  }));

  const rows = pasienData;
  
  const columns = [
    { field: 'nama', headerName: 'Nama', width: 150,
        renderCell: (( row => (
            <div onClick={() => navigate('/pasien/' + row.id)} style={{cursor : 'pointer'}}>
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
                <IconButton aria-label='delete' color='error' size='small' onClick={() => confirmHapus(row.id)} ><DeleteIcon /></IconButton>
            </>
        ))
    },
  ];
  
  return (        
    <>
    <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6} 
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
    <Dialog       
      deleteStatus={deleteStatus} 
      setDeleteStatus={(deleteStatus) => setDeleteStatus(deleteStatus)}
      confirmDelete={() => deleteRecord()}
    />        
    </>
    );    
}    