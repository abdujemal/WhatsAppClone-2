import { Box, Stack, Typography } from '@mui/material';
import moment from 'moment/moment';
import React, {useState, useEffect} from 'react';



export default function MessageItem({data, user}){
  const [time, setTime] = useState('');

  const isAuthor = user.id === data.author;

  return (
    <Box marginLeft= {isAuthor ? 'auto' : 0}
    marginRight= {!isAuthor ? 'auto' : 0}>
      <Box sx={{
        width: 'fit-content',
        marginLeft: 1,
        marginRight: 1,
        backgroundColor: isAuthor ? '#1EBE71' : '#FFF',
        color: isAuthor ? '#fff' : 'black',
        borderBottomRightRadius: isAuthor ? '0' : '10px',
        borderBottomLeftRadius: !isAuthor ? '0' : '10px',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px'
      }}>
        <Stack sx={{position: 'relative', margin: '10px',  padding: '5px 25px 5px 0px'}}>
          <Typography fontSize={12} textAlign='start'>{data.body}</Typography>
          <Typography sx={{position: 'absolute', bottom: 0, right: 0}} fontSize={9}>{moment(data.date).format('HH:mm')}</Typography>
        </Stack>
      </Box>
    </Box>
  );
};