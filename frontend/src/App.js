import React from 'react';
import Home from './components/landingPage/Home';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import MusicRoom from './components/musicRoom/MusicRoom';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import PublicMusicRoom from './components/musicRoom/PublicMusicRoom';

function App() {

  return (
    <Router>
      <Switch>
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
          <Home  /> 
        </Route>
      </Switch> 
    </Router>
  );
}

export default App;
