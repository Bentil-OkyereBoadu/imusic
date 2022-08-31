import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import SpotifyApi from '../../services/SpotifyApi';
import { SessionState } from '../../context/SessionProvider';
import Sessions from '../musicRoom/Sessions'
import getParamsFromSpotifyAuth from '../../utils/GetParamsFromSpotifyAuth';

const JoinSession = () => {

  const { setToken, setData, token } = SessionState();

  SpotifyApi.setAccessToken(token);

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
    SpotifyApi.getMe().then(
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