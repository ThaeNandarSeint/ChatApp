import React, {useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import {allUsersRoute, host} from '../../utils/APIRoutes'
import {io} from 'socket.io-client'

// components
import { Contacts } from '../../components/Contacts/Contacts'
import { Welcome } from '../../components/Welcome/Welcome'
import { Test } from '../../components/Test/Test'
import { ChatContainer } from '../../components/ChatContainer/ChatContainer'

export const Chat = () => {
  const socket = useRef();

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=>{
    async function fetchData(){
      if(!localStorage.getItem('chat-app-user')){
        navigate('/login')
      } else{
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
        setIsLoaded(true);
      }
    }
    fetchData();
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id)
    }
  }, [currentUser])

  useEffect(()=>{
    async function fetchData(){
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        }else{
          navigate('/setAvatar')
        }
      }
    }
    fetchData();
  },[currentUser])
  const handleChatChange = (chat)=>{
    setCurrentChat(chat);
  }
  
  return (
    <Container>
      <div className='container'>        
        {
          isLoaded &&
          currentChat === undefined ? (
            
            <Test currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )
        }
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: var(--white);
  .container {
    height: 100vh;
    width: 100vw;
    background-color: var(--white);
    display: grid;
    grid-template-columns: 75% 25%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 65% 35%;
    }
  }
`;