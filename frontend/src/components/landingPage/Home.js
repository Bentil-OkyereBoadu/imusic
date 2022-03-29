import { Box, Button, Flex, Heading, Img, Text } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

  // const client_id ="ddc7d259bece4112b9df90559ea0e4ff";
  const client_id ="40e0e3786cb34441b74263af7dcb1200";
  const redirect_uri = 'http://localhost:3000/session';

  const OAUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SCOPES = [ 
                  "user-read-currently-playing", 
                  "streaming" ,
                   "user-read-playback-state", 
                   "user-modify-playback-state",
                   "playlist-read-private", 
                   "user-read-email",
                   "user-read-private",
                   "playlist-modify-public",
                   "playlist-read-private",
                   "playlist-modify-private",
                   "app-remote-control"
                  ]
  const SPACE_DELIMITER = "%20";
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const Home = () => {

  const history = useHistory();

  const spotifyLogin = () => {
    window.location = `${OAUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  }

  const navigateToSessionPage = () => {
    history.push('/')
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
              <Button bg='orange' color='white' size='md' w='60%'h='25%'fontSize='lg'borderRadius='30px' onClick={spotifyLogin}>
              Create a session
              </Button>
              <Button bg='orange' color='white' size='md' w='60%'h='25%'fontSize='lg'borderRadius='30px' onClick={navigateToSessionPage}>
              Join a session
              </Button>   
        </Flex>
      </Flex>
    </Flex>
  </div>
  )
}

export default Home