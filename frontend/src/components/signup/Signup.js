import { Button, Flex, FormControl, Heading, Input, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';

const client_id ="ddc7d259bece4112b9df90559ea0e4ff";
  const redirect_uri = 'http://localhost:3000/music';

  const OAUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SCOPES = [ "user-read-currently-playing", 
                   "user-read-playback-state", 
                   "playlist-read-private", 
                   "user-read-currently-playing" ]
  const SPACE_DELIMITER = "%20";
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const Signup = () => {
    const [state, setState] = useState({
      name: '',
      email:'',
      password:'',
      confirmPassword: '',
    })

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleInputChange = (e) => {
      const value = e.target.value;
      setState({
        ...state,
        [e.target.name]: value
      })
    }

    let name = state.name;
    let email = state.email;
    let password = state.password;

    const handleSubmit = async () => {
      setLoading(true);
      if(!state.name || !state.email || !state.password || !state.confirmPassword){
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

      if( state.password !== state.confirmPassword){
        toast({
          title: 'Passwords do not match',
          status: 'warning',
          duration: 2000,
          isClosable: true,
          position: 'bottom'
        })
        setLoading(false)
        return;
      }

      try{
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };

        const {data} = await axios.post('http://localhost:4000/api/user/', 
                                        { name, email, password},
                                          config );
        if(data === 'user already exists'){
          toast({
            title: 'User already exists',
            status: 'warning',
            duration: 2000,
            isClosable: true,
            position: 'bottom'
          }); 
          setLoading(false)
        }
        else {
          localStorage.setItem('loggedinUser', JSON.stringify(data));
          toast({
          title: 'Account has been created',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'bottom'
        }); 
        setLoading(false)
        
        window.location = `${OAUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
       
      }
        

      } catch (error) {
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
    <Flex justifyContent='center' alignContent='center' marginTop='10%'>
    <Flex w='40%' h='450px' textAlign='center' flexDirection='column' justifyContent='space-around' alignItems='center' alignContent='center' bg='gray.100' p={3} borderRadius='30px'>
    <FormControl width='80%' >
      <Heading>Sign Up</Heading>
      <br/>
      <Input 
        id='name'
        type='text'
        value={state.name}
        name='name'
        placeholder='Username'
        _placeholder={{opacity: 0.6, color: 'blue.500' }}
        onChange={handleInputChange} 
      />
      <Input marginTop='1.5rem'
        id='email'
        type='text'
        value={state.email}
        name='email'
        placeholder='Email'
        _placeholder={{opacity: 0.6, color: 'blue.500' }}
        onChange={handleInputChange} 
      />
      <Input marginTop='1.5rem'
        id='password'
        type='password'
        value={state.password}
        name='password'
        placeholder='Password'
        _placeholder={{opacity: 0.6, color: 'blue.500' }}
        onChange={handleInputChange} 
      />

      <Input marginTop='1.5rem'
        id='confirmPassword'
        type='password'
        value={state.confirmPassword}
        name='confirmPassword'
        placeholder='Confirm Password'
        _placeholder={{opacity: 0.6, color: 'blue.500' }}
        onChange={handleInputChange} 
      />
      <NavLink to='/music' ></NavLink>
        <Button marginTop='1.5rem'
            size='md'
            colorScheme='blue'
            isLoading={loading}
            onClick={handleSubmit}>
            Sign up
        </Button>
      
    </FormControl>
    </Flex>
  </Flex>
  )
}

export default Signup