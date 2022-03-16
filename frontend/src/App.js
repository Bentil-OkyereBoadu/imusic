import React, { useEffect, useState } from 'react';
import Home from './components/landingPage/Home';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import MusicRoom from './components/musicRoom/MusicRoom';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import axios from 'axios';


function App() {

   const [chats, setChats] = useState([]);

  const getChats =()=>{
    axios({
      method: 'GET',
      url: 'http://localhost:4000/api/chat'
    }).then( res => {
      setChats(res.data);
    })
  }

  useEffect(()=>{
    getChats();
  }, []);
 



  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/music'>
          <MusicRoom/>
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='/' exact>
          <Home /> 
        </Route>
      </Switch> 
    </Router>
  );
}

export default App;
