import { Flex } from "@chakra-ui/react";
import React from "react";
import Track from "./Track";

const TrackList = ({ tracks }) => {
  return (
    <Flex
      flexDirection="column"
      h="100%"
      w="100%"
      alignItems="center"
      overflowY="scroll"
      overflowX="hidden"
    >
      {tracks.map((track) => {
        return <Track track={track} key={track.id} />;
      })}
    </Flex>
  );
};

export default TrackList;
