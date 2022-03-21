import {  Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TrackList from './TrackList';
import SearchBar from './SearchBar';

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const Playlist = (props) => {

  const [token, setToken] = useState('');
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(()=> {
    if(localStorage.getItem("accessToken")){
      setToken(localStorage.getItem("accessToken"));
    }
  }, [])
  
  const handleGetPlaylists = () => {
    axios.get(PLAYLISTS_ENDPOINT, {
      headers: {
        Authorization: "Bearer "+ token,
      }
    }).then((response) => {
      setPlaylistData(response.data.items);
    }).catch(error => {
      console.log(error);
    })
  }

  console.log(playlistData)


  const {playlistTracks, onRemove, onAdd} = props;

  return (
    <Flex flexDirection='column' alignItems='center'>
        <Heading>Create a Playlist</Heading>
        <SearchBar token={token}/>
        <Flex justifyContent='space-around' w='100%' margin='1em'>
          <Input w='40%' bg='' placeholder='Playlist name'  />
          {/* <Text>{playlistName}</Text> */}
          <Button onClick={handleGetPlaylists}>SAVE TO SPOTIFY</Button>
        </Flex>
        <Flex>
          { playlistData? playlistData.map((playlist) => {
            return <Text key={playlist.id}> {playlist.name} <a href={playlist.href}>Open</a> ||</Text>
          }): <Heading>Playlist will show here</Heading>}
        </Flex>
        <TrackList tracks={playlistTracks}
                    isRemoval={true}
                    onRemove={onRemove}
                    onAdd = {onAdd}/>
    </Flex>
  )
}

export default Playlist