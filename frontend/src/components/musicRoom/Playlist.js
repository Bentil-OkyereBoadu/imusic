import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TrackList from './TrackList';
import SearchBar from './SearchBar';

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const Playlist = (props) => {

  const [token, setToken] = useState("BQDAypBUGtX_0IyhZIxaRxb2YcgsZ7d4OxWmD5MBMTPHswDTcNNfabTfq2ET363KwmgNZRjnZ0cmg6J6QZZuVfwi5bDQViSG1zOD-jmt0wg1dFrGfpfTh1FbzQChfGINrzjW5chMQFVo04e2iY5IREpVtP_MMvOT9aZbUUi9CsStriB7m7ASN5jP")
  const [data, setData] = useState({})

  useEffect(()=> {
    if(localStorage.getItem("accessToken")){
      setToken(localStorage.getItem("accessToken"));
    }

    handleGetPlaylists()
  }, [])

  const handleGetPlaylists = () => {
    axios.get(PLAYLISTS_ENDPOINT, {
      headers:{
        Authorization: "Bearer "+ token,
      }
    }).then((response) => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }
  // console.log(token);
  console.log(localStorage.getItem("expiresIn"));
  console.log(data)
 
  const [playlistName, setPlaylistName] = useState('')

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  }

  const {playlistTracks, onRemove, onAdd} = props;

  return (
    <Flex flexDirection='column' alignItems='center'>
        <Heading>Create a Playlist</Heading>
        <SearchBar/>
        <Flex justifyContent='space-around' w='100%' margin='1em'>
          <Input w='40%' bg='' placeholder='Playlist name' onChange={handleNameChange} />
          {/* <Text>{playlistName}</Text> */}
          <Button>SAVE TO SPOTIFY</Button>
        </Flex>
        <TrackList tracks={playlistTracks}
                    isRemoval={true}
                    onRemove={onRemove}
                    onAdd = {onAdd}/>
    </Flex>
  )
}

export default Playlist