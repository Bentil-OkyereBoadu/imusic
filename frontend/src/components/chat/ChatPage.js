import { Box, Flex, Heading} from '@chakra-ui/react'
import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import MyChats from './MyChats';
import SearchBox from './SearchBox';


const ChatPage = () => {
  const { user }  = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
   <Box>
     <Flex  textAlign='center'>
      <Box w='100%' h='100%' >
        <Heading fontSize='2rem' p='0.4rem' bg='gray.500' color='white'>Active users</Heading>
        <SearchBox/>
        { user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
     </Flex>
   </Box>
  )
}

export default ChatPage