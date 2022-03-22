import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Text, useToast, Tooltip, useDisclosure } from '@chakra-ui/react';
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

    const handleSearch = async () => {
        if(!search){
            toast({
                title: 'Nothing to search. Please enter something to search',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
              });
            return;
        }

        try{
            setLoading(true)

            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            }

            const {data} = await axios.get(`http://localhost:4000/api/user?search=${search}`, config);

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

            const { data } = await axios.post('http://localhost:4000/api/chat', {userId}, config); 

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
            <Button variant="ghost" onClick={onOpen}>
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
                <Box>
                   <Input 
                    placeholder='Search by name or email'
                    mr={2}
                    value={search}
                    onChange = {(e) => setSearch(e.target.value)} /> 
                </Box>
                <Button onClick={handleSearch}>Go</Button>
                <UserListItem user={user}/>
                { loading? <ChatLoading/> : (
                   searchResult.map( user =>   <UserListItem
                                                    key={user._id}
                                                    user={user}
                                                    handleFunction = {() => accessChat(user._id)}/>
                   )
                )}
                
            </DrawerBody>

            <DrawerFooter>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default SearchBox