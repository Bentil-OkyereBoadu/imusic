import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';
import MyChats from './MyChats';
import SearchBox from './SearchBox';
import ChatBox from './ChatBox';

const ChatPage = () => {
  const { user }  = ChatState();
  const [fetchAgain, setFetchAgain] = useState()
  return (
   <Box>
     <Flex  textAlign='center'>
      <Box w='100%' h='100%' >
        <Heading fontSize='2rem' p='0.4rem' bg='orange.300'>Active users</Heading>
        <SearchBox/>
        { user && <MyChats fetchAgain={fetchAgain} />}
        { user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        <MyChats/>
      </Box>
     </Flex>
   </Box>
  )
}

export default ChatPage