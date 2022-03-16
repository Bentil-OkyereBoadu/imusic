import { Box } from '@chakra-ui/react'
import React from 'react'

const Session = (props) => {

  const {chats} = props;
  return (
    <Box>
        <Box>
           { chats.map((chat) => <Box bg='gray.100' key={chat._id}>{chat.users}</Box> )}
        </Box>
    </Box>
  )
}

export default Session