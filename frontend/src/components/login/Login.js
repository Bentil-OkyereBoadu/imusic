import { Button, Flex, FormControl, Text, Input, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';


const Login = () => {

  const [input, setInput] = useState('')

  const handleInputChange = (e) => setInput(e.target.value) 
  return (
  <Flex justifyContent='center' alignItems='center' alignContent='center' marginTop='10%'>
    <Flex w='40%' h='450px' textAlign='center' flexDirection='column' justifyContent='space-around' alignItems='center' alignContent='center' bg='gray.100' p={3} borderRadius='30px'>
      <FormControl width='80%' >
        <Heading>Login</Heading>
        <br/>
        <Input 
          id='username'
          type='text'
          placeholder='Username'
          _placeholder={{opacity: 0.6, color: 'blue.500' }}
          onChange={handleInputChange} 
        />
       
        <Input marginTop='1.5rem'
          id='password'
          type='password'
          placeholder='Password'
          _placeholder={{ opacity: 0.6, color: 'blue.500' }}
          onChange={handleInputChange} 
        />
        
        <Button margin='1rem'
            size='md'
            colorScheme='blue'>
            Log in
        </Button>
        
        <Text fontSize='lg'>Don't have an account yet? </Text>
        <NavLink to='/signup'>Sign up</NavLink>
      </FormControl>
    </Flex>
  </Flex>
  )
}

export default Login