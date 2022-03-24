import {  Button, Flex, Heading, Input } from '@chakra-ui/react'
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


  const playlistName = (e) => {
    let name = e.target.value
    updateName(name)
  }

  return (
    <Flex flexDirection='column' alignItems='center' h="100vh">
        <Heading>Create a Playlist</Heading>
        <SearchBar 
            token={token}
            removeTrack={removeTrack}
            addTrack = {addTrack} />
        <Flex justifyContent='space-around' w='100%' margin='1em'>
          <Input w='40%' bg='' placeholder='Playlist name' onChange={playlistName} />
          <Button onClick={savePlaylist}>Save playlist</Button>
        </Flex>
        <TrackList tracks={tracks}
                    isRemoval={true}
                    removeTrack={removeTrack}
                    addTrack = {addTrack}/>
    </Flex>
  )
}

export default Playlist