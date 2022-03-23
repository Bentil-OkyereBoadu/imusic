import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import ChatBox from './ChatBox';
import ChatLoading from './ChatLoading';
import { getSender } from './config/ChatLogics';

const MyChats = ({fetchAgain, setFetchAgain}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loggedUser, setLoggedUser] = useState();
    const {user,selectedChat, setSelectedChat, chats, setChats} = ChatState();
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

        fetchChats(); 
    }, [ fetchAgain ])

  return (
    <Box 
        d='flex'
        flexDir='column'
        alignItems='center'
        p={3}
        bg='white'
        borderRadius='lg'
        borderWidth='1px'
        w='100%'
    >
        <Flex 
            flexDirection='column'
            borderRadius='lg'
            overflowY='scroll'
            w='100%'>
                { chats? (
                    <Stack>
                        {chats.map( chat => (
                            <Box
                                onClick={() =>{ setSelectedChat(chat); onOpen()}}
                                cursor='pointer'
                                bg={selectedChat === chat? '#38B2AC' : '#E8E8E8'}
                                color={selectedChat === chat? 'white' : 'black'}
                                px={3}
                                py={2}
                                width='100%'
                                borderRadius='lg'
                                key={chat._id}>
                                    <Text >{getSender(loggedUser, chat.users)}</Text>
                                    {chat.latestMessage && (
                                        <Text fontSize="xs">
                                        <b>{chat.latestMessage.sender.name} : </b>
                                        {chat.latestMessage.content.length > 50
                                        ? chat.latestMessage.content.substring(0, 51) + "..."
                                            : chat.latestMessage.content}
                  </Text>
                )}
                                </Box>
                        ))}
                    </Stack>
                ) : <ChatLoading/>}
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          { user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
          </ModalBody>

          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default MyChats