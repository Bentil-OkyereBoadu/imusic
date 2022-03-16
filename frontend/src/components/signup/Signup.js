import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Signup = () => {
    const [input, setInput] = useState('')
    const handleInputChange = (e) => setInput(e.target.value)

  return (
    <Flex justifyContent='center' alignContent='center'>
    <FormControl width='30%' >
      <FormLabel htmlFor='Login'>Sign Up</FormLabel>
      <Input 
        id='username'
        type='text'
        value={input}
        placeholder='Username'
        onChange={handleInputChange} 
      />
      <Input 
        id='password'
        type='password'
        value={input}
        placeholder='Password'
        onChange={handleInputChange} 
      />
      <NavLink to='/music'>
        <Button
            size='md'
            height='48px'
            width='200px'
            border='2px'
            color='orange.500'>
            Submit
        </Button>
      </NavLink>
    </FormControl>
  </Flex>
  )
}

export default Signup