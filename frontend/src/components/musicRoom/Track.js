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

  // const displayPlayButton = () => {
  //     let uri = `https://open.spotify.com/embed?uri=${track.uri}`;
  //     return <Box>
  //               <iframe src={uri} width="80%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="Song"></iframe>
  //     </Box>
  // }

  return (
    <Box w="70%" margin="0.3em 0em">
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
          {/* {displayPlayButton()} */}
          {renderAction()}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Track;
