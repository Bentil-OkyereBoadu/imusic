import { Avatar, Box, Button, Flex, Img, Text } from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';

const Header = () => {

  const history = useHistory()

  // const { user } = ChatState();
  const user = JSON.parse(localStorage.getItem("loggedinUser"))
  

  const logoutHandler = () => {
    localStorage.removeItem("loggedinUser");
    history.push("/");
  }
  
  return (
    <Box w='100%' h='10%' p='0.6rem' textAlign='center' bg='gray.300'>
        <Flex justifyContent='space-between'>
           
            <Img marginLeft='5%' src={require('../../assets/logo.svg')}/>
            <Text w='30%' fontSize='2xl'>Welcome { user.name }!</Text>
            <Flex justifyContent='center' w='20%'>
                <Box m='10px 20px 0px' cursor='pointer'> 
                  
                  <Avatar size="sm" cursor="pointer" name={user.name} />
                </Box>
                <Button colorScheme='red' onClick={logoutHandler} >Logout</Button>
            </Flex>
        </Flex>
    </Box>
  )
}

export default Header