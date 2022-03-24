import {  Box, Button, Flex, Heading, Input, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TrackList from './TrackList';
import SearchBar from './SearchBar';

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const USER_ENDPOINT = "https://api.spotify.com/v1/me";

const Playlist = (props) => {
  const toast = useToast();

  const [token, setToken] = useState('');
  const [state, setState]= useState({
    playlistTracks: [],
    playlistName: 'New PLaylist',
    searchResults: [],
    privatePlaylist: false,
  });

  useEffect(()=> {
    if(localStorage.getItem("accessToken")){
      setToken(localStorage.getItem("accessToken"));
    }
  }, [])

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

  const getPlaylistDetails = async () => {
    await axios.get(PLAYLISTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      setState({ playlistTracks : response.data.items})
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
    return
  } else {
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
          title: 'Error occured',
          description: 'Playlist successfully saved',
          status: 'Success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      }).catch(() => {
        toast({
          title: 'Error occured',
          description: 'Playlist was unable to save',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });

        })
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

  console.log(state.playlistTracks)


  const {playlistTracks, onRemove, onAdd } = props;

  return (
    <Flex flexDirection='column' alignItems='center' h="100vh">
        <Heading>Create a Playlist</Heading>
        <SearchBar token={token}/>
        <Flex justifyContent='space-around' w='100%' margin='1em'>
          <Input w='40%' bg='' placeholder='Playlist name'  />
          {/* <Text>{playlistName}</Text> */}
          <Button onClick={savePlaylist}>Save playlist</Button>
        </Flex>
        <Flex>
          { state.playlistTracks? state.playlistTracks.map((playlist) => {
            return <Text key={playlist.id} p='1em'> {playlist.name} <Button href={playlist.href}>Open</Button> ||</Text>
          }): <Heading>Playlist will show here</Heading>}
        </Flex>
        <TrackList tracks={state.playlistTracks}
                    isRemoval={true}
                    onRemove={onRemove}
                    onAdd = {onAdd}/>
    </Flex>
  )
}

export default Playlist