import { Box, colors, FormControl, InputLabel, makeStyles, MenuItem, Select, Typography } from '@mui/material'
import { Stack} from '@mui/system'
import React, { useState } from 'react'
import { useGlobalContext } from '../context';



const Spinner = ({handleChange}) => {

  return (<Box sx={{ minWidth: 120, }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{color: '#ffffff'}}>Login</InputLabel>
        <Select
          size='small'
          inputProps={{
            MenuProps: {
                MenuListProps: {
                    sx: {
                        backgroundColor: '#075e55',
                        color: 'white'
                    }
                }
            }
          }}
          labelStyle={{ color: '#ff0000' }}
          sx={{
            m:'10px',
            color: "white",
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '.MuiSvgIcon-root ': {
              fill: "white !important",
            }
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={""}
          label="Login"
          onChange={handleChange}
        >
          <MenuItem sx={{fill: 'green'}} value={""}>Choose</MenuItem>
          <MenuItem sx={{fill: 'white'}} value={"google"}>Google</MenuItem>
          <MenuItem sx={{fill: 'white'}} value={'facebook'}>Facebook</MenuItem>
          <MenuItem sx={{fill: 'white'}} value={'github'}>Github</MenuItem>
        </Select>
      </FormControl>
    </Box>);
}

const Login = () => {


  const {FacebookPopup, GithubPopup, GooglePopup} = useGlobalContext()

  const handleChange = (event) =>{
    console.log(event.target.value);
    
    if(event.target.value == "google"){
      GooglePopup();
    }else if(event.target.value == "facebook"){
      FacebookPopup();
    }else if(event.target.value == "github"){
      GithubPopup();
    }
  }

  return (
    <Stack direction={'column'} alignItems='center' sx={{backgroundColor: '#075e55', height: '100vh', width: '100%'}}>
      <Stack direction={'row'} alignItems='center' justifyContent='space-between' sx={{width: '100vw', }}>
        <Spinner handleChange={handleChange}></Spinner>
        <Typography m='10px' variant='h6' color='white'>2021 - Web App</Typography>
      </Stack>
      <img width={"50px"} height='50px' src='https://i.pinimg.com/originals/f5/28/cc/f528cc010d8a9bfcef07d08106976d0f.png'/>
      <Typography variant='p' sx={{m: '20px'}} color={'white'}>Whats App Clone</Typography>
      <img src='preview.png' height={'300px'}/>
    </Stack>
  )
}

export default Login
