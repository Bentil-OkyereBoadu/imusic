import { Box, FormControl, Input, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:4000";
let socket, selectedChatCompare;

const SingleChat = ({fetchAgain, setfetchAgain}) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [ typing, setTyping ] =useState(false);
    const [ isTyping, setIsTyping ] =useState(false);


    const { user, selectedChat, setSelectedChat} = ChatState();
    const toast = useToast();

    const sendMessage = async (event) =>{

        if(event.key === "Enter" && newMessage){
            socket.emit('stop typing', selectedChat._id);
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

                socket.emit('new message', data)
                
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

            socket.emit('join chat', selectedChat._id);


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
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', user);
        socket.on('connected', ()=> setSocketConnected(true));
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))

    })

    useEffect(()=>{
        fetchMessages()
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(()=>{
        socket.on('message received', (newMessage) => {
            if(!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id){

            } else {
                setMessages([...messages, newMessage])
            }
        })
    })

    

    const handleInput = (e) => {
        setNewMessage(e.target.value);

        if(!socketConnected) return;

        if(!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        let timerLength = 3000;
        setTimeout(() => {
          let timeNow = new Date().getTime();
          let timeDiff = timeNow - lastTypingTime;
          if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat._id);
            setTyping(false);
          }
        }, timerLength);

    }

  return (
    <Box >
        { loading? (
            <Spinner 
                size='x1'
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
                />
        ) : (
            <div className='messages'>
              <ScrollableChat messages={messages} />   
            </div>
        )}

        <FormControl onKeyDown={sendMessage}>
        {isTyping ? (
                <div> typing... </div>
              ) : (
                <></>
              )}
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