import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BsPlayCircle, BsPauseCircle, BsChevronBarLeft, BsChevronBarRight, BsShare} from 'react-icons/bs'
import {IoPersonAddOutline} from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Flex backgroundColor='orange' bottom='0px' h='10%' w='100%' padding='20px' position='fixed'>
        <Flex justifyContent='center' w='30%'>
            <BsChevronBarLeft style={{width:25, height:25, cursor:'pointer', marginRight:'10px', color:'white'}}/>
            <BsPlayCircle style={{width:25, height:25, cursor:'pointer', marginRight:'10px', color:'white'}}/>
            <BsPauseCircle style={{width:25, height:25, cursor:'pointer', marginRight:'10px', color:'white'}}/>
            <BsChevronBarRight style={{width:25, height:25, cursor:'pointer', color:'white'}}/>
        </Flex>
        <Flex w='30%'><Text  color='white'>Now Playing: Track name</Text></Flex>
        <Flex w='30%' justifyContent='space-around'>
            <Button leftIcon={<BsShare/>} colorScheme='blue'>Share</Button>
            <Button rightIcon={<IoPersonAddOutline/>} colorScheme='blue' color='white'>Invite friends</Button>
            <NavLink to='/'><Button colorScheme='red' color='white'>End Session</Button></NavLink>
        </Flex>
    </Flex>
  )
}

export default Footer