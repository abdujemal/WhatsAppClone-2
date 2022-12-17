
import { useEffect, useState } from 'react'
import './App.css'
import {useGlobalContext} from './context'
import Login from './components/login'
import Api from './Api/firebase_service'
import { Avatar, Box, Button, CircularProgress, colors, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import TopBar from './components/topbar'
import ChatWindow from './components/chat_window'
import { Add, Clear, DonutLarge, LocalPhone, QuestionAnswer } from '@mui/icons-material'
import ChatListItem from './components/chat_list_item'
import ChatIntro from './components/chat_intro'
import MobileSidebar from './components/mobile_sidebar'

function App() {

  const {user, setUser, getContactList, chatsLoading, onChatList, chatList, setActiveChat, activeChat, contactList, contactLoading, addNewChat, setOpenContact, openContact} = useGlobalContext()

  useEffect(() => {
    if(user === null){
      return setUser(JSON.parse(localStorage.getItem('user')));
    }if(user !== null){
      return onChatList(user.id);
    }
  },[user]);


  if(user == null) return (<Login/>)

  const myMenuIcon = (MyIcon, label, isActive)=>
    <Stack alignItems={'center'} mt={isActive ? 5 : 0} sx={{
      '&:hover':{
          backgroundColor: 'whitesmoke'
      },
    }}>
      <MyIcon sx={{
        fontSize: 35,
        color: isActive ? 'rgb(29, 171, 103)' : colors.grey[500]
      }}/>
      <Typography fontSize={11}>{label}</Typography>
    </Stack>;
  
  

  return (
    <div className="App">
      <Stack direction={'column'}  sx={{backgroundColor: '#1ebe71', height: '100vh'}}>
        <TopBar/>
        <MobileSidebar/>
        <Stack direction={'row'} alignItems='end' sx={{height: '100vh', }}>
          <Stack direction={'column'} spacing={1} sx={{height:'93%', display: {xs: 'none', md: 'flex'}, width: '70px', backgroundColor: 'white'}}>
            {myMenuIcon(QuestionAnswer, "Messages", true)}
            {myMenuIcon(LocalPhone, "Connections", false)}
            {myMenuIcon(DonutLarge, "Status", false)}
          </Stack>
          {openContact?
          <Stack  
              sx={{
                display: {xs: 'none', md: 'flex'},
                height: '100%', 
                backgroundColor: 'white',
                width: '25%',
                minWidth: "180px",
                borderRadius: '20px 20px 0px 0px'
              }}
              >
              <Stack direction={'row'} alignItems='center' justifyContent='space-between'>
                <Typography ml={2} color={"#1ebe71"}>New Conversation</Typography>
                <IconButton color='#1ebe71' onClick={(e)=>setOpenContact(false)}><Clear/></IconButton>
              </Stack>
              <List sx={{width: '100%'}}>
                {
                  contactLoading?
                  <CircularProgress/>:
                  contactList.map((item, key)=>(
                    <Button key={key} sx={{width: '100%', textTransform: 'none'}} onClick={(e)=>{addNewChat(user, item);setOpenContact(false)}}>
                      <Stack direction={'row'} width='100%' spacing={2} alignItems='center' justifyContent='flex-start'>
                        <Avatar src={item.avatar}/>
                        <Typography color={'black'} >{item.name}</Typography>
                      </Stack>
                    </Button>
                  ))
                }
              </List>
          </Stack>
          :
          <Stack 
            alignItems='center'
            sx={{
              display: {xs: 'none', md: 'flex'},
              height: '100%', 
              backgroundColor: 'white',
              width: '25%',
              minWidth: "180px",
              borderRadius: '20px 20px 0px 0px'}}>
            <List sx={{mt: 3, width: '100%'}}>
                {
                  chatsLoading?
                  <CircularProgress/>:
                  chatList.map((item, key)=>(
                    <ChatListItem 
                      key={key}
                      data={item}
                      active={activeChat?.chatId === item.chatId}
                      onClick={()=>{setActiveChat(item)}}
                    />
                  ))
                }
            </List>
            <Typography>You've reached the end.</Typography>
            <Typography fontSize={11} sx={{color: '#1ebe71'}}>Add mode friends!</Typography>
            <IconButton color='#1ebe71' onClick={(e)=>{setOpenContact(true);getContactList(user.id);}}><Add/></IconButton>
            <Paper/>
          </Stack>
          }{
            activeChat !== null?
            <ChatWindow user={user} data={activeChat}/>:
            <ChatIntro/>
          }
        </Stack>
      </Stack>
    </div>
  );
}

export default App
