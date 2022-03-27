import React from 'react';
import Home from './components/landingPage/Home';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import MusicRoom from './components/musicRoom/MusicRoom';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import PublicMusicRoom from './components/musicRoom/PublicMusicRoom';
import ChatProvider from './context/ChatProvider';
import Session from './components/sessions/Session';
import SessionProvider from './context/SessionProvider';
import SessionPage from './components/sessions/SessionPage';

function App() {

  return (
    <Router>
      <SessionProvider>
        <ChatProvider>
        <Switch>
        <Route path='/sessionspage'>
            <SessionPage/>
          </Route>
          <Route path='/session'>
            <Session/>
          </Route>
          <Route path='/login'>
              <Login/>
          </Route>
          <Route path='/music'> 
              <MusicRoom/>
          </Route>
          <Route path='/publicmusic'>
            <PublicMusicRoom/>
          </Route>
          <Route path='/signup'>
            <Signup/>
          </Route>
          <Route path='/' exact>

            <Home/> 

          </Route>
        </Switch>
        </ChatProvider>    
      </SessionProvider> 
    </Router>
  );
}

export default App;
