import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BsPlayCircle, BsPauseCircle, BsChevronBarLeft, BsChevronBarRight, BsShare} from 'react-icons/bs'
import {IoPersonAddOutline} from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Flex backgroundColor='gray.300' bottom='0px' h='10%' w='100%' padding='20px' position='fixed'>
        <Flex justifyContent='center' w='30%'>
            <BsChevronBarLeft style={{width:25, height:25, cursor:'pointer', marginRight:'10px'}}/>
            <BsPlayCircle style={{width:25, height:25, cursor:'pointer', marginRight:'10px'}}/>
            <BsPauseCircle style={{width:25, height:25, cursor:'pointer', marginRight:'10px'}}/>
            <BsChevronBarRight style={{width:25, height:25, cursor:'pointer'}}/>
        </Flex>
        <Flex w='30%'><Text>Now Playing: Track name</Text></Flex>
        <Flex w='30%' justifyContent='space-around'>
            <Button leftIcon={<BsShare/>} colorScheme='blue'>Share</Button>
            <Button rightIcon={<IoPersonAddOutline/>} colorScheme='blue'>Invite friends</Button>
            <NavLink to='/'><Button colorScheme='red'>End Session</Button></NavLink>
        </Flex>
    </Flex>
  )
}

export default Footer