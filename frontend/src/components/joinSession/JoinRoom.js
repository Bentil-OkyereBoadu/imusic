import React, { useEffect } from "react";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import TrackList from "./TrackList";
import Sessions from "../musicRoom/Sessions";
import JoinHeader from "./JoinHeader";
import JoinFooter from "./JoinFooter";
import { SessionState } from "../../context/SessionProvider";
import axios from "axios";
import ChatPage from "../chat/ChatPage";

const JoinRoom = () => {

  const { selectedSession } = SessionState();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  console.log(selectedSession);

  useEffect(() => {
    joinHandler();
  }, [])

  const joinHandler = async () => {
    let sessionId = selectedSession._id;
    let userId = user._id;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try{
      await axios.put(`http://localhost:4000/api/session/${sessionId}/join`, {userId}, config)
    }
    catch(error){
      console.log(error);
    }
    
  }

  let tracks = selectedSession.playlist;
  return (
    <Box overflowY="hidden" overflowX="hidden" position="fixed" w="100%">
      <JoinHeader />
      <Grid templateColumns="1fr 1fr 1fr" w="100%" h="80vh">
        <GridItem w="100%" h="100%" border="1px solid orange">
          <Sessions />
        </GridItem>
        <GridItem w="100%" h="100%" border="1px solid orange">
        <Heading fontSize="2rem" p="0.4rem" color="white" bg="gray.500" textAlign='center'>
          Playlist
        </Heading>
        <Box h="70vh" w="100%">
          <TrackList tracks={tracks} />
        </Box>
        </GridItem>
        <GridItem w="100%" h="100%" border="1px solid orange">
          <ChatPage/>
        </GridItem>
      </Grid>
      <JoinFooter />
    </Box>
  );
};

export default JoinRoom;
