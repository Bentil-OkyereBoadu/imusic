import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocalStorage } from '../../useLocalStorage';

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const Playlist = () => {

  const [token, setToken] = useState("")
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
        Authorization: "Bearer "+ "BQDAypBUGtX_0IyhZIxaRxb2YcgsZ7d4OxWmD5MBMTPHswDTcNNfabTfq2ET363KwmgNZRjnZ0cmg6J6QZZuVfwi5bDQViSG1zOD-jmt0wg1dFrGfpfTh1FbzQChfGINrzjW5chMQFVo04e2iY5IREpVtP_MMvOT9aZbUUi9CsStriB7m7ASN5jP",
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
 
  return (
    <Box>
        <Text>Playlist</Text>
        <Text></Text>
    </Box>
  )
}

export default Playlist