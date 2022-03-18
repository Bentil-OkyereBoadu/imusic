import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const Track = (props) => {

  const {track, onAdd, isRemoval, onRemove} = props;
    const renderAction = () =>{
      if(isRemoval){
        return <Button colorScheme='blue' onClick={removeTrack}>+</Button>
      } else {
        return <Button colorScheme='blue' onClick={addTrack}>-</Button>
      }
    }

    const addTrack = () => {
      onAdd(track);
    }
    
    const removeTrack =() => {
      onRemove(track);
    }

  return (
    <Box w='70%' margin='0.3em 0em'>
        <Flex bg='orange.100' justifyContent='space-around'p='1em' borderRadius='0.7em'>
            <Text>Track name</Text>
            <Text>Artist name || Album</Text>
            {renderAction()}
        </Flex>
    </Box>
  )
}

export default Track