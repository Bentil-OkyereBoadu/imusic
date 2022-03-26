import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import Header from './Header';
import Footer from './Footer';
import Playlist from './Playlist'; 
import ChatPage from '../chat/ChatPage';
import Sessions from './Sessions';
import { SessionState } from '../../context/SessionProvider';
import { useHistory } from 'react-router-dom';



const MusicRoom = () => {

  const history = useHistory();
  const  { token } = SessionState(); 

  if (!token) {
    history.push('/')
  }
  
  return (
  <Box overflowY='hidden' overflowX='hidden' position='fixed' w='100%'> 
    <Header />
    <Grid templateColumns='1fr 2fr 1fr' w='100%' h='80vh'>
      <GridItem w='100%' h='100%' border='1px solid orange'>
        <Sessions/>
      </GridItem>
      <GridItem w='100%' h='100%' border='1px solid orange'>
        <Playlist />
      </GridItem>
      <GridItem w='100%' h='100%' border='1px solid orange'>
        <ChatPage/>
      </GridItem> 
    </Grid>
    <Footer/>
  </Box>
  )
}

export default MusicRoom