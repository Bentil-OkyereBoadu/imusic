import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import Session from './Session'

const MusicRoom = (props) => {
  const {chats} = props;
  return (
  <Grid templateColumns='repeat(3, 1fr)' gap={2} w='100%' h='90%'>
    <GridItem w='100%' h='100%' bg='blue.500'>
      <Session chats = {chats}/>
    </GridItem>
    <GridItem w='100%' h='100%' bg='blue.300' />
    <GridItem w='100%' h='100%' bg='blue.100' />
  </Grid>
  )
}

export default MusicRoom