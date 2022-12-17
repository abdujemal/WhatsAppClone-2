
import React, { useState , useContext, useEffect} from 'react';
import Api from './Api/firebase_service';

const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [chatsLoading, setChatloading] = useState(false)
  const [list, setList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [contactLoading, setContactLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  useEffect(()=>{
    setShowSidebar(true)
  },[])

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      email: u.email,
      avatar: u.photoURL,
      provider: u.providerData.providerId
    };
    await Api.addUser(newUser);
    setUser(newUser); 
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  async function FacebookPopup () {
    const res = await Api.FacebookPopup();
    handleLoginData(res.user)
  };

  async function GithubPopup () {
    const res = await Api.GithubPopup();
    handleLoginData(res.user)
  };

  async function GooglePopup () {
    const res = await Api.GooglePopup();
    handleLoginData(res.user)
  };

  async function logout(){
    localStorage.removeItem('user')
    setUser(null)
  }

  async function addUser (u) {
    const res = await Api.addUser(u)
    return res;
  };

  async function getContactList (userId) {
    const res = await Api.getContactList(userId, setContactLoading);
    setContactList(res);
    console.log(res);
  };

  async function addNewChat (user, userChat) {
   const res = await Api.addNewChat(user, userChat);
   setActiveChat(res);
  };

  function onChatList (userId) {
    const res = Api.onChatList(userId, setChatList, setChatloading);  
    return res;
  };

  function onChatContent (chatId) {
    setList([])
    const res = Api.onChatContent(chatId, setList, setUsers);
    return res;   
  };

  async function sendMessage (chatData, userId, type, body) {
    const res = await Api.sendMessage(chatData, userId, type, body, users);
    return res;
  }


  return (
    <ChatContext.Provider
      value={{
        user,
        users,
        activeChat,
        chatList,
        list,
        contactList,
        contactLoading,
        chatsLoading,
        showSidebar, 
        openContact, 
        setOpenContact,
        setShowSidebar,
        setUser,
        setActiveChat,
        FacebookPopup,
        GithubPopup,
        GooglePopup,
        addUser,
        getContactList,
        addNewChat,
        onChatList,
        onChatContent,
        sendMessage,
        logout
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useGlobalContext = () => useContext(ChatContext)

export {ChatProvider, ChatContext};