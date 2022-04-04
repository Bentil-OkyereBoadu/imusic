import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Track = ({ track, addTrack, removeTrack, isRemoval }) => {
 
  const renderAction = () => {
   
    if (isRemoval) {
      return (
        <Button colorScheme="orange" onClick={remove}>
          -
        </Button>
      );
    } else {
      return (
        <Button colorScheme="orange" onClick={add}>
          +
        </Button>
      );
    }
  };

  const add = () => {
    addTrack(track);
  };

  const remove = () => {
    removeTrack(track);
  };


  return (
    <Box w="70%" margin="0.3em 0em" boxShadow='8px 5px 8px 0px rgba(0,0,0,0.35)'>
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
          <Heading>{track.name}</Heading>
          <Text>Artist: {track.artists[0].name}</Text>
          <Text>Album: {track.album.name}</Text>
        </Flex>

        <Flex>
          {renderAction()}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Track;
