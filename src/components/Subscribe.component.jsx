import React from 'react';
import './Subscribe.styles.scss'
import Authentication from '../containers/Authentication.container'

function subscribe(props) {
  return (
    <div className="subscribe-container">
      <Authentication />
    </div>
  );
}

export default subscribe;