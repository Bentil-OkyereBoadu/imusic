import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Session from '../musicRoom/Session'
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {bg} from '../../assets/background.jpeg';
import './styles.css';


const Home = (props) => {

  const onPublicBtnClick = (e) => {
    e.preventDefault();
  }


    const {chats} = props;

  return (
    <div className='home' >
    <Flex w='100%' h='100%' >
      <Box w='50%' h='100%'>
       <Heading className='musicHeading' fontSize='9xl' >Music</Heading>
       <Text color='white' marginLeft='5%' fontSize='2xl'>IS THE UNIVERSAL LANGUAGE OF MANKIND</Text>
      </Box>
      <Flex justifyContent='center' alignItems='center' w='50%' h='100%'> 
        <Flex h='40%' w='45%' flexDirection='column' justifyContent='space-around' alignItems='center' bg='rgba(180,175,173,0.5)' p={3} borderRadius='30px'>
          <Heading fontSize='xl' color='white'>CREATE A SESSION</Heading>
          <a href='http://localhost:4000/login' style={{width:'50%', height:'20%',}}>
            <Button bg='orange' color='white' size='md' w='100%'h='100%' fontSize='lg' borderRadius='30px' >
              Public
            </Button>
          </a>
          <NavLink to='/login' style={{width:'50%', height:'20%'}}>
            <Button bg='orange' color='white' size='md' w='100%'h='100%'fontSize='lg'borderRadius='30px' >
              Private
            </Button>
          </NavLink>
        </Flex>
      </Flex>
    </Flex>
  </div>
  )
}

export default Home