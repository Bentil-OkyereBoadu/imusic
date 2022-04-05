import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { BsShare } from "react-icons/bs";
import { SessionState } from "../../context/SessionProvider";
import { spotifyApi } from "../musicRoom/Playlist";
import SpotifyPlayer from "react-spotify-web-playback";
import { FaCopy, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Simplesharer } from "simple-sharer";

const JoinFooter = () => {
  const { token, selectedSession } = SessionState();
  let trackURIs = selectedSession.playlist.map((track) => track.uri);
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

  const sharing = new Simplesharer();
  sharing.url = `http://localhost:4000/api/session/${selectedSession._id}/join`;
  sharing.title = `Join ${selectedSession.name} now and enjoy some good music`;
  sharing.text = `Join ${selectedSession.name} now and enjoy some good music`;


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
        {/* <NavLink to="/">
          <Button colorScheme="red" color="white">
            End Session
          </Button>
        </NavLink> */}
      </Flex>
    </Flex>
  );
};

export default JoinFooter;
