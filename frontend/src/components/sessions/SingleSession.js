import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
import moment from "moment";

const SingleSession = ({ session, handleJoinClick }) => {

  return (
    <Box
      w="100%"
      margin="0.3em 0em"
      boxShadow="8px 5px 8px 0px rgba(0,0,0,0.35)"
    >
      <Flex
        flexDirection="row"
        bg="white"
        justifyContent="space-around"
        p="1em"
        borderRadius="0.7em"
        w="100%"
        border="2px solid orange"
        alignItems="center"
      >
        <Flex flexDirection="column" color="orange">
          <Heading fontSize="1.5em">{session.name}</Heading>
          <Text color="black">
            Created: {moment(session.createdAt, "YYYYMMDD").fromNow()}
          </Text>
        </Flex>
        <Flex>
          <Text color="black" bgColor="orange.100" p="0.8em" borderRadius="40%">
            {session.isPrivate ? "Private" : "Public"}
          </Text>
        </Flex>
        <Flex>
          <Button
          rightIcon={<FaPlay />}
          colorScheme="orange"
          onClick={handleJoinClick}
          >
            Join
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SingleSession;
