import { Button, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsPlayCircle, BsPauseCircle, BsChevronBarLeft, BsChevronBarRight, BsShare} from 'react-icons/bs'
import {IoPersonAddOutline} from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { SessionState } from '../../context/SessionProvider';

const track = {
  name: "",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
}

const Footer = () => {

  const { token, playlistTracks } = SessionState();

  const [player, setPlayer] = useState();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState({...playlistTracks[0]});
  const [trackIndex, setTrackIndex] = useState(0)
  

  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
            name: 'iMusic Playback SDK',
            getOAuthToken: cb => { cb(token); },
            volume: 1
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });


        player.connect();

        player.addListener('player_state_changed', ( state => {

          if (!state) {
              return;
          }
      
          setTrack(state.track_window.current_track);
          setPaused(state.paused);
      
      
          player.getCurrentState().then( state => { 
              (!state)? setActive(false) : setActive(true) 
          });
      
      }));

    };
}, []);


const onPreviousButtonClick = () => {
  let currentTrackIndex = trackIndex
  let prevTrackIndex = currentTrackIndex - 1
  if(prevTrackIndex < 0){
      prevTrackIndex = playlistTracks.length - 1
  }
  setTrack(playlistTracks[prevTrackIndex])
  setTrackIndex(prevTrackIndex)
};

const onNextButtonClick = () => {
  let currentTrackIndex = trackIndex
  let nextTrackIndex = currentTrackIndex + 1
  if(nextTrackIndex > playlistTracks.length - 1){
      nextTrackIndex = 0
  }
  setTrack(playlistTracks[nextTrackIndex])
  setTrackIndex(nextTrackIndex)
};


  return (
    <Flex backgroundColor='#ffa500' bottom='0px' h='10%' w='100%' padding='20px' position='fixed'>
        <Flex justifyContent='center' w='30%'>
            <BsChevronBarLeft onClick={() => { player.previousTrack(); }} style={{width:25, height:25, cursor:'pointer', marginRight:'10px', color:'white'}}/>
            { is_paused? 
            (
              <BsPlayCircle onClick={() => { player.togglePlay() }} style={{width:25, height:25, cursor:'pointer', marginRight:'10px', color:'white'}}/>
            ) :
            (
              <BsPauseCircle style={{width:25, height:25, cursor:'pointer', marginRight:'10px', color:'white'}}/>
            )}
            <BsChevronBarRight onClick={() => { player.nextTrack(); }} style={{width:25, height:25, cursor:'pointer', color:'white'}}/>
        </Flex>
        <Flex w='30%' flexDir='column'>
          <Text  color='white'>Now Playing: {current_track.name}</Text>
          {/* <Text  color='white'>Artist: {current_track.artists[0].name}</Text> */}
        </Flex>
        <Flex w='30%' justifyContent='space-around'>
            <Button leftIcon={<BsShare/>} colorScheme='blue'>Share</Button>
            <Button rightIcon={<IoPersonAddOutline/>} colorScheme='blue' color='white'>Invite friends</Button>
            <NavLink to='/'><Button colorScheme='red' color='white'>End Session</Button></NavLink>
        </Flex>
    </Flex>
  )
}

export default Footer