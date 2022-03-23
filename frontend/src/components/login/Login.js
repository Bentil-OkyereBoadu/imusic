import { Button, Flex, FormControl, Text, Input, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';


  const client_id ="ddc7d259bece4112b9df90559ea0e4ff";
  const redirect_uri = 'http://localhost:3000/music';

  const OAUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SCOPES = [ "user-read-currently-playing", 
                   "user-read-playback-state", 
                   "playlist-read-private", 
                   "user-read-currently-playing" ]
  const SPACE_DELIMITER = "%20";
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const Login = () => {

  

  const [state, setState] = useState({
    email: '',
    password:'', 
  })

  

  const [loading, setLoading] = useState(false)
  const toast = useToast();
  

  const handleInputChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    })
  } 

  const email = state.email;
  const password = state.password;

  const handleSubmit = async () => {
    setLoading(true);
    if(!email || !password){
        toast({
          title: 'Please fill all the fields',
          status: 'warning',
          duration: 2000,
          isClosable: true,
          position: 'bottom'
        })
        setLoading(false);
        return;
    }

    try{
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      }

      const {data} = await axios.post("http://localhost:4000/api/user/login", { email, password }, config);

      if(data){
          localStorage.setItem('userInfo', JSON.stringify(data))
         
         
          toast({
          title: 'Login Successful',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'bottom'
        });

        setLoading(false);
       window.location = `${OAUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
      }
  

    } catch(error){
      toast({
        title: 'Error occured',
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }

  }

  return (
  <Flex justifyContent='center' alignItems='center' alignContent='center' marginTop='10%'>
    <Flex w='40%' h='450px' textAlign='center' flexDirection='column' justifyContent='space-around' alignItems='center' alignContent='center' bg='gray.100' p={3} borderRadius='30px'>
      <FormControl width='80%' >
        <Heading>Login</Heading>
        <br/>
        <Input 
          name='email'
          id='email'
          type='text'
          placeholder='Email'
          _placeholder={{opacity: 0.6, color: 'blue.500' }}
          onChange={handleInputChange} 
        />
       
        <Input marginTop='1.5rem'
          name='password'
          id='password'
          type='password'
          placeholder='Password'
          _placeholder={{ opacity: 0.6, color: 'blue.500' }}
          onChange={handleInputChange} 
        />
        
        <Button margin='1rem'
            size='md'
            colorScheme='blue'
            onClick={handleSubmit}
            isLoading={loading}>
            Log in
        </Button>
        
        <Text fontSize='lg'>Don't have an account yet? </Text>
        <NavLink to='/signup' style={{textDecoration: 'underline'}}>Sign up</NavLink>
      </FormControl>
    </Flex>
  </Flex>
  )
}

export default Login