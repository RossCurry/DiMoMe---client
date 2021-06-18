import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Authentication from '../../containers/authentication/Authentication.container';

// TODO I can't find where this prop is coming from
type match = {
  isExact: boolean;
};
export interface LoginProps {
  match: match;
}

interface LocationState {
  message: string;
}

const Login = ({ match }: LoginProps): JSX.Element => {
  const location = useLocation<LocationState>();
  const [alreadyUser, setAlreadyUser] = useState('');
  useEffect(() => {
    if (location.state) setAlreadyUser(location.state.message);
  }, [location.state]);
  return (
    <div className="subscribe-container">
      <Authentication subscribe={!match.isExact} message={alreadyUser} />
    </div>
  );
};

export default Login;
