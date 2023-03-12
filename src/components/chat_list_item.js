import { Avatar, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import moment from 'moment/moment';
import React, {useState, useEffect} from 'react';


export default function ChatListItem({onClick, data, active}){
  const [time, setTime] = useState('');
  
  // useEffect(() => {
  //   if (data.lastMessageDate > 0){
  //     let d = new Date(data.lastMessageDate.seconds * 1000);
  //     let hours = d.getHours();
  //     let minutes = d.getMinutes();
  //     hours = hours < 10 ? `0${hours}` : hours;
  //     minutes = minutes < 10 ? `0${minutes}` : minutes;
  //     setTime(`${hours}:${minutes}`);
  //   }
  // }, [data]);
  return (
    <ListItem onClick={onClick} sx={{backgroundColor: active ? 'whitesmoke' : 'white',}}>
        <ListItemAvatar>
          <Avatar src={data.image}>
          </Avatar>
        </ListItemAvatar>
        <Stack>
          <Typography fontSize={15} fontWeight={400} >{data.title}</Typography>
          <Typography color={'grey'} fontSize={12} textOverflow='ellipsis' maxWidth={'120px'} sx={{whiteSpace: 'nowrap', overflow: 'hidden'}}>{data.lastMessage}</Typography>
        </Stack>
        <Typography ml={'auto'} color='grey' fontSize={12} sx={{whiteSpace: 'nowrap'}}>{moment(data.lastMessageDate).format('HH:mm a')}</Typography>
        
      </ListItem>
  );
}