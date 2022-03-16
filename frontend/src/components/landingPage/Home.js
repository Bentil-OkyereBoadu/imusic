import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Login from '../login/Login'
import Session from '../musicRoom/Session'

const Home = (props) => {

    const {chats} = props;

  return (
    <Box>
    <Flex w='100%' h='80vh' border='5px solid green' >
      <Box w='50%' h='100%' border='4px solid yellow'  >
        <Session chats= {chats}/>
      </Box>
      <Flex justifyContent='center' alignItems='center' w='50%' h='100%' border='1px solid tomato'> 
        <Flex h='60%' w='60%' flexDirection='column' justifyContent='space-around' alignItems='center' border='2px solid green' bg='gray.300' p={3}>
            <Heading fontSize='xl'>CREATE A SESSION</Heading>
            <Button colorScheme='orange' size='md' w='40%' h='20%' fontSize='md'>Public session</Button>
            <Button colorScheme='orange' size='md' w='40%'h='20%'fontSize='md' >Private session</Button>
        </Flex>
      </Flex>
    </Flex>
    <Box w='100%' h='30%' border='1px solid blue'>
      {/* <Input onChange={console.log(searchTerm)}></Input> */}
    </Box>
  </Box>
  )
}

export default Home