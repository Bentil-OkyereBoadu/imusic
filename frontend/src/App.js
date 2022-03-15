import React, { useState } from 'react';
import {Box, Flex, Input} from '@chakra-ui/react'
import Login from './components/login/Login';
import Session from './components/session/Session';
// import Spotify from './util/Spotify';

function App() {

    const [searchTerm, setSearchTerm] = useState('')
    
    // const search = term =>{
    // Spotify.search(term).then(searchResult => {
    //   setSearchTerm({searchResults: searchResult})
    //   })
    // }


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
        <Input onChange={console.log(searchTerm)}></Input>
      </Box>
    </Box>  
  );
}

export default App;
