import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Track = ({track, addTrack, removeTrack, isRemoval}) => {

  
    const renderAction = () =>{
      if(isRemoval){
        return <Button colorScheme='blue' onClick={remove}>-</Button>
      } else {
        return <Button colorScheme='blue' onClick={add}>+</Button>
      }
    }

    const add = () => {
      addTrack(track);
    }
    
    const remove = () => {
      removeTrack(track);
    }

  return (
    <Box w='70%' margin='0.3em 0em'>
        <Flex flexDirection='column' bg='orange.100' justifyContent='space-around'p='1em' borderRadius='0.7em' color='black' w='100%'>
            <Text>{track.name}</Text>
            <Text>{track.artists[0].name} || {track.album.name}</Text>
            {renderAction()}
        </Flex>
    </Box>
  )
}

export default Track