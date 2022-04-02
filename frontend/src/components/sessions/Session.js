import { Button, Flex, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SessionState } from "../../context/SessionProvider";
import { spotifyApi } from "../musicRoom/Playlist";

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

const Session = () => {
  const { setToken, setData, token, setPrivacy, sessionName, setSessionName } = SessionState();

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
      window.location = "/";
      toast({
        title: "Sign in to Spotify to use this service",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
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

 

  const onPublicClick = () => {
    if(!sessionName){
       toast({
        title: "Add Session name to proceed",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      }) 
    } else{
      history.push('/publicmusic')
    }
    
  }

  const onPrivateClick = () => {
    setPrivacy(true);
    if(!sessionName){
      toast({
        title: "Add Session name to proceed",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
    } else {
      history.push('/login')
    }
  }

  return (
    <div className="home">
      <Flex w="100%" h="100%" justifyContent="center">
        <Flex
          w="30%"
          h="50vh"
          marginTop="10%"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          bg="rgba(180,175,173,0.6)"
          p={3}
          borderRadius="30px"
        >
          <Heading fontSize="xl" color="black">
            CREATE A SESSION
          </Heading>
          <Input
            placeholder="Session name"
            variant="flushed"
            w="70%"
            color="white"
            _placeholder={{ color: "white" }}
            onChange={(e) => setSessionName(e.target.value) }
          ></Input>
            <Button
              bg="orange"
              color="white"
              size="md"
              fontSize="lg"
              borderRadius="30px"
              width='50%'
              height='20%'
              onClick={onPublicClick}
            >
              Public
            </Button>
            <Button
              bg="orange"
              color="white"
              size="md"
              fontSize="lg"
              borderRadius="30px"
              width='50%'
              height='20%'
              onClick={onPrivateClick}
            >
              Private
            </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Session;
