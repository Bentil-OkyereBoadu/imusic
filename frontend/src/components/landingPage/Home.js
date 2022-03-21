import { Box, Button, Flex, Heading, Img, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import './styles.css';
import axios from 'axios' ;
import { NavLink } from 'react-router-dom';


  //getting client id and redirect uri from env
  // const client_secret = process.env.CLIENT_SECRET;
  const client_id ="ddc7d259bece4112b9df90559ea0e4ff";
  const redirect_uri = 'http://localhost:3000/music';

  const OAUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SCOPES = [ "user-read-currently-playing", 
                   "user-read-playback-state", 
                   "playlist-read-private", 
                   "user-read-currently-playing" ]
  const SPACE_DELIMITER = "%20";
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const getParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl =stringAfterHashtag.split("&");

    const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulator[key] = value;
      return accumulator;
    }, {});

    return paramsSplitUp;  
  }

const Home = () => {

  useEffect(() => {
    
  }, [])


  const handlePrivateLogin = () => {
    window.location = `${OAUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  }

  const handlePublicLogin = async () => {
    // const data = await axios.get('http://localhost:4000/auth')
    // console.log(data);
  }



  return (
    <div className='home' >
    <Flex w='100%' h='100%' >
      <Box w='50%' h='100%'>
        <Img marginLeft='5%' src={require('../../assets/logo.svg')}/>
       <Heading className='musicHeading' fontSize='9xl' >Music</Heading>
       <Text color='white' marginLeft='5%' fontSize='2xl'>IS THE UNIVERSAL LANGUAGE OF MANKIND</Text>
      </Box>
      <Flex justifyContent='center' alignItems='center' w='50%' h='100%'> 
        <Flex h='40%' w='45%' flexDirection='column' justifyContent='space-around' alignItems='center' bg='rgba(180,175,173,0.5)' p={3} borderRadius='30px'>
          <Heading fontSize='xl' color='white'>CREATE A SESSION</Heading>
           <Button bg='orange' color='white' size='md' w='50%'h='20%' fontSize='lg' borderRadius='30px' onClick={handlePublicLogin} >
              Public
            </Button>         
            <NavLink to='/login'>
              <Button bg='orange' color='white' size='md' w='50%'h='20%'fontSize='lg'borderRadius='30px'>
              Private
              </Button>
            </NavLink>
            
        </Flex>
      </Flex>
    </Flex>
  </div>
  )
}

export default Home