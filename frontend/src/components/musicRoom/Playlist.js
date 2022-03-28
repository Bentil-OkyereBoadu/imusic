import {  Box, Button, Flex, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import TrackList from './TrackList';
import SearchBar from './SearchBar';
import axios from 'axios';
import { SessionState } from '../../context/SessionProvider';

const USER_ENDPOINT = `https://api.spotify.com/v1/me`;
const PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/me/playlists`

const Playlist = () => {
  const toast = useToast();
  const {token, data, playlistTracks, setPlaylistTracks} = SessionState();
 

  const [playlistName, setPlaylistName] = useState('')
  const [playlistPrivacy, setPlaylistPrivacy] = useState(false)


  const state = {
    playlistName: playlistName,
    playlistTracks: playlistTracks,
    playlistPrivacy: playlistPrivacy,
  }

  

  
  // const [state, setState] = useState({
  //   playlistTracks: [],
  //   playlistName: '',
  //   searchResults: [],
  //   privatePlaylist: false,
  // });

  const findUserId = async () => {
    let userId;
    const { data } = await axios.get(USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
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
      setPlaylistTracks(response.data.items);
    }).catch(error => {
      console.log(error);
    })
  }

  const handlePlaylistName = (e) => {
    e.preventDefault();
    setPlaylistName(e.target.value);
  }

  // const clearPlaylist = () => {
  //   state({
  //     playlistTracks: [],
  //     playlistName: '',
  //   })
  // }

  const savePlaylistToSpotify = async (name, trackURIs) => {
      let userId;
    if( !name || !trackURIs){
      return;
    } 
    else {

      data? userId = data.id : userId = await findUserId();
      // let access_token = JSON.parse(localStorage.getItem('accessToken'));
      
      try{
        const { data } = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": 'application/json',
              },
              body: JSON.stringify({name: name})
            })
          let playlistID = data.id;
          let addTracks = addTracksToSpotify(playlistID, trackURIs, userId);
          if (addTracks){
            toast({
            title: 'Playlist saved',
            status: 'Success',
            duration: 2000,
            isClosable: true,
            position: 'top',
          });
          }
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
    try{
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
    {
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({uris: trackURIs})
    });
  } catch(error) {
  console.log('could not add tracks to spotify!!');
  console.log(error.message);
  }

  }

  const savePlaylist = () => {
    let trackURIs = state.playlistTracks.map( track => track.uri);
    savePlaylistToSpotify(state.playlistName, trackURIs)
    // .then(() => clearPlaylist());
    }
  

  const addTrack = (track) => {
      let tracks = state.playlistTracks;
      if(tracks.find(savedTrack => savedTrack.id === track.id)){
        return;
      }
      tracks.push(track);
      setPlaylistTracks(tracks);
  }

  const removeTrack = (track) => {
    let tracks = state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    setPlaylistTracks(tracks);
  }


  return (
    <Flex flexDirection='column' alignItems='center' >
      <Flex justifyContent='center' alignContent='space-between' bg='gray.500' w='100%'>
        <Heading fontSize='2rem' p='0.4rem'  color='white'>Playlist</Heading>
        <SearchBar 
            removeTrack={removeTrack}
            addTrack = {addTrack} />
      </Flex>
        
        <Flex justifyContent='space-around' w='100%' margin='1em'>
          <Input w='40%' placeholder='Playlist name'  onChange={handlePlaylistName} />
          <Button onClick={savePlaylist}>Save playlist</Button>
        </Flex>
        <Box h='60vh' w='100%'>
          <TrackList tracks={playlistTracks}
                    isRemoval={true}
                    removeTrack={removeTrack}
                    addTrack = {addTrack}/>
        </Box>
        
    </Flex>
  )
}

export default Playlist