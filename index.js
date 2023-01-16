require('dotenv').config()

const express = require('express'); 
const app = express(); 
const port = 8888; 


const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI= process.env.REDIRECT_URI
const axios = require('axios');



app.get('/',(req,res)=> {
    const data = {
        name: 'Andres', 
        isAwesome: true
    };
    res.json(data);
});

 
    const generateRandomString = length => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      };
      
    const stateKey = 'spotify_auth_state';


app.get('/login', (req,res) =>{
    const state = generateRandomString(16);
    res.cookie(stateKey,state);

    const scope = 'user-read-private user-read-email';

    const searchparams = new URLSearchParams({

          client_id: CLIENT_ID,
        
          response_type: 'code',
        
          redirect_uri: REDIRECT_URI,

            state: state,

            scope: scope
        })

    
    res.redirect(`https://accounts.spotify.com/authorize?${searchparams}`);
})

app.get('/callback', (req,res) =>{
    const code = req.query.code || null;
   
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: new URLSearchParams({
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
        if (response.status === 200) {
          const { access_token, refresh_token } = response.data;
  
          const queryParams = new URLSearchParams({
            access_token: access_token,
            refresh_token: refresh_token
          });
  
          res.redirect(`http://localhost:3000/?${queryParams}`);
  
        } else {
          const test =  new URLSearchParams({
            error: 'invalid_token '
          });
          res.redirect(`/?${ new URLSearchParams({ error: 'invalid_token' })}`);
        }
      })
      .catch(error => {
        res.send(error);
      });
  });

app.get('/refresh_token', (req, res) =>{
    const {refresh_token} = req.query;

    axios({
        method: 'post', 
        url: 'https://accounts.spotify.com/api/token',
        data:  new URLSearchParams({
            grant_type: 'authorization_code',
            refresh_token: refresh_token
          }),
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
          }
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    });
})

app.listen(port, ()=>{
    console.log(`Express app is listening at http://localhost:${port}` );
})