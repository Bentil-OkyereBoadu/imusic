import {  Box, Button, Flex, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import TrackList from './TrackList';
import SearchBar from './SearchBar';
import { SessionState } from '../../context/SessionProvider';
import axios from 'axios';

const USER_ENDPOINT = "https://api.spotify.com/v1/me";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";


const Playlist = () => {
  const toast = useToast();
  const {token} = SessionState();
 

  
  const [state, setState]= useState({
    playlistTracks: [],
    playlistName: '',
    searchResults: [],
    privatePlaylist: false,
  });

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

  const handlePlaylistName = (e) => {
    setState({playlistName: e.target.value});
  }

  const clearPlaylist = () => {
    setState({
      playlistTracks: [],
      playlistName: '',
    })
  }

  const savePlaylistToSpotify = async (name, trackURIs) => {
  
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
    savePlaylistToSpotify(state.playlistName, trackURIs).then(() => clearPlaylist());
    }

  const addTrack = (track) => {
      let tracks = state.playlistTracks;
      if(tracks.find(savedTrack => savedTrack.id === track.id)){
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
    <Flex flexDirection='column' alignItems='center' >
        <Heading fontSize='2rem' p='0.4rem' bg='gray.300' color='white'>Playlist</Heading>
        <SearchBar 
            token={token}
            removeTrack={removeTrack}
            addTrack = {addTrack} />
        <Flex justifyContent='space-around' w='100%' margin='1em'>
          <Input w='40%' placeholder='Playlist name'  onChange={handlePlaylistName} />
          <Button onClick={savePlaylist}>Save playlist</Button>
        </Flex>
        <Box h='55vh' w='100%'>
          <TrackList tracks={state.playlistTracks}
                    isRemoval={true}
                    removeTrack={removeTrack}
                    addTrack = {addTrack}/>
        </Box>
        
    </Flex>
  )
}

export default Playlist