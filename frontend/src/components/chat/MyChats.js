import React from 'react'
import { ChatState } from '../../context/ChatProvider';

const MyChats = () => {

    const {user, setSelectedChat, chats, setChats} = ChatState();

  return (
    <div>MyChats</div>
  )
}

export default MyChats