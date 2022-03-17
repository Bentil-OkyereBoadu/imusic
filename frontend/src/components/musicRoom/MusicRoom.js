import { Grid, GridItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Chat from '../chat/Chat';
import Session from './Session';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Playlist from './Playlist'; 

const USER_ENDPOINT = "https://api.spotify.com/v1/me";

const MusicRoom = () => {
  const [token, setToken] = useState('');
  const [data, setData] = useState({});

  useEffect(()=> {
    if (localStorage.getItem("accessToken")){
      setToken(localStorage.getItem("accessToken"))
    }

    handleGetUser()
  },[])

  const handleGetUser= () =>{
    axios.get(USER_ENDPOINT,{
      headers:{
        Authorization: "Bearer "+"BQDAypBUGtX_0IyhZIxaRxb2YcgsZ7d4OxWmD5MBMTPHswDTcNNfabTfq2ET363KwmgNZRjnZ0cmg6J6QZZuVfwi5bDQViSG1zOD-jmt0wg1dFrGfpfTh1FbzQChfGINrzjW5chMQFVo04e2iY5IREpVtP_MMvOT9aZbUUi9CsStriB7m7ASN5jP"
      }
    }).then((response) => {
      setData(response.data)
    })
    .catch( error => {
      console.log(error);
    })
  }
  
  console.log(data.display_name)
  return (
  <> 
    <Header data = {data}/>
    <Grid templateColumns='1fr 2fr 3fr' gap={2} w='100%' h='80%'>
      <GridItem w='100%' h='100%' bg='blue.500'>
        <Session/>
      </GridItem>
      <GridItem w='100%' h='100%' bg='blue.300'>
        <Playlist/>
      </GridItem>
      <GridItem w='100%' h='100%' bg='blue.100'>
        <Chat/>
      </GridItem> 
    </Grid>
    <Footer/>
  </>
  )
}

export default MusicRoom