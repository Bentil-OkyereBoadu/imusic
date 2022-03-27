import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Playlist from './Playlist'
import Sessions from './Sessions'


const PublicMusicRoom = () => {
    
  return (
    <Box overflowY='hidden' overflowX='hidden' position='fixed' w='100%'> 
    <Header/>
    <Grid templateColumns='1fr 2fr' gap={2} w='100%' h='80%'>
      <GridItem w='100%' h='100%' bg='white' border='1px solid orange'>
        <Sessions/>
      </GridItem>
      <GridItem w='100%' h='100%' bg='white' border='1px solid orange'>
        <Playlist />
      </GridItem>
    </Grid>
    <Footer/>
  </Box>
  )
}

export default PublicMusicRoom