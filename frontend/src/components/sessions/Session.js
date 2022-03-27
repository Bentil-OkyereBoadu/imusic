import { Button, Flex, Heading, Input, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { SessionState } from '../../context/SessionProvider';


const getParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl =stringAfterHashtag.split("&");

  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramsSplitUp;  
}

const USER_ENDPOINT = "https://api.spotify.com/v1/me";


const Session = () => {

    const {setToken, setData, token} = SessionState();
  const toast = useToast();

    useEffect(()=> {   
      if(window.location.hash){
        const {access_token, expires_in, token_type} = getParamsFromSpotifyAuth(window.location.hash);
       
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn",  expires_in);

        setToken(localStorage.getItem('accessToken'))

        handleGetUser();

      } else{
        window.location = ('/');
        toast({
          title: 'Sign in to Spotify to use this service',
          status: 'Energy',
          duration: 2000,
          isClosable: true,
          position: 'top'
        })
      }
    }, []);

    // useEffect(() =>{
    //   handleGetUser();
    // },[]);
  
  
    const handleGetUser = async () =>{
  
      try{
        const {data} = await axios.get(USER_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setData(data);
  
      } catch (error){
        console.log('Couldnt get user');
        console.log(error.message);
      }
    }

  return (
    <div className='home'>      
        <Flex  w='100%' h='100%' justifyContent='center'>
            <Flex w='30%' h='50vh' marginTop='10%' flexDirection='column' justifyContent='space-around' alignItems='center' bg='rgba(180,175,173,0.6)' p={3} borderRadius='30px'>
                <Heading fontSize='xl' color='black'>CREATE A SESSION</Heading>
                <Input placeholder='Session name' 
                        variant='flushed' 
                        w='70%' 
                        color='white'
                        _placeholder={{color: 'white'}}></Input>
                <NavLink to='/publicmusic' style={{width:'50%', height:'20%'}} >
                    <Button bg='orange' color='white' size='md' w='100%'h='100%'fontSize='lg'borderRadius='30px'>
                        Public
                    </Button>
                </NavLink>         
                <NavLink to='/login' style={{width:'50%', height:'20%'}} >
                    <Button bg='orange' color='white' size='md' w='100%'h='100%'fontSize='lg'borderRadius='30px'>
                        Private
                    </Button>
                </NavLink>
            </Flex>
        </Flex>
    </div>
  )
}

export default Session