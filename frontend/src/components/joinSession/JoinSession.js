import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import { SessionState } from '../../context/SessionProvider';
import Sessions from '../musicRoom/Sessions'


const getParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");

  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramsSplitUp;
};

const JoinSession = () => {

  const { setToken, setData, token, setPrivacy, sessionName, setSessionName } = SessionState();

  const spotifyApi = new SpotifyWebApi({
    client_id: "40e0e3786cb34441b74263af7dcb1200",
    redirect_uri: "http://localhost:3000/join",
  });

  spotifyApi.setAccessToken(token);

  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getParamsFromSpotifyAuth(
        window.location.hash
      );

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);

      setToken(localStorage.getItem("accessToken"));
    } else {
      toast({
        title: "Sign in to Spotify to use this service",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      history.push('/')
    }

    // Get the authenticated user
    spotifyApi.getMe().then(
      (data) => {
        setData(data.body);
      },
      (err) => {
        console.log("Something went wrong!", err);
      }
    );
  });


  return (
    <div>
        <Sessions/>
    </div>
  )
}

export default JoinSession