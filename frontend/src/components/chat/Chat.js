import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Chat = () => {

  const [chats , setChats] = useState([])
  const fetchChats = async () => {
    const {data} = await axios.get('/api/chat');
    setChats(data)
  }

  useEffect(() => {
    fetchChats()
  }, [])
  console.log(chats);
  
  return (
   <Box>
     <Grid templateColumns='1fr 2fr' textAlign='center'>
      <GridItem w='100%' h='100%' bg='orange.300'>
        <Heading size='lg'>Active users</Heading>
      </GridItem>
      <GridItem w='100%' h='100%' bg='orange.100'>
      <Heading>Chats</Heading>
       { chats.map((chat) => {
         return <Text key={chat._id}>{chat.chatName}</Text>
        })}
        </GridItem>
     </Grid>
   </Box>
  )
}

export default Chat