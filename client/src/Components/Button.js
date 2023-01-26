import React from 'react'
import './Styles/Button.css';

function Button(props) {
  return (
    <div>
      <button>
        <a href={props.href}>{props.descriptor}</a>
      </button>
    </div>
  )
}

export default Button