import React from 'react';
import './Subscribe.styles.scss';
import Authentication from '../../containers/authentication/Authentication.container';

function subscribe({ match }) {

  return (
    <div className="subscribe-container">
      <Authentication subscribe={match.isExact}/>
    </div>
  );
}

export default subscribe;