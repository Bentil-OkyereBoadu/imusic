import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Session from '../musicRoom/Session'
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const Home = (props) => {

  const onPublicBtnClick = (e) => {
    e.preventDefault();
  }


    const {chats} = props;

  return (
    <Box>
    <Flex w='100%' h='80vh' >
      <Box w='50%' h='100%' bg='orange.400'>
        {/* <Session chats= {chats}/> */}
      </Box>
      <Flex justifyContent='center' alignItems='center' w='50%' h='100%'> 
        <Flex h='60%' w='60%' flexDirection='column' justifyContent='space-around' alignItems='center' bg='gray.300' p={3} borderRadius='30px'>
            <Heading fontSize='xl'>CREATE A SESSION</Heading>
            <Button colorScheme='orange' size='md' w='40%' h='20%' fontSize='md' borderRadius='30px'>
                <a href='http://localhost:4000/login'>Public</a>
            </Button>
            <Button colorScheme='orange' size='md' w='40%'h='20%'fontSize='md'borderRadius='30px' >
                <NavLink to='/login'>Private</NavLink>
            </Button>
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