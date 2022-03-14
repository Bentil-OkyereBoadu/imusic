import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const Login = () => {
  return (
    <Flex h='60%' w='60%' flexDirection='column' justifyContent='space-around' alignItems='center' border='2px solid green' bg='gray.300' p={3}>
        <Heading fontSize='xl'>CREATE A SESSION</Heading>
        <Button colorScheme='orange' size='md' w='40%' h='20%' fontSize='md'>Public session</Button>
        <Button colorScheme='orange' size='md' w='40%'h='20%'fontSize='md'>Private session</Button>
    </Flex>
  )
}

export default Login