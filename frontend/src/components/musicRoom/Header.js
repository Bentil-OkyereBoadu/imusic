import { Avatar, Box, Button, Flex, Heading, Img, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { SessionState } from '../../context/SessionProvider'


const Header = () => {

  const [ loading, setLoading ] = useState(false)
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const {data, sessionName} = SessionState();

  const leaveHandler = () => {
    setLoading(true)
    localStorage.clear();
    setLoading(false)
    history.push("/");
  }
  
  return (
    <Box w='100%' h='10%' p='0.6rem' textAlign='center' bg='white'>
        <Flex justifyContent='space-between'>  
          <Img marginLeft='5%' src={require('../../assets/logo1.svg')}/>
          <Flex flexDirection='column' w='30%'>
            <Heading  fontSize='3xl' color='orange'>{sessionName}</Heading>
            <Text  fontSize='2xl' color='orange'>Welcome {data? data.display_name: user.name}!</Text>
          </Flex>
          <Flex justifyContent='center' w='20%'>
            <Box m='10px 20px 0px'>   
              <Avatar size="sm" name={data? data.display_name: user.name}  />
            </Box>
            <Button colorScheme='red' onClick={leaveHandler} isLoading={loading}>Leave</Button>
          </Flex>
        </Flex>
    </Box>
  )
}

export default Header