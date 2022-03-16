import { Box, ListItem, UnorderedList } from '@chakra-ui/react'
import React from 'react'

const Session = (props) => {

  const {chats} = props;
  return (
    <Box>
        <UnorderedList>
           { chats.map((chat) => <ListItem key={chat._id}>{chat}</ListItem> )}
        </UnorderedList>
    </Box>
  )
}

export default Session