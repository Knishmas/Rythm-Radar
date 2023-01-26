import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { access_token, logout, getUserProfile } from './spotify';
import { catchErrors } from './util';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
          <Router>
            <ScrollToTop/>
            <Routes>
              <Route path="/top-artists" element={<h1>Top Artists</h1>}>
                
              </Route>
              <Route path="/top-tracks" element={<h1>Top Tracks</h1>}>
              </Route>
              <Route path="/playlists/:id" element={<h1>Playlist</h1>}>
              </Route>
              <Route path="/playlists" element={<h1>Playlists</h1>}>
              </Route>
              <Route path="/" element={
                 <>
                 <button onClick={logout}>Log Out</button>

                 {profile && (
                   <div>
                     <h1>{profile.display_name}</h1>
                     <p>{profile.followers.total} Followers</p>
                     {profile.images.length && profile.images[0].url && (
                       <img src={profile.images[0].url} alt="Avatar"/>
                     )}
                   </div>
                 )}
               </>
              }>
               
              </Route>
            </Routes>
          </Router>
        )}
  
      </header>
    </div>
  );
}

export default App;
