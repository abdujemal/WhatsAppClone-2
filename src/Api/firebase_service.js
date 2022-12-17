import { firebaseConfig } from "./firebase_config";
import {getFirestore, collection, getDocs, setDoc, doc, getDoc, addDoc, updateDoc, FieldValue, arrayUnion, onSnapshot, Timestamp, serverTimestamp} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";
import {FacebookAuthProvider, signInWithPopup, GithubAuthProvider, GoogleAuthProvider} from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();


const Api =  {
    FacebookPopup: async () => {
      const provider = new FacebookAuthProvider();
      let result = null;
      try{
        result = await signInWithPopup(auth, provider);
      }catch(e){
        console.error(`Erro na autenticacao ${e}`);
      }
      return result;
    },
    GithubPopup: async () => {
      const provider = new GithubAuthProvider();
      let result = null;
      try{
        result = await signInWithPopup(auth, provider);
      }catch(e){
        console.error(`Erro na autenticacao ${e}`);
      }
      return result;
    },
    GooglePopup: async () => {
      const provider = new GoogleAuthProvider();
      let result = null;
      try{
        result = await signInWithPopup(auth, provider);
      }catch(e){
        console.error(`Erro na autenticacao ${e}`);
      }
      return result;
    },
    addUser: async (u)=>{
      const ref = collection(db, 'users');
      const docRef = doc(ref, u.id);
      await setDoc(docRef, {
        name: u.name,
        avatar: u.avatar
      }, { merge: true });
    },
    getContactList: async (userId, setContactLoading)=>{
      setContactLoading(true)
      let list = [];
      const colref = collection(db, 'users')
      let result = await getDocs(colref);
      result.forEach(result => {
        let data = result.data();
        if(result.id !== userId){
          list.push({
            id: result.id,
            name: data.name,
            avatar: data.avatar
          });
        }
      });
      setContactLoading(false)
      return list;
    },
    addNewChat: async (user, userChat) => {
      const colRef = collection(db, 'chats')
      const chats = await getDocs(colRef);
      let chatExist = false;
      let exsistingChat = {};
      chats.docs.map(doc => {
        if(doc.data().users.length === 2 && doc.data().users.includes(userChat.id) && doc.data().users.includes(user.id)){
          console.log('it does exist');
          chatExist = true;
          exsistingChat = {chatId: doc.id,title: userChat.name,image: userChat.avatar,with: userChat.id}
        }
      });

      if(chatExist) return exsistingChat;

      let newChat = await addDoc(collection(db, "chats"), {
        messages: [],
        users: [user.id, userChat.id]
      });

      updateDoc(doc(collection(db, "users"), user.id), {
        chats: arrayUnion({
          chatId: newChat.id,
          title: userChat.name,
          image: userChat.avatar,
          with: userChat.id
        })
      });

      updateDoc(doc(collection(db, "users"), userChat.id), {
        chats: arrayUnion({
          chatId: newChat.id,
          title: user.name,
          image: user.avatar,
          with: user.id
        })
      })
  
      if(chatExist){
        return exsistingChat;
      }else{
        return {chatId: newChat.id,title: userChat.name,image: userChat.avatar,with: userChat.id};
      }
    },
    onChatList: (userId, setChatList, setChatsLoading) => {
      setChatsLoading(true);
      return onSnapshot(doc(collection(db, "users"), userId), 
      (doc)=>{
        if(doc.exists){
          let data = doc.data();
          if(data.chats){
            let chats = [...data.chats];
            chats.sort((a,b) => {
              if(a.lastMessageDate === undefined){
                return -1;
              }
              if(a.lastMessageDate.seconds < b.lastMessageDate.seconds){
                return 1;
              }else{
                return -1;
              }
            });
            setChatsLoading(false)
            setChatList(chats);
            console.log(`chats : ${chats}`);
          }
        }
      }, 
      (error)=>{
        console.log(error.message);
      });

      // return db.collection('users').doc(userId).onSnapshot(doc => {
      //   if(doc.exists){
      //     let data = doc.data();
      //     if(data.chats){
      //       let chats = [...data.chats];
      //       chats.sort((a,b) => {
      //         if(a.lastMessageDate === undefined){
      //           return -1;
      //         }
      //         if(a.lastMessageDate.seconds < b.lastMessageDate.seconds){
      //           return 1;
      //         }else{
      //           return -1;
      //         }
      //       });
  
      //       setChatList(chats);
      //     }
      //   }
      // });
    },
    onChatContent: (chatId, setList, setUsers) => {
      console.log(chatId);
      const myDoc = doc(collection(db, 'chats'), chatId);
      console.log(`ref: ${myDoc.path}`);
      return onSnapshot(myDoc, 
      (doc)=>{
        if(doc.exists){
          let data = doc.data();
          setList(data.messages);
          setUsers(data.users);
          console.log(data.messages);
        }
      }, 
      (error)=>{
        console.log(error.message);
      });

      // return db.collection('chats').doc(chatId).onSnapshot(doc => {
      //   if(doc.exists){
      //     let data = doc.data();
      //     setList(data.messages);
      //     setUsers(data.users);
      //   }
      // })
    },
    sendMessage: async (chatData, userId, type, body, users) => {
      let now = new Date();

      console.log(users);

      updateDoc(doc(collection(db, 'chats'), chatData.chatId), {
        messages: arrayUnion({
          type,
          author: userId,
          body,
          date: now.getTime()
        })
      });
  
      for (let i in users){
        let u = await getDoc(doc(collection(db, 'users'), users[i]));
        // let u = await db.collection('users').doc(users[i]).get();
        let uData = u.data();
        if(uData.chats){
          let chats = [...uData.chats];
          for(let e in chats){
            if(chats[e].chatId === chatData.chatId){
              chats[e].lastMessage = body;
              chats[e].lastMessageDate = now.getTime();
            }
          }
          await updateDoc(doc(collection(db, 'users'), users[i]), {chats});
  
          // await db.collection('users').doc(users[i]).update({
          //   chats
          // })
        }
      }
    }
  }
  
  export default Api;