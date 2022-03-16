import React, { useEffect, useState } from 'react';
import {Box, Flex, Input} from '@chakra-ui/react'
import Home from './components/landingPage/Home';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import MusicRoom from './components/musicRoom/MusicRoom';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';


function App() {

   const [chats, setChats] = useState([]);


  const getChats = async () => {
    try {
      const chats = await fetch('http://localhost:4000/api/chat');
    const chatsJson = await chats.json();
    const chatString = JSON.stringify(chatsJson)
    setChats((prevChat) => [prevChat, ...chatString]);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(()=>{
    getChats();
  }, []);
 
const authRequest = async () => {
  try{

  }
  catch(err){
    console.error(err);
  }
}



  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home chats= {chats}/> 
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/music'>
          <MusicRoom/>
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
      </Switch> 
    </Router>
  );
}

export default App;
