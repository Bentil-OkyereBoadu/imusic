import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Text, useToast, Tooltip, useDisclosure, Spinner, Flex } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';

const SearchBox = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const {user, setSelectedChat, chats, setChats} = ChatState();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const url = process.env.NODE_ENV === 'development'? process.env.DEV_BACKEND : process.env.PROD_BACKEND


    const handleSearch = async () => {

        try{
            setLoading(true)

            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            }

            const {data} = await axios.get(`${url}/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data); 

        } catch (error){
            toast({
                title: 'Error occured!',
                description: 'Failed to load the search results',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
              });
        }
    }

    const accessChat = async (userId) => {
        try{
            setLoadingChat(true)
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.post(`${url}/api/chat`, {userId}, config); 
            if(!chats.find( (chat) => chat._id === data._id)){
                setChats([data, ...chats]);
            }

            setSelectedChat(data);
            setLoading(false);
            onClose();
 
        } catch (error) {
            toast({
                title: 'Error fetching chat',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
              });
        }
    }


  return (
    <>
        <Tooltip label="Search Users To Chat" hasArrow placement='bottom-end'>
            <Button variant="ghost" onClick={onOpen} marginY='0.6em'>
                <i className="fa fa-search" aria-hidden="true"></i>
                <Text d={{base:"none", md:"flex"}} px='4'>Search User</Text>
            </Button>
        </Tooltip>
        <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
                Search User
            </DrawerHeader>
            <DrawerBody>
                <Flex marginY='0.7em'>
                <Box>
                   <Input 
                    placeholder='Search by name or email'
                    mr={2}
                    value={search}
                    w='100%'
                    onChange = {(e) =>{ 
                        setSearch(e.target.value);
                        handleSearch();
                    }} /> 
                </Box>
                </Flex>
                { loading? <ChatLoading/> : (
                   searchResult.map( user =>   <UserListItem
                                                    key={user._id}
                                                    user={user}
                                                    handleFunction = {() => accessChat(user._id)}/>
                   )
                )}
                { loadingChat && <Spinner ml='auto' d='flex'/> }
            </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default SearchBox