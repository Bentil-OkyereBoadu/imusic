import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Session = () => {

   const handlePublicLogin = () => {

   }
  return (
    <Flex w='100%' h='100%' justifyContent='center' marginTop='10%'>
        <Flex w='30%' h='50vh' flexDirection='column' justifyContent='space-around' alignItems='center' bg='rgba(180,175,173,0.5)' p={3} borderRadius='30px'>
            <Heading fontSize='xl' color='white'>CREATE A SESSION</Heading>
            <Input placeholder='Session Name'></Input>
            <Button bg='orange' color='white' size='md' w='50%'h='20%' fontSize='lg' borderRadius='30px' onClick={handlePublicLogin} >
                Public
            </Button>         
            <NavLink to='/login' style={{width:'50%', height:'20%'}} >
            <Button bg='orange' color='white' size='md' w='100%'h='100%'fontSize='lg'borderRadius='30px'>
                Private
            </Button>
            </NavLink>
        </Flex>
    </Flex>
  )
}

export default Session