import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {

  return (
   <Box>
     <Flex  textAlign='center'>
      <Box w='100%' h='100%' bg='orange.300'>
        <Heading fontSize='2rem' p='0.4rem'>Active users</Heading>
      </Box>
     </Flex>
   </Box>
  )
}

export default ChatPage