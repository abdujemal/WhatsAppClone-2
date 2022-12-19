import { Add, ArrowBackIosNew, ArrowForwardIos, Clear } from '@mui/icons-material'
import { Avatar, Button, CircularProgress, Collapse, Fade, IconButton, List, Stack, Typography } from '@mui/material'
import React from 'react'
import { useGlobalContext } from '../context'
import ChatListItem from './chat_list_item'

function MobileSidebar() {

    const {showSidebar, setShowSidebar, setActiveChat, chatsLoading, chatList, activeChat, setOpenContact, openContact, getContactList, contactList, contactLoading, addNewChat, user} = useGlobalContext()

    return (

        <Stack direction={'row'} sx={{display: {xs: 'flex', md: 'none'}, height: '100%', position: 'absolute', right: 0,  top: 0, zIndex: 999}}>
            <Avatar sx={{backgroundColor: '#1ebe71', mt: 10, mr: 1}} onClick={()=>setShowSidebar(!showSidebar)}>
                {showSidebar? <ArrowForwardIos sx={{color: 'white'}}/> 
                :<ArrowBackIosNew sx={{color: 'white'}}/>}
            </Avatar>

            <Collapse
            
            orientation="horizontal"
            in={showSidebar}
            >
                <Stack 
                    sx={{
                        width: '100px',
                        backgroundColor: 'white', 
                        borderTopLeftRadius: '10px', 
                        borderBottomLeftRadius: '10px'
                        }}
                    >
                    {openContact?
                    <Stack sx={{mt: 3, width: '100%'}} alignItems='center'>
                        <IconButton color='#1ebe71' onClick={(e)=>{setOpenContact(false);}}><Clear/></IconButton>
                        {
                        contactLoading?
                        <CircularProgress/>:
                        contactList.map((item, key)=>(
                            <Button key={key} sx={{width: '100%', textTransform: 'none'}} onClick={(e)=>{addNewChat(user, item);setOpenContact(false)}}>
                            <Stack direction={'column'} width='100%' alignItems='center' justifyContent='flex-start'>
                                <Avatar src={item.avatar}/>
                                <Typography color={'black'} fontSize={11}>{item.name}</Typography>
                            </Stack>
                            </Button>
                        ))
                        }
                    </Stack>:
                    <Stack sx={{mt: 3, width: '100%'}} alignItems='center'>
                        <Stack mb={2} direction={'column'} width='100%' alignItems='center' justifyContent='flex-start'>
                            <Avatar src={user.avatar}/>
                            <Typography color={'black'} fontSize={11}>{user.name}</Typography>
                        </Stack>
                        <Typography mb={1} fontWeight={19}>Chats</Typography>
                    {
                    chatsLoading?
                    <CircularProgress/>:
                    chatList.map((item, key)=>(
                        <Stack 
                            key={key}                         
                            sx={{
                                pt:'3px',
                                pb: '3px',
                                width:'100%',
                                backgroundColor: activeChat?.chatId === item.chatId ? "whitesmoke" : 'white'}} 
                            direction={'column'} alignItems='center' onClick={()=>setActiveChat(item)}>
                                <Avatar src={item.image}/>
                                <Typography fontSize={12} fontWeight={400}>{item.title}</Typography>
                        </Stack>
                    ))
                    }
                    <IconButton color='#1ebe71' onClick={(e)=>{setOpenContact(true);getContactList(user.id);}}><Add/></IconButton>
                    </Stack>}
                </Stack>
            </Collapse>            
        </Stack>
    )
}

export default MobileSidebar

