import { Box } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {

    const { selectedChat } = ChatState();
  return (
    <Box>
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/> 
    </Box>
  )
}

export default ChatBox