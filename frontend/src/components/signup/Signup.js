import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Signup = () => {
    const [input, setInput] = useState('')
    const handleInputChange = (e) => setInput(e.target.value)

  return (
    <Flex justifyContent='center' alignContent='center' marginTop='10%'>
    <Flex w='40%' h='450px' textAlign='center' flexDirection='column' justifyContent='space-around' alignItems='center' alignContent='center' bg='gray.100' p={3} borderRadius='30px'>
    <FormControl width='80%' >
      <Heading>Sign Up</Heading>
      <br/>
      <Input 
        id='username'
        type='text'
        value={input}
        placeholder='Username'
        _placeholder={{opacity: 0.6, color: 'inherit', color: 'blue.500' }}
        onChange={handleInputChange} 
      />
      <Input marginTop='1.5rem'
        id='password'
        type='password'
        value={input}
        placeholder='Password'
        _placeholder={{opacity: 0.6, color: 'inherit', color: 'blue.500' }}
        onChange={handleInputChange} 
      />

      <Input marginTop='1.5rem'
        id='password'
        type='password'
        value={input}
        placeholder='Confirm Password'
        _placeholder={{opacity: 0.6, color: 'inherit', color: 'blue.500' }}
        onChange={handleInputChange} 
      />
      <NavLink to='/music' >
        <Button marginTop='1.5rem'
            size='md'
            colorScheme='blue'>
            Sign up
        </Button>
      </NavLink>
    </FormControl>
    </Flex>
  </Flex>
  )
}

export default Signup