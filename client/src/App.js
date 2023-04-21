import { useEffect, useState } from 'react';
import './App.css';
import { access_token, logout, getUserProfile } from './spotify';
import { catchErrors } from './util';
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";
import {Login,Profile} from './Pages';

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
          <Login/>
        ) : (
          <>
         <div className="logout-container">
  <button className="logout" onClick={logout}>Log Out</button>
</div>
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
                <Profile/>
              }>
               
              </Route>
            </Routes>
          </Router>
          </>
        )}
          
      </header>
    </div>
  );
}

export default App;
