import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SingleSession from "../sessions/SingleSession";
import ChatLoading from "../chat/ChatLoading";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const history = useHistory()

  useEffect(() => {
    fetchAllSessions();
  },[]);

  const fetchAllSessions = async () => {
    try {
      let { data } = await axios.get("http://localhost:4000/api/session");
      setSessions(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleJoinClick = () => {
   
      history.push('/joinroom')
  
      // history.push('/join/login')
  
  }

  return (
    <Box>
      <Heading
        fontSize="2rem"
        p="0.4rem"
        bg="gray.500"
        textAlign="center"
        color="white"
      >
        Active Sessions
      </Heading>
      <Box overflowY="scroll" h="93vh" w="100%">
        <Flex
          flexDirection="column"
          alignItems="center"
          w="70%"
          h="100%"
          margin="0 auto"
        >
          {sessions ? (
            sessions.map((session) => {
              return <SingleSession session={session} key={session._id} handleJoinClick={handleJoinClick}/>;
            })
          ) : (
            <ChatLoading />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Sessions;
