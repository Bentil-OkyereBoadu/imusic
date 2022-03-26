import {  Box, Button, Flex, Heading, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import TrackList from './TrackList';
import SearchBar from './SearchBar';

const Playlist = ({tracks, savePlaylist, removeTrack, addTrack, updateName}) => {

  const [token, setToken] = useState('');

  useEffect(()=> {
    if(localStorage.getItem("accessToken")){
      setToken(localStorage.getItem("accessToken"));
    }
  }, [])



  return (
    <Flex flexDirection='column' alignItems='center' >
        <Heading>Create a Playlist</Heading>
        <SearchBar 
            token={token}
            removeTrack={removeTrack}
            addTrack = {addTrack} />
        <Flex justifyContent='space-around' w='100%' margin='1em'>
          <Input w='40%' bg='' placeholder='Playlist name' onChange={(e) => updateName(e.target.value)} />
          <Button onClick={savePlaylist}>Save playlist</Button>
        </Flex>
        <Box h='55vh' w='100%'>
          <TrackList tracks={tracks}
                    isRemoval={true}
                    removeTrack={removeTrack}
                    addTrack = {addTrack}/>
        </Box>
        
    </Flex>
  )
}

export default Playlist