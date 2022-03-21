import React, { useEffect, useState } from 'react';
import Home from './components/landingPage/Home';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import MusicRoom from './components/musicRoom/MusicRoom';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import axios from 'axios';


  // //getting client id and redirect uri from env
  // // const client_secret = process.env.CLIENT_SECRET;
  // const client_id ="ddc7d259bece4112b9df90559ea0e4ff";
  // const redirect_uri = 'http://localhost:3000/music';

  // const OAUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  // const SCOPES = ["user-read-currently-playing", "user-read-playback-state" ]
  // const SPACE_DELIMITER = "%20";
  // const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  // const getParamsFromSpotifyAuth = (hash) => {
  //   const stringAfterHashtag = hash.substring(1);
  //   const paramsInUrl =stringAfterHashtag.split("&");

  //   const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
  //     console.log(currentValue);
  //     const [key, value] = currentValue.split("=");
  //     accumulator[key] = value;
  //     return accumulator;
  //   }, {})

  //   return paramsSplitUp;  
  // }

function App() {

  // useEffect(() => {
  //   if(window.location.hash){
  //     const {access_token, expires_in, token_type} = getParamsFromSpotifyAuth(window.location.hash);
  //     localStorage.clear()
  //     localStorage.setItem("accessToken", access_token);
  //     localStorage.setItem("tokenType", token_type);
  //     localStorage.setItem("expiresIn", expires_in);
  //   }
  // },[])

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
          <Home  /> 
        </Route>
      </Switch> 
    </Router>
  );
}

export default App;
