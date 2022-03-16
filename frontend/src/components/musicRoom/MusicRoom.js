import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import Chat from '../chat/Chat';
import Session from './Session';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Playlist from './Playlist';

const MusicRoom = (props) => {
  const {chats} = props;



  return (
  <>
    <Header/>
    <Grid templateColumns='1fr 2fr 3fr' gap={2} w='100%' h='80%'>
      <GridItem w='100%' h='100%' bg='blue.500'>
        <Session/>
      </GridItem>
      <GridItem w='100%' h='100%' bg='blue.300'>
        <Playlist/>
      </GridItem>
      <GridItem w='100%' h='100%' bg='blue.100'>
        <Chat/>
      </GridItem> 
    </Grid>
    <Footer/>
  </>
  )
}

export default MusicRoom