import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { BsShare } from "react-icons/bs";
import { IoPersonAddOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { SessionState } from "../../context/SessionProvider";
import { spotifyApi } from "./Playlist";
import SpotifyPlayer from "react-spotify-web-playback";

const Footer = () => {
  const { token, playlistTracks } = SessionState();
  let trackURIs = playlistTracks.map((track) => track.uri);
  spotifyApi.setAccessToken(token);


  // Get Information About The User's Current Playback State
  spotifyApi.getMyCurrentPlaybackState().then(
    function(data) {
      // Output items
      if (data.body && data.body.is_playing) {
        console.log("User is currently playing something!");
      } else {
        console.log("User is not playing anything, or doing so in private.");
      }
    },
    function(err) {
      console.log("Something went wrong!", err);
    }
  );

  const handleCallback = useCallback(({ type, ...state }) => {
    console.group(`RSWP: ${type}`);
    console.log(state);
    console.groupEnd();

  }, []);

  return (
    <Flex
      backgroundColor="#ffa500"
      bottom="0px"
      h="10%"
      w="100%"
      position="fixed"
      alignContent="space-between"
      justifyContent="center"
    >
      {trackURIs && (
        <Box width="50%" height="100%">
          <SpotifyPlayer
            token={token}
            uris={trackURIs}
            autoPlay={true}
            callback={handleCallback}
            styles={{
              activeColor: "#fff",
              bgColor: "#ffa500",
              color: "#fff",
              loaderColor: "#fff",
              sliderColor: "#1cb954",
              trackArtistColor: "#000",
              trackNameColor: "#fff",
            }}
            magnifySliderOnHover={true}
            play={true}
          />
        </Box>
      )}
      <Box w="20%" h="100%"></Box>
      <Flex
        w="30%"
        justifyContent="space-evenly"
        alignContent="space-between"
        alignItems="center"
        p={1}
      >
        <Button leftIcon={<BsShare />} colorScheme="blue">
          Share
        </Button>
        <Button
          rightIcon={<IoPersonAddOutline />}
          colorScheme="blue"
          color="white"
        >
          Invite friends
        </Button>
        <NavLink to="/">
          <Button colorScheme="red" color="white">
            End Session
          </Button>
        </NavLink>
      </Flex>
    </Flex>
  );
};

export default Footer;
