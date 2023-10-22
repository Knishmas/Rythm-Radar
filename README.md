# Rhythm Radar

Rhythm Radar is a web application developed using React and Spotify's API. It allows users to explore their favorite music tracks. The application is built using OAuth2.0 and Axios for accessing and managing user profiles, playlists, and top artists/tracks.

# Features

- Exploration of users' top artists and tracks
- Ability to select between 3 different time periods for your information. (1 month, 6 months, or all time)
- Automatic refresh of user tokens upon expiration for seamless access to the application

# Demo 

https://github.com/Knishmas/Rythm-Radar/assets/67484551/ffae5499-983b-485b-bf8b-8d90d36c2470




# Requirements

- Node.js
- npm
- _Note: After cloning, within the root directory of the project, enter your version of node within the .nvmrc file_

# Installation

```shell
$ git clone https://github.com/Knishmas/Rythm-Radar.git
$ cd rythm-radar
$ npm install
```

# Other Requirements

- Spotify Developer Dashboard
- Create a new app within the developer dashboard and enter `http://localhost:8888/callback` within "Redirect URIs".
- Create a new `.env` file in the root folder and add the following key-value pairs to the file with your information
  - CLIENT_ID = [client id obtained from the Spotify Developer Dashboard]
  - CLIENT_SECRET = [client secret obtained from the Spotify Developer Dashboard]
  - REDIRECT_URI = http://localhost:8888/callback

# To start the local web server with HTTPS on port 3000

- Within the root directory of the project, enter:

```shell
    npm start
```
