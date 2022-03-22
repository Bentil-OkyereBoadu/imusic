import { Box, FormControl, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'

const SingleChat = ({fetchAgain, setfetchAgain}) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState();

    const { user, selectedChat, setSelectedChat} = ChatState();
    const toast = useToast();

    const sendMessage = async (event) =>{
        if(event.key === "Enter" && newMessage){
            try{
                const config ={
                    headers:{
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${user.token}`,
                    }
                };
                setNewMessage("");
                const { data } = await axios.post('http://localhost:4000/api/message',{
                    content: newMessage,
                    chatId: selectedChat._id,
                },
                   config 
                )
                console.log(data);

                
                setMessages([...messages, data])
            } catch (error){
                toast({
                    title: 'Error occured!',
                    description: 'Failed to send message',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'center',
                  });
            }
        }
    }

    const fetchMessages = async () => {
        if(!selectedChat) return;
 
        try{
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            };

            setLoading(true);

            const {data} = await axios.get(`http://localhost:4000/api/message/${selectedChat._id}`, config);

            setMessages(data);
            setLoading(false);


        } catch(error){
            toast({
                title: 'Error occured!',
                description: 'Failed to send message',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'center',
              }); 
        }
    }

    useEffect(()=>{
        fetchMessages()
    }, [selectedChat])
    const handleInput = (e) => {
        setNewMessage(e.target.value);
    }

  return (
    <Box>
        { loading? (
            <Spinner 
                size='x1'
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
                />
        ) : (
            <></>
        )}

        <FormControl onKeyDown={sendMessage}>
            <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                onChange={handleInput}
                value={newMessage}></Input>
        </FormControl>
        
    </Box>
  )
}

export default SingleChat