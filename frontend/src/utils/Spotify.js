const { request } = require('express');
const express = require('express')
const querystring = require('query-string')
require('dotenv').config({ path: '../.env'});

const app = express();

//getting client id and redirect uri from env
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

//generate random string (hash) as code verifier
const generateRandomString = (length) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


const Spotify = {
    //request authorization to access data from spotify
    authRequest:  () =>{
        app.get('/login', (req, res) =>{
            const state = generateRandomString(16);
            const scope = 'user-read-private user-read-email';
            res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
              response_type: 'code',
              client_id: client_id,
              scope: scope,
              redirect_uri: redirect_uri,
              state: state
            }));
        })
    },

    //request access token
    getAccessToken: () =>{
        app.get('/callback', (req, res) => {
            let code = req.query.code || null;
            let state = req.query.state || null;

            if (state === null) {
                res.redirect('/#' + querystring.stringify({
                    error: 'state_mismatch'
                }))
            } else {
                const authOptions = {
                    url: 'https://accounts.spotify.com/api/token',
                    form: {
                        code: code,
                        redirect_uri: redirect_uri,
                        grant_type: 'authorization_code'
                    },
                    headers: {
                        'Authorization' : 'Basic ' + (new Buffer.from(`${client_id}:${client_secret}`).toString('base64'))
                    },
                    json: true
                };
                res.send(authOptions);
            }
        })
    },

    //request refreshed access token
    getRefreshedToken: () => {
        app.get('/refresh_token', (req, res) =>{
            let refresh_token = req.query.refresh_token;
            let authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'Authorization' : 'Basic ' + (new Buffer.from(`${client_id}:${client_secret}`).toString('base64'))
                },
                form: {
                    grant_type: 'refresh_token',
                    refresh_token: refresh_token
                },
                json: true
            };

            request.post(authOptions, (error, response, body) => {
                if (!error && response.statusCode === 200){
                    let access_token = body.access_token;
                    res.send({
                        'access_token': access_token
                    })
                }
            })
        })
    }


}

module.exports = Spotify;
