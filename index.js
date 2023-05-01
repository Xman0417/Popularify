const express = require('express');
const app = express();
require('dotenv').config();
const querystring = require('querystring');
const axios = require('axios');

//.env variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 8888;


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};  
const stateKey = 'spotify_auth_state';
/* React app will direct people to this express route when logging in. Redirects the user to
log in with spotify through their authentication service. 
*/
app.get('/login', (req, res) => {
    //Security - param for spotify's authentication service.
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    //What is asked to be allowed by the user. 
    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
      ].join(' ');
    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    });
    //redirects user to spotify's authorization with query params specified. 
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});
/*This is what the inital spotify authorization service will send the user back to after logging in.
This express route does a couple of different things. First, it will get the authorization code that is 
queried in the request. Then, it uses axios to exchange this code with the Spotify API to get an 
access token. Then, it redirects back to the React App, with the access code and refresh token
passed back to the react app through query params
*/
app.get('/callback', (req, res) => {
    //Gets the auth code from the queryparams in the request.
    const code = req.query.code || null;
    //Uses axios to exchange code for access token
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        //If a response is received successfully, redirect the user back to the react app with
        //the updated query params.
        if (response.status === 200) {
            const { access_token, refresh_token, expires_in } = response.data;
  
            const queryParams = querystring.stringify({
                access_token,
                refresh_token,
                expires_in,
            });
  
            res.redirect(`${FRONTEND_URI}/?${queryParams}`);
  
        } else {
            //If a response is not successfully received from spotify, returns the error of invalid token
            res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
        }
    })
    // if some other error occurs, send the error.
    .catch(error => {
        res.send(error);
    });
});
//Call that refreshes access token using refresh token that is given.
app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
  
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    });
});

app.listen(PORT, () => {
    console.log(`Express app listening at http://localhost:${PORT}`);
});

