import { Avatar, Box, Button, Flex, Heading, Img, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SessionState } from '../../context/SessionProvider'

const JoinHeader = () => {

    const [ loading, setLoading ] = useState(false)
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const {data, sessionName, sessionToJoin } = SessionState();
  
    const leaveHandler = async () => {
      let sessionId = sessionToJoin._id;
      let userId = user._id;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      try{
        setLoading(true)
        let {data} = await axios.put(`http://localhost:4000/api/session/${sessionId}/leave`, {userId}, config)
        if( data === 'user left'){
            setLoading(false)
            localStorage.clear();
            history.push("/");
        }
      }
      catch(error){
        console.log(error);
      }
      
    }
    return (
        <Box w='100%' h='10%' p='0.6rem' textAlign='center' bg='white'>
            <Flex justifyContent='space-between'>  
              <Img marginLeft='5%' src={require('../../assets/logo1.svg')}/>
              <Flex flexDirection='column' w='30%'>
                <Heading  fontSize='3xl' color='orange'>{sessionName}</Heading>
                {/* <Text  fontSize='2xl' color='orange'>Welcome { data? data.display_name: user.name }!</Text> */}
              </Flex>
              <Flex justifyContent='center' w='20%'>
                <Box m='10px 20px 0px'>   
                  {/* <Avatar size="sm" name={ data? data.display_name: user.name }  /> */}
                </Box>
                <Button colorScheme='red' onClick={leaveHandler} isLoading={loading}>Leave</Button>
              </Flex>
            </Flex>
        </Box>
      )
}

export default JoinHeader