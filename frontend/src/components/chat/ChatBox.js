import { Box } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {

  const { selectedChat } = ChatState();
  return (
    <Box 
    d = {{ base: selectedChat? 'flex':'none'}}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w='100%'
    h='max-content'
    maxH='60vh'
    borderRadius="lg"
    borderWidth="1px"
    overflowY='scroll'
    >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/> 
    </Box>
  )
}

export default ChatBox