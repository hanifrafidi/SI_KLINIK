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
import RekamMedikService from '../../service/RekamMedikService'
import moment from 'moment'
import Dialog from '../component/Dialog'

export default function RekamMedikTable(props) {      

  const navigate = useNavigate();    
  const queryClient = useQueryClient()
  const [hapus,setHapus] = React.useState('')
  const [rekam_medik, setRekam] = React.useState([])
  const [deleteStatus, setDeleteStatus] = React.useState('')    

  const get_rekam_medik = useQuery("rekam_medik", () =>   
  {
    if(props.pasien_id === 0 || typeof props.pasien_id === "undefined"){
      RekamMedikService.getAll().then(data => {        
        setRekam(data)        
      })
    }else{
      RekamMedikService.getByPasien(props.pasien_id).then(
        (data) => {           
          setRekamMedikData(data);          
      })
    }
  })
  ;   

  const confirmHapus = (id) => {
    setHapus(id);
    setDeleteStatus('ask')    
  }

  const deleteRekamMedik = useMutation({
    mutationFn : () => RekamMedikService.delete(hapus),
    onSuccess: data => {
      queryClient.invalidateQueries(['rekam_medik'])
      setHapus('')
      setTimeout(() => setDeleteStatus(''), 2000) 
    },
    onError: data => {
      // console.log(data.data)
      setHapus('')
      setDeleteStatus('')
    },    
  })

  const deleteRecord = (id) => {        
    deleteRekamMedik.mutate(hapus)
  }      

  const rows = rekam_medik;
  
  const columns = [
    // { field: 'nama', headerName: 'Nama', width: 150,
    //     renderCell: (( row => (
    //         <div onClick={() => navigate('pasien/' + row.id)} style={{cursor : 'pointer'}}>
    //             {row.row.namaDepan } {row.row.namaBelakang}
    //         </div>
    //     )))
    //  },
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'dokter', headerName: 'Dokter', width: 150 },
    { field: 'diagnosa', headerName: 'Diagnosa', width: 150 },    
    { field: 'tindakan', headerName: 'tindakan', width: 150 },
    { 
        field: 'option', 
        headerName: 'Option', 
        width: 75,
        renderCell: ( (row) => (
            <>                
                <IconButton aria-label='edit' color='primary' size='small'  component={Link} to={'/rekam/edit/'+ row.row.pasien_id + '/' + row.id}><EditIcon /></IconButton>
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