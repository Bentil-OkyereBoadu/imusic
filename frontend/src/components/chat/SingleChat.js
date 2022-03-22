import { Text } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../../context/ChatProvider'

const SingleChat = ({fetchAgain, setfetchAgain}) => {
    const { user, selectedChat, setSelectedChat} = ChatState();

  return (
    <>
        {/* {
            selectedChat? (
             <>

             </>
            ) : (
                <Text>Click on a user to start chatting</Text>
            )
        } */}
    </>
  )
}

export default SingleChat