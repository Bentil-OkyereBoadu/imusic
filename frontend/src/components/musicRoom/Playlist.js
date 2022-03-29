import { Box, Button, Flex, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import TrackList from "./TrackList";
import SearchBar from "./SearchBar";
import axios from "axios";
import { SessionState } from "../../context/SessionProvider";
import SpotifyWebApi from "spotify-web-api-node";

const USER_ENDPOINT = `https://api.spotify.com/v1/me`;
// eslint-disable-next-line
const PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/me/playlists`;

export const spotifyApi = new SpotifyWebApi({
  client_id: "40e0e3786cb34441b74263af7dcb1200",
  redirect_uri: "http://localhost:3000/session",
});

const Playlist = () => {
  const toast = useToast();
  const { token, data, playlistTracks, setPlaylistTracks } = SessionState();

  spotifyApi.setAccessToken(token);

  const [playlistName, setPlaylistName] = useState("");
  const [playlistPrivacy] = useState(false);
  const [playlistID, setPlaylistID] = useState();

  const state = {
    playlistName: playlistName,
    playlistTracks: playlistTracks,
    playlistPrivacy: playlistPrivacy,
  };

  // const [state, setState] = useState({
  //   playlistTracks: [],
  //   playlistName: '',
  //   searchResults: [],
  //   privatePlaylist: false,
  // });


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
       return spotifyApi.addTracksToPlaylist( id , trackURIs);
      })
      .then(
        function() {
          console.log("Added tracks to playlist!");
        })
      .catch( err => {
        console.log(err)
      })
  };

  const addTrack = (track) => {
    let tracks = state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    setPlaylistTracks(tracks);
  };

  const removeTrack = (track) => {
    let tracks = state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    setPlaylistTracks(tracks);
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
        <Button onClick={addPlaylist}>Save playlist</Button>
      </Flex>
      <Box h="60vh" w="100%">
        {playlistTracks && (
          <TrackList
            tracks={playlistTracks}
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
