import { Avatar, Box, Heading, Text } from '@chakra-ui/react';
import React from 'react'

const UserListItem = ({user, handleFunction }) => {

  return (
    <Box
        p='0.5em' 
        w='100%'
        h='10%'
        border='1px solid green'
      onClick={handleFunction}
      cursor='pointer'
      bg='#E8E8E8'
      _hover={{
          background: "#38B2AC",
          color: "white",
      }}
      borderRadius="lg"
      d="flex"
      alignItems="center"
      color='black'
    >
      <Avatar
       mr={2}
       size="sm"
       cursor='pointer'
       name={user.name}/>
       <Box>
           <Heading fontSize='2xl'>{user.name}</Heading>
           <Text>{user.email}</Text>
       </Box>
    </Box>
  )
}

export default UserListItem