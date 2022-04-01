import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import SingleSession from '../sessions/SingleSession'

const Sessions = () => {

  
  return (
    <Box >
        <Heading fontSize='2rem' p='0.4rem' bg='gray.500' textAlign='center' color='white'>Active Sessions</Heading>
        <Box overflowY='scroll' h='100vh' w='100%'>
        <Flex flexDirection='column'  alignItems='center' w='70%' h='100%'margin='0 auto'>
           <SingleSession/>
        </Flex>
        </Box>
    </Box>
  )
}

export default Sessions