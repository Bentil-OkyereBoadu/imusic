import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Track = ({ track }) => {
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
      </Flex>
    </Box>
  );
};

export default Track;
