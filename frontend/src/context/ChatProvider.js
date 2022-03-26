import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext()

const ChatProvider = ({children}) => {
    const history = useHistory();

    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);

    return (
        <ChatContext.Provider value={{user, setUser, selectedChat, setSelectedChat, chats, setChats}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
};

export default ChatProvider;