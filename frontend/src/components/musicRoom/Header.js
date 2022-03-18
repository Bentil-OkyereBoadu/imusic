import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import {VscAccount} from 'react-icons/vsc';

const Header = ({data}) => {

  const name = data.display_name;
  const id = data.id;
  const userImage = data.images;
  return (
    <Box w='100%' h='10%' p='0.6rem' textAlign='center'>
        <Flex justifyContent='space-between'>
            <Heading w='30%'>iMusic</Heading>
            <Text w='30%' fontSize='xl'>Welcome {name}!</Text>
            <Flex justifyContent='center' w='20%'>
                <Box m='10px 20px 0px' cursor='pointer'>{!userImage? <VscAccount style={{width:25, height:25}}/> :userImage }</Box>
                <Button colorScheme='red'>Leave</Button>
            </Flex>
        </Flex>
    </Box>
  )
}

export default Header