import React from 'react';
import Authentication from '../../containers/authentication/Authentication.container';

// TODO I can't find where this prop is coming from
type match = {
  isExact: boolean;
};
export interface LoginProps {
  match: match;
}

const Login = ({ match }: LoginProps): JSX.Element => {
  return (
    <div className="subscribe-container">
      <Authentication subscribe={!match.isExact} />
    </div>
  );
};

export default Login;
