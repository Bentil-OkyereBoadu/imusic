import { Avatar, Box, Button, Flex, Heading, Img, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { SessionState } from '../../context/SessionProvider'
import Api from '../../services/api';


const Header = () => {

  const [ loading, setLoading ] = useState(false)
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const {data, sessionName, createdSessionId } = SessionState();

  const leaveHandler = async () => {
    
    let userId = user._id;
    
    try{
      setLoading(true)
      let {data} = await Api().put(`/api/session/${createdSessionId}/leave`, {userId})
      if( data === 'user left'){
        localStorage.clear();
        setLoading(false)
        history.push("/");
      }
    }
    catch(error){
      console.log(error);
      setLoading(false)
    }
    
  }
  
  return (
    <Box w='100%' h='10%' p='0.6rem' textAlign='center' bg='white'>
        <Flex justifyContent='space-between'>  
          <Img marginLeft='5%' src={require('../../assets/logo1.svg')}/>
          <Flex flexDirection='column' w='30%'>
            <Heading  fontSize='3xl' color='orange'>{sessionName}</Heading>
            <Text  fontSize='2xl' color='orange'>Welcome { data? data.display_name: user.name }!</Text>
          </Flex>
          <Flex justifyContent='center' w='20%'>
            <Box m='10px 20px 0px'>   
              <Avatar size="sm" name={ data? data.display_name: user.name }  />
            </Box>
            <Button colorScheme='red' onClick={leaveHandler} isLoading={loading}>Leave</Button>
          </Flex>
        </Flex>
    </Box>
  )
}

export default Header