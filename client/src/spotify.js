import axios from "axios";

//Mapping local storage keys
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
  }

//map retrieving local storage values
  const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
  };

 
export const logout = () => {
    //remove all local storage data 
    for (const property in LOCALSTORAGE_KEYS) {
      window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    //navigate back to home page
    window.location = window.location.origin;
  };


const hasTokenExpired = () =>{
  //Getting the access token, timestamp, and expire time from local storage.
    const {accessToken, timestamp, expireTime} = LOCALSTORAGE_VALUES; 
    //Checking if any of the values are undefined.
    if(!accessToken || !timestamp){
        return false; 
    }
    //Checking if token timestamp is > than it's expire time: 3600s
    const millisecondsElapsed = Date.now() - Number(timestamp);
    //Returning true if token has expired, false if not.
    return (millisecondsElapsed / 1000) > Number(expireTime); 
};

const refreshToken = async () => {
    try {
      //Logout if we have no refresh token, refresh token is undefined, or if stuck in a loop. 
      if (!LOCALSTORAGE_VALUES.refreshToken ||
        LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
        (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
      ) {
        console.error('No refresh token available');
        logout();
      }
      //Using refresh token in local storage to use /refresh_token endpoint, getting new access token and expire time
      const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);
      
      //Updating new values in local storage.Setting new access token and expire time. 
      window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
      //Reloading so that local storage is updated. 
      window.location.reload();
  
    } catch (e) {
      console.error(e);
    }
  };


const getAccessToken = () => {
    //Obtaining query params from URL and mapping them.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
      [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
      [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
      [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };

    const hasError = urlParams.get('error');
    //Error, expired/undef refresh or access token
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
      refreshToken();
    }
    //In the case where we have a valid token, return it. 
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
      return LOCALSTORAGE_VALUES.accessToken;
    }

    //In the case where there's a token in the URL. User's first time loggin in, store information in local stoarage. 
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
      //setting the values for local storage keys 
      for (const property in queryParams) {
        window.localStorage.setItem(property, queryParams[property]);
      }
      //timestamping 
      window.localStorge.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
      //returning the access token from query params. 
      return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }
    return false;
  };

export const access_token = getAccessToken(); 

//Axios global request headers
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${access_token}`;
axios.defaults.headers['Content-Type'] = 'application/json';


export const getUserProfile = () => axios.get('/me');

export const getUserPlaylists = (limit = 20) => {
  return axios.get(`/me/playlists?limit=${limit}`); 
}

export const getUserTopArtists = (time_range = 'short_term') => {
return axios.get(`/me/top/artists?time_range=${time_range}`);
}

export const getUserTopTracks = (time_range = 'short_term') => {
  return axios.get(`/me/top/tracks?time_range=${time_range}`);
  }
