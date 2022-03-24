import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Track = ({track, onAdd, isRemoval, onRemove}) => {

  
    const renderAction = () =>{
      if(isRemoval){
        return <Button colorScheme='blue' onClick={removeTrack}>-</Button>
      } else {
        return <Button colorScheme='blue' onClick={addTrack}>+</Button>
      }
    }

    const addTrack = () => {
      onAdd(track);
    }
    
    const removeTrack = () => {
      onRemove(track);
    }

  return (
    <Box w='70%' margin='0.3em 0em'>
        <Flex bg='orange.100' justifyContent='space-around'p='1em' borderRadius='0.7em'>
            <Text>{track.name}</Text>
            <Text>{track.artist} || {track.album.name}</Text>
            {renderAction()}
        </Flex>
    </Box>
  )
}

export default Track