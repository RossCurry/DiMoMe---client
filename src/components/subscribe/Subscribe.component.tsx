import React from 'react';
import './Subscribe.styles.scss';
import Authentication from '../../containers/authentication/Authentication.container';
import { LoginProps } from '../login/Login.component';

const Subscribe = ({ match }: LoginProps): JSX.Element => {
  return (
    <div className="subscribe-container">
      <Authentication subscribe={match.isExact} message="" />
    </div>
  );
};

export default Subscribe;
