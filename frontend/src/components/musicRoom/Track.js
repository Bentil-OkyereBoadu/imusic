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

    const displayPlayButton = () => {
        let uri = `https://open.spotify.com/embed?uri=${track.uri}`;
        return <Box> 
                  <iframe src={uri} width="80%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="Song"></iframe>
        </Box>
    }


  return (
    <Box w='70%' margin='0.3em 0em'>
        <Flex flexDirection='column' bg='orange.100' justifyContent='space-around'p='1em' borderRadius='0.7em' color='black' w='100%'>
            <Text>{track.name}</Text>
            <Text>{track.artists[0].name} || {track.album.name}</Text>
            <Flex>
              {/* {displayPlayButton()} */}
              {renderAction()}
            </Flex>
        </Flex>
    </Box>
  )
}

export default Track