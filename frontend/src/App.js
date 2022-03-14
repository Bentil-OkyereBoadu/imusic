import React from 'react';
import {Box, Flex} from '@chakra-ui/react'
import Login from './components/login/Login';
import Session from './components/session/Session';

function App() {
  return (
    <Box>
      <Flex w='100%' h='80vh' border='5px solid green' >
        <Box w='50%' h='100%' border='4px solid yellow'  >
          <Session/>
        </Box>
        <Flex justifyContent='center' alignItems='center' w='50%' h='100%' border='1px solid tomato'> 
          <Login />
        </Flex>
      </Flex>
      <Box w='100%' h='30%' border='1px solid blue'>
        chat
      </Box>
    </Box>  
  );
}

export default App;
