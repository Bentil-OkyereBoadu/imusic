import { Box } from '@chakra-ui/react';
import React from 'react'
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {

  return (
    <Box 
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w='100%'
    h='60vh'
    borderRadius="lg"
    borderWidth="1px"
    overflowY='scroll'
    >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/> 
    </Box>
  )
}

export default ChatBox