import { InputBase, Paper, Stack, Typography, MenuItem, colors } from '@mui/material';
import React, {useState, useEffect} from 'react';

// import SearchIcon from '@material-ui/icons/Search';
// import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {WhatsApp, Menu, Search, Directions, Person} from '@mui/icons-material'
import { useGlobalContext } from '../context';
import BasicMenu from './my_menu';


export default function TopBar(){

  const  {user, chatList} = useGlobalContext()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const searchBar = ()=>{
    return <Paper
      component="form"
      elevation={0}
      sx={{
        borderRadius: '40px', 
        backgroundColor: 'rgba(0,0,0,.2)' ,
        p: '2px 4px', 
        display: 'flex', 
        alignItems: 'center', 
        width: 300, 
        height: 40 
      }}
    >
      
      <Search sx={{ p: '10px', color: colors.green[300], fontSize: 18 }}/>
      
      <InputBase
        sx={{ ml: 1, flex: 1, backgroundColor: 'transparent', color: 'whitesmoke', fontSize: 13}}
        placeholder="Search or start conversation.."
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  }

  return (
    <Stack direction={'row'} alignItems='center' justifyContent={'space-around'}  sx={{height: '60px', display: {xs: 'none', md: 'flex'}}}>
      <Stack direction={'row'} alignItems='center' spacing={1}>
        <WhatsApp sx={{color:'white', fontSize:'1.7rem'}}/>
        <Typography fontSize={13} color='white'>whatsapp clone</Typography>
      </Stack>
      {searchBar()}
      <Stack direction={'row'} spacing={2} alignItems='center'>
        <Typography color={'white'} fontSize={13}>{user.name}</Typography>
        <div>
          {BasicMenu(user)}
        </div>
      </Stack>
    </Stack>
  );
}
