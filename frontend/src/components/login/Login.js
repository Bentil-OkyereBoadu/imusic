import { Button, Flex, FormControl, FormLabel, Text, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';


const Login = () => {

  const [input, setInput] = useState('')

  const handleInputChange = (e) => setInput(e.target.value) 
  return (
    <Flex justifyContent='center' alignContent='center'>
      <FormControl width='30%' >
        <FormLabel htmlFor='Login'>Login</FormLabel>
        <Input 
          id='username'
          type='text'
          placeholder='Username'
          onChange={handleInputChange} 
        />
        <Input 
          id='password'
          type='password'
          placeholder='Password'
          onChange={handleInputChange} 
        />
        <Button
            size='md'
            height='48px'
            width='200px'
            border='2px'
            color='orange.500'>
            Submit
        </Button>
        <Text fontSize='lg'>Don't have an account yet? </Text>
        <NavLink to='/signup'>Sign up</NavLink>
      </FormControl>
    </Flex>
  )
}

export default Login