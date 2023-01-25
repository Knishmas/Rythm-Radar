import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { access_token, logout, getUserProfile } from './spotify';

function App() {
  const [token,setToken] = useState(null);
  const [profile,setProfile] = useState(null);


  useEffect(() => {
    setToken(access_token);

    const fetchData = async () =>{
      try{
        const {data} = await getUserProfile();
        setProfile(data); 

        console.log(data);
    } catch(e){
      console.log(e);
    }
  }

  fetchData(); 

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
          </>
        )}
  
      </header>
    </div>
  );
}

export default App;
