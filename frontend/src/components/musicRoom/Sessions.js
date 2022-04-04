import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SingleSession from "../sessions/SingleSession";
import ChatLoading from "../chat/ChatLoading";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SessionState } from "../../context/SessionProvider";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const history = useHistory()
  const { setSelectedSession } = SessionState();
  
  const reversedArr = sessions.reverse();

  useEffect(() => {
    fetchAllSessions();
  },[]);

  const fetchAllSessions = async () => {
    try {
      let { data } = await axios.get("http://localhost:4000/api/session");
      setSessions(data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleJoinClick = (session) => {
    setSelectedSession(session);
    if( session._isPrivate === false){
      let guest = {
        _id: "624abaae0598f8505502e934",
        name: "guest",
        email: "guest@example.com",
      };
  
      localStorage.setItem('userInfo', JSON.stringify(guest));
    }
      history.push('/joinroom')
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
          {reversedArr ? (
            reversedArr.map((session) => {
              return <SingleSession session={session} key={session._id} handleJoinClick={(e) =>handleJoinClick(session)}/>;
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
