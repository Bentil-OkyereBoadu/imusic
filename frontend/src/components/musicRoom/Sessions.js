import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const Sessions = () => {

  
  return (
    <Box>
        <Box>
          <Heading fontSize='2rem' p='0.4rem' bg='gray.500' textAlign='center' color='white'>Sessions</Heading>
           {/* { chats.map((chat) => <Box bg='gray.100' key={chat._id}>{chat.users}</Box> )} */}

        </Box>
    </Box>
  )
}

export default Sessions