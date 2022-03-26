import { Box, Grid, GridItem } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Playlist from './Playlist'
import Sessions from './Sessions'


const USER_ENDPOINT = "https://api.spotify.com/v1/me";

const getParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl =stringAfterHashtag.split("&");

  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    // console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramsSplitUp;  
}

const PublicMusicRoom = () => {

    const [token, setToken] = useState('');
  const [data, setData] = useState({});

  useEffect(()=> {

    if(window.location.hash){
      const {access_token, expires_in, token_type} = getParamsFromSpotifyAuth(window.location.hash);
      window.localStorage.clear()
      window.localStorage.setItem("accessToken", access_token);
      window.localStorage.setItem("tokenType", token_type);
      window.localStorage.setItem("expiresIn",  expires_in);
    }
    
    setToken(localStorage.getItem('accessToken'))
    handleGetUser()
  },[])


  const handleGetUser = () =>{
    axios.get(USER_ENDPOINT, {
      headers: {
        Authorization: "Bearer "+ token,
      }
    }).then((response) => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }
    
  return (
    <Box overflowY='hidden' overflowX='hidden' position='fixed' w='100%'> 
    <Header data = {data}/>
    <Grid templateColumns='1fr 2fr' gap={2} w='100%' h='80%'>
      <GridItem w='100%' h='100%' bg='blue.500'>
        <Sessions/>
      </GridItem>
      <GridItem w='100%' h='100%' bg='blue.300'>
        <Playlist />
      </GridItem>
    </Grid>
    <Footer/>
  </Box>
  )
}

export default PublicMusicRoom