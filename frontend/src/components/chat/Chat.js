import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const Chat = () => {

    
  return (
   <Box>
     <Grid templateColumns='1fr 2fr' textAlign='center'>
      <GridItem w='100%' h='100%' bg='orange.300'>
        <Heading size='lg'>Active users</Heading>
      </GridItem>
      <GridItem w='100%' h='100%' bg='orange.100'>
      <Heading>Chats</Heading>
      </GridItem>
     </Grid>
   </Box>
  )
}

export default Chat