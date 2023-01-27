import React from 'react'
import Button from '../Components/Button.js'

function Login() {
  return (
    <div>
        {/* <button>
            <a 
            className='App-link'
            href="http://localhost:8888/login">
                Login into spotify 
            </a>
        </button> */}
        <Button href="http://localhost:8888/login" descriptor="Login" />
    </div>
  )
}

export default Login