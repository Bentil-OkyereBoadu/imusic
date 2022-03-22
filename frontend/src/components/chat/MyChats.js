import { Box, Flex, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoVolumeHigh } from 'react-icons/io5';
import { ChatState } from '../../context/ChatProvider';
import ChatLoading from './ChatLoading';

const MyChats = () => {
    const [loggedUser, setLoggedUser] = useState();
    const {user, setSelectedChat, chats, setChats} = ChatState();
    const toast = useToast();

    //fetching all chats
    const fetchChats = async () =>{
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.get("http://localhost:4000/api/chat", config);
            console.log(data);
            setChats(data);

        } catch(error) {
            console.log(error.message);
            toast({
                title: 'Error occured!',
                description: 'Failed to load the chats',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
              });
        }
    };

    useEffect(()=> {
        setLoggedUser(JSON.parse(localStorage.getItem("loggedinUser")));
        console.log(user)
        fetchChats(); 
    }, [])

  return (
    <Box 
        d='flex'
        flexDir='column'
        alignItems='center'
        p={3}
        bg='white'
        borderRadius='lg'
        borderWidth='1px'
    >
        <Box 
            pb={3}
            px={3}
            d='flex'
            w='100%'
            justifyContent='space-between'
            alignItems='center'>   
        </Box>   
        <Flex 
            flexDirection='column'
            borderRadius='lg'
            overflowY='hidden'>
                {/* { chats? () : <ChatLoading/>} */}
        </Flex>
    </Box>
  )
}

export default MyChats