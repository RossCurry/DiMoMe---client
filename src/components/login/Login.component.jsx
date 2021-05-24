import React from 'react';
import Authentication from '../../containers/authentication/Authentication.container';

function Login({ match }) {
  
  return (
    <div className="subscribe-container">
      <Authentication subscribe={!match.isExact} />
    </div>
  );
}

export default Login;