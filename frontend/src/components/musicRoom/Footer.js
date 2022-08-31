import { Box, Button, Flex, HStack, useToast } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { BsShare } from "react-icons/bs";
import { SessionState } from "../../context/SessionProvider";
import SpotifyApi from "../../services/SpotifyApi";
import SpotifyPlayer from "react-spotify-web-playback";
import { FaCopy, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Simplesharer } from "simple-sharer";
import axios from "axios";
import Api from "../../services/api";

const Footer = () => {
  const {
    token,
    playlistTracks,
    createdSessionId,
    sessionName,
  } = SessionState();

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  let trackURIs = playlistTracks.map((track) => track.uri);
  SpotifyApi.setAccessToken(token);

  // Get Information About The User's Current Playback State
  SpotifyApi.getMyCurrentPlaybackState().then(
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

  const endSession =async () => {
   
    try{
      setLoading(true);
      let {data} = await Api().post(`/api/session/${createdSessionId}/endSession`)
      if(data === 'session ended'){
        localStorage.clear();
        setLoading(false);
        toast({
          title: "Session Ended",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        })
        window.location = '/';
      }
    } catch(error){
      toast({
        title: "Session not ended",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      console.log(error);
    }
  }

  //creating instance of sharer with parameters to display when share buttons are clicked.
  const sharing = new Simplesharer();
  sharing.url = `https://imusic-three.vercel.app/api/session/${createdSessionId}/join`;
  sharing.title = `Join ${sessionName} now and enjoy some good music`;
  sharing.text = `Join ${sessionName} now and enjoy some good music`;


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
      <Box w="10%" h="100%"></Box>
      <Flex
        w="40%"
        justifyContent="space-evenly"
        alignContent="space-between"
        alignItems="center"
        p={1}
      >
        <HStack>
          <Button
            colorScheme="facebook"
            leftIcon={<BsShare />}
            rightIcon={<FaFacebook />}
            onClick={() => sharing.share("Facebook")}
          ></Button>
          <Button
            colorScheme="twitter"
            rightIcon={<FaTwitter />}
            leftIcon={<BsShare />}
            onClick={() => sharing.twitter()}
          ></Button>
          <Button
            rightIcon={<FaWhatsapp />}
            leftIcon={<BsShare />}
            colorScheme="whatsapp"
            onClick={() => sharing.whatsapp()}
          ></Button>
          <Button onClick={() => sharing.copy()} leftIcon={<FaCopy />}>
            Copy link
          </Button>
        </HStack>
          <Button colorScheme="red" color="white" onClick={endSession} isLoading={loading}>
            End Session
          </Button>
      </Flex>
    </Flex>
  );
};

export default Footer;
