import { Box, Button, Flex, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import TrackList from "./TrackList";
import SearchBar from "./SearchBar";
import { SessionState } from "../../context/SessionProvider";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

export const spotifyApi = new SpotifyWebApi({
  client_id: "40e0e3786cb34441b74263af7dcb1200",
  redirect_uri: "https://imusique.netlify.app/session",
});

const Playlist = () => {
  const toast = useToast();
  const {
    token,
    setPlaylistTracks,
    setPlaylistID,
    playlistTracks,
    privacy,
    sessionName,
    setCreatedSessionId,
  } = SessionState();

  spotifyApi.setAccessToken(token);

  const [playlistName, setPlaylistName] = useState("");

  const session = {
    name: "",
    creator: "",
    playlist: [],
    activeUsers: [],
    isPrivate: false,
  };

  if (privacy === true) {
    session.creator = JSON.parse(localStorage.getItem("userInfo"));
  } else if (privacy === false) {
    session.creator = {
      _id: "624abaae0598f8505502e934",
      name: "guest",
      email: "guest@example.com",
    };
  }
  session.activeUsers[0] = session.creator;
  session.name = sessionName;
  session.playlist = playlistTracks;
  session.isPrivate = privacy;

  const saveSession = async () => {
    let name = session.name;
    let activeUsers = session.activeUsers;
    let playlist = session.playlist;
    let isPrivate = session.isPrivate;
    let creatorId = session.creator._id;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let { data } = await axios.post(
        "http://localhost:4000/api/session",
        { name, creatorId, playlist, activeUsers, isPrivate },
        config
      );
      if (data) {
        toast({
          title: "Session saved",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setCreatedSessionId(data._id);
      }
      

    } catch (error) {
      toast({
        title: "Unable to save session",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };

  const [state, setState] = useState({
    playlistTracks: [],
    searchResults: [],
    privatePlaylist: false,
  });

  const handlePlaylistName = (e) => {
    setPlaylistName(e.target.value);
  };

  //create a public playlist
  const addPlaylist = () => {
    let trackURIs = state.playlistTracks.map((track) => track.uri);
    spotifyApi
      .createPlaylist(playlistName, {
        description: "My description",
        public: true,
      })
      .then(function(data) {
        console.log("Created playlist!");
        setPlaylistID(data.body.id);
        return data.body.id;
      })
      .then((id) => {
        return spotifyApi.addTracksToPlaylist(id, trackURIs);
      })
      .then(function() {
        toast({
          title: "Added tracks to playlist!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        toast({
          title: "Could not add tracks",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        console.log(err);
      });
  };

  //add track to playlist
  const addTrack = (track) => {
    let tracks = state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    // setPlaylistTracks(tracks);
    setState({ playlistTracks: tracks });
    setPlaylistTracks(state.playlistTracks);
  };

  //remove track from playlist
  const removeTrack = (track) => {
    let tracks = state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    setState({ playlistTracks: tracks });
    setPlaylistTracks(state.playlistTracks);
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex
        justifyContent="center"
        alignContent="space-between"
        bg="gray.500"
        w="100%"
      >
        <Heading fontSize="2rem" p="0.4rem" color="white">
          Playlist
        </Heading>
        <SearchBar removeTrack={removeTrack} addTrack={addTrack} />
      </Flex>

      <Flex justifyContent="space-around" w="100%" margin="1em">
        <Input
          w="40%"
          placeholder="Playlist name"
          onChange={handlePlaylistName}
        />
        <Button onClick={addPlaylist} colorScheme="green">
          Save playlist to Spotify
        </Button>
        <Button onClick={saveSession} colorScheme="blue">
          Save playlist to Session
        </Button>
      </Flex>
      <Box h="60vh" w="100%">
        {state.playlistTracks && (
          <TrackList
            tracks={state.playlistTracks}
            isRemoval={true}
            removeTrack={removeTrack}
            addTrack={addTrack}
          />
        )}
      </Box>
    </Flex>
  );
};

export default Playlist;
