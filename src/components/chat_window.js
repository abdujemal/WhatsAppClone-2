import React, { useState, useEffect, useRef } from 'react';

import EmojiPicker from 'emoji-picker-react';

// import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

// import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
// import CloseIcon from '@material-ui/icons/Close';
// import SendIcon from '@material-ui/icons/Send';
// import MicIcon from '@material-ui/icons/Mic';

import MessageItem from './messege_item';
import { AppBar, Avatar, IconButton, Input, InputBase, List, Paper, Stack, Typography } from '@mui/material';
import { Close, EmojiEmotionsOutlined, Logout, LogoutRounded, MoreVert, Phone, Send } from '@mui/icons-material';
import { useGlobalContext } from '../context';
import { Box, width } from '@mui/system';

export default function ChatWindow({user, data}){

  const body = useRef();

  let recognition = null;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if(SpeechRecognition !== undefined) recognition = new SpeechRecognition();

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [users, setUsers] = useState([]);

  const { onChatContent, list, sendMessage, logout, setShowSidebar} = useGlobalContext()

  useEffect(()=>{
    if(body.current.scrollHeight > body.current.offsetHeight){
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
    }
  },[list]);

  useEffect(()=>{
    let unsub = onChatContent(data.chatId);
    return unsub;
  },[data.chatId]);
  
  const handleEmojiPicker = (e, emojiObject) =>  setText( text + e.emoji );
  const handleOpenEmojiPicker = () => setEmojiOpen(!emojiOpen);
  const handleMicClick = () => {
    if(recognition === null) return false;
    recognition.lang = 'en-us';
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = e => setText(e.results[0][0].transcript);

    recognition.start();
  };
  const handleInputKey = e => {if(e.keyCode === 13) handleSendClick()};
  const handleSendClick = () => {
    if(text !== ''){
      sendMessage(data, user.id, 'text', text, users);
      setText('');
      setEmojiOpen(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSendClick();
  }



  return (
    <Stack
      onClick={()=>setShowSidebar(false)}
      flex={1}
      sx={{
        position: 'relative',
        height: {xs:'100vh',md:'89vh'},
        backgroundImage: "url('https://cdn.wallpapersafari.com/54/0/HluF7g.jpg')",
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      }}
    >
      <Paper sx={{backgroundColor:'#1ebe71', borderRadius: 0}}>
        <Stack direction={'row'} justifyContent='space-between'>
          <Stack direction={'row'} alignItems='center' spacing={1} m={1.5}>
            <Avatar sx={{width: 30, height: 30}} src={data.image}/>
            <Typography color='white' fontSize={13} fontWeight='bold'>{data.title}</Typography>
          </Stack>
          <Stack direction={'row'}>
            <IconButton>
              <Phone sx={{color: 'white'}}/>
            </IconButton>
            <IconButton onClick={()=>logout()} sx={{display: {xs: 'block', md: 'none'}}}>
              <LogoutRounded sx={{color: 'white'}}/>
            </IconButton>
            <IconButton>
              <MoreVert sx={{color: 'white'}}/>
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
      <Stack 
        ref={body} 
        sx={{
          flex: 1, 
           
          overflowY: 'auto',
          '&::-webkit-scrollbar':{
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb':{
            backgroundColor: 'rgba(0, 0, 0, .2)'
          }
          }}>
        {
          list.map((item, key)=>(
            <MessageItem key={key} data={item} user={user}/>
          ))
        }
      </Stack>
      {/* <Box sx={{height: emojiOpen ? '200px' : '0px', width: '100px', display: emojiOpen ? 'block' : 'none' , transition: 'all .7s linear'}}>
        <EmojiPicker searchDisabled={true} onEmojiClick={handleEmojiPicker} skinTonesDisabled={true}/>
      </Box> */}
      <Stack mt={'auto'} alignItems={'start'}>
        <Box 
          sx={{
            width: '100%', 
            height: '80px', 
            borderBottom:'5px solid #1ebe71', 
            backgroundColor: 'white'
            }}>
              <Stack sx={{mt: '10px'}} alignItems='center' direction={'row'}>
                {emojiOpen && 
                <IconButton
                  onClick={()=>setEmojiOpen(!emojiOpen)}>
                  <Close/>
                </IconButton>}
                <IconButton
                  onClick={handleOpenEmojiPicker}>
                  <EmojiEmotionsOutlined/>
                </IconButton>
              <Paper                
                component="form"
                elevation={0}
                sx={{
                  flex:1,
                  borderRadius: '40px', 
                  backgroundColor: 'rgba(0,0,0,.07)' ,
                  p: '2px 4px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  margin: '10px',
                  height: 30 
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, backgroundColor: 'transparent', color: 'grey', fontSize: 13}}
                  placeholder="Type a messege.."
                  inputProps={{ 'aria-label': 'text' }}
                  value={text}
                  onChange={(e)=>setText(e.target.value)}
                  onSubmit={handleSubmit}
                />
              </Paper>
              <IconButton
                sx={{
                  zIndex: 1000
                }}
                onClick={handleSendClick}>
                <Send sx={{color: 'grey'}}/>
              </IconButton>
            </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};