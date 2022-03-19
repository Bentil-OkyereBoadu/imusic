import { Button, Flex, FormControl, Heading, Input, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';

const Signup = () => {
    const [state, setState] = useState({
      username: '',
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

    let username = state.username;
    let email = state.email;
    let password = state.password;

    const handleSubmit = async () => {
      setLoading(true);
      if(!state.username || !state.email || !state.password || !state.confirmPassword){
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

        const {data} = await axios.post('/api/user/', 
                                        { username, email, password},
                                          config );
        toast({
          title: 'Account has been created',
          status: 'Success',
          duration: 2000,
          isClosable: true,
          position: 'bottom'
        }); 

        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false)
        history.push("/music")

      } catch (error) {
        toast({
          title: 'Error occured',
          description: error.response.data.messagee,
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
        id='username'
        type='text'
        value={state.username}
        name='username'
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