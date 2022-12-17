import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';


export default function ChatIntro(){
  return (
    <Stack alignItems='center' justifyContent='center' spacing={1} sx={{height: {xs:'100vh', md: '60vh'}, width: {xs:'100vw', md: '62vw'}, backgroundColor: 'white', p: 6}}>
      <img src='intro-wpp.jpg' width={'200px'} />
      <Typography fontSize={20}>Keep your cell phone connected</Typography>
      <Typography fontSize={10}>WhatsApp connects to your phone to tune in to your messages. To reduce data usage, connect your phone to a Wi-Fi network.</Typography>
    </Stack>
  );
}