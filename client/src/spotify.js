import axios from "axios";

const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
  }

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
    const {accessToken, timestamp, expireTime} = LOCALSTORAGE_VALUES; 
    if(!accessToken || !timestamp){
        return false; 
    }
    //Checking if token timestamp is greater than it's expire time: 3600s
    const millisecondsElapsed = Date.now() - Number(timestamp);
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
      //Using refresh token in local storage to use /refresh_token endpoint
      const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);
      
      //Updating new values in local storage
      window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
      //Reloading so that local storage is updated. 
      window.location.reload();
  
    } catch (e) {
      console.error(e);
    }
  };

const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
      [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
      [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
      [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');
    //In the case where we've run into an error or token is expired, refresh token
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
      //timestamping token
      window.localStorge.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
      //returning the access token from query params. 
      return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }
    return false;
  };

export const access_token = getAccessToken(); 

//Axios flobal request headers
axios.defaults.baseURL = 'https://api.spotify.com/v1'; 
axios.defaults.headers['Authorization'] = 'Bearer ${accessToken}'; 
axios.defaults.headers['Content-Type'] = 'application/json'; 

//Getting current users profile
export const getUserProfile = () => axios.get('/me');