import React from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import TrackList from "./TrackList";
import Sessions from "../musicRoom/Sessions";
import JoinHeader from "./JoinHeader";
import JoinFooter from "./JoinFooter";

const JoinRoom = () => {
  let tracks = [];
  return (
    <Box overflowY="hidden" overflowX="hidden" position="fixed" w="100%">
      <JoinHeader />
      <Grid templateColumns="1fr 1fr 1fr" w="100%" h="80vh">
        <GridItem w="100%" h="100%" border="1px solid orange">
          <Sessions />
        </GridItem>
        <GridItem w="100%" h="100%" border="1px solid orange">
          <TrackList tracks={tracks} />
        </GridItem>
        <GridItem w="100%" h="100%" border="1px solid orange"></GridItem>
      </Grid>
      <JoinFooter />
    </Box>
  );
};

export default JoinRoom;
