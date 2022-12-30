import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import axios from 'axios';
import PasienTable from '../component/pasienTable'
import {useForm} from 'react-hook-form'
import {useMutation, useQuery} from 'react-query'
import {useNavigate, Link} from 'react-router-dom'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,    
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));



export default function CariPasien() {
  const [value, setValue] = React.useState(null);  

  const { register, handleSubmit} = useForm();

  const [pasien, setPasien] = React.useState([])

  const insertData = async (data) => {
    const dataa = await axios.post('http://localhost:5000/pasien/cari', data)    
    console.log(dataa)
    setPasien(dataa)
  }    

  const mutation = useMutation(insertData)  

  const onSubmit = data => {    
    mutation.mutate(data)    
    // console.log(data)
  }  

  const navigate = useNavigate();    

    const openPasienPage = (id) => {

      navigate('/pasien/' + id);
    }

  return (
    <Box></Box>
  );
}
