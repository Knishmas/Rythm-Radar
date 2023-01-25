import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { access_token, logout, getUserProfile } from './spotify';
import { catchErrors } from './util';

function App() {
  const [token,setToken] = useState(null);
  const [profile,setProfile] = useState(null);


  useEffect(() => {
    setToken(access_token);

    const fetchData = async () =>{
        const {data} = await getUserProfile();
        setProfile(data); 
        console.log(data);
  }

    catchErrors(fetchData()); 

  }, []);
  


  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a 
          className='App-link'
          href="http://localhost:8888/login">
             Login into spotify 
          </a>
        ) : (
          <>
          <h1>Logged in!</h1>
          <button onClick={logout}>Log Out! </button>
          {profile && (
            <div>
              
              <h1>
                {profile.display_name}
              </h1>
              {profile.images.length && profile.images[0].url && (
                <img src={profile.images[0].url} alt="Profile Image" />
              )} 
              <p>
                {profile.followers.total} Followers
              </p>
              <p>Spotify plan: {profile.product}</p>
              
            </div>
          )}
          </>
        )}
  
      </header>
    </div>
  );
}

export default App;
