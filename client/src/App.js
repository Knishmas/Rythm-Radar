import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { access_token } from './spotify';

function App() {
  const [token,setToken] = useState(null);

  useEffect(() => {
    setToken(access_token);
  }, []);
  


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:8888/login"
        >
          Login into spotify 
        </a>
      </header>
    </div>
  );
}

export default App;
