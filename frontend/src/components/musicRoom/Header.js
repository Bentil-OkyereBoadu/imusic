import { Box, Button, Flex, Heading, Img, Text } from '@chakra-ui/react'
import React from 'react'
import {VscAccount} from 'react-icons/vsc';

const Header = ({data}) => {

  const name = data.name;
  const id = data.id;
  const userImage = data.images;
  return (
    <Box w='100%' h='10%' p='0.6rem' textAlign='center' bg='gray.300'>
        <Flex justifyContent='space-between'>
            {/* <Heading w='30%'>iMusic</Heading> */}
            <Img marginLeft='5%' src={require('../../assets/logo.svg')}/>
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