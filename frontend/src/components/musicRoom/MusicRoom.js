import { Box, Grid, GridItem, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Session from './Session';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Playlist from './Playlist'; 
import ChatPage from '../chat/ChatPage';


const USER_ENDPOINT = "https://api.spotify.com/v1/me";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

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

const MusicRoom = () => {
  const toast = useToast();
  const [token, setToken] = useState('');
  const [data, setData] = useState();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [state, setState]= useState({
    playlistTracks: [],
    playlistName: 'New PLaylist',
    searchResults: [],
    privatePlaylist: false,
  });

  if(!user){
   window.location = ('/');
  }  

  useEffect(()=> {
    if(user){ 
    if(window.location.hash){
      const {access_token, expires_in, token_type} = getParamsFromSpotifyAuth(window.location.hash);
     
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn",  expires_in);
    }
    
    setToken(localStorage.getItem('accessToken'))
    }
  },[]);

  useEffect(() =>{
    handleGetUser();
  },[]);


  const handleGetUser = async () =>{

    try{
      const {data} = await axios.get(USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setData(data);

    } catch (error){
      console.log('Couldnt get user');
      console.log(error.message);
    }
  }

  const findUserId = async () => {
    let userId;
    const { data} = await axios.get(USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    userId = data.id;
    return userId;
  }

  const handleGetPlaylists = async () => {
    await axios.get(PLAYLISTS_ENDPOINT, {
      headers: {
        Authorization: "Bearer "+ token,
      }
    }).then((response) => {
      setState({ playlistTracks : response.data.items});
    }).catch(error => {
      console.log(error);
    })
  }

  const updatePlaylistName = (name) => {
    setState({playlistName: name});
  }

  const clearPlaylist = () => {
    setState({
      playlistTracks: [],
      playlistName: '',
    })
  }

  const savePlaylistToSpotify = async (name, trackURIs) => {
    if(!token){
      setToken(localStorage.getItem("accessToken"))
    }
  
    if( !name || !trackURIs){
      return;
    } else {

      try{
      let userId = await findUserId();
            let playlistID;
            await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
              },
              body: JSON.stringify({name: name})
            }).then( res => res.json())
        .then( playlist => {
          playlistID = playlist.id;
          addTracksToSpotify(playlistID, trackURIs, userId);
          toast({
            title: 'Playlist saved',
            status: 'Success',
            duration: 2000,
            isClosable: true,
            position: 'top',
          });
        })

      } catch(error){
        toast({
               title: 'Error occured',
               description: 'Playlist was unable to save',
               status: 'error',
               duration: 2000,
               isClosable: true,
               position: 'top',
               });
          
      }
    }
  
  }

  const addTracksToSpotify = async (playlistID, trackURIs, userId) => {
    await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
    {
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({uris: trackURIs})
    });
    }

  const savePlaylist = () => {
    let trackURIs = state.playlistTracks.map( track => track.uri);
    savePlaylistToSpotify(state.playlistName, trackURIs, state.privatePlaylist).then(() => clearPlaylist());
    }

  const addTrack = (track) => {
      let tracks = state.playlistTracks;
      if(tracks.find(savedTrack => savedTrack.id == track.id)){
        return;
      }
      tracks.push(track);
      setState({playlistTracks: tracks});
  }

  const removeTrack = (track) => {
    let tracks = state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    setState({playlistTracks: tracks});
  }
  
  return (
  <Box overflowY='hidden' overflowX='hidden' position='fixed' w='100%'> 
    <Header user = {user}/>
    <Grid templateColumns='1fr 2fr 1fr' gap={2} w='100%' h='80%'>
      <GridItem w='100%' h='100%' bg='blue.500'>
        <Session/>
      </GridItem>
      <GridItem w='100%' h='80%' bg='blue.300'>
        <Playlist 
          savePlaylist={savePlaylist} 
          addTrack={addTrack}
          removeTrack ={removeTrack}
          updateName = {updatePlaylistName}
          tracks={state.playlistTracks}/>
      </GridItem>
      <GridItem w='100%' h='100%' bg='blue.100'>
        <ChatPage/>
      </GridItem> 
    </Grid>
    <Footer/>
  </Box>
  )
}

export default MusicRoom