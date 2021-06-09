/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Authentication.styles.scss';
import {
  registerNewUser,
  loginUser,
  newUser,
  userLogin,
} from '../../ApiService';
import { updateUser } from '../../redux/actions';

interface AuthenticationProps {
  subscribe: boolean;
}

const Authentication = ({ subscribe }: AuthenticationProps): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const initialState = {
    email: '',
    emailConfirm: '',
    password: '',
    name: '',
    localSelector: '',
    localName: '',
  };

  const [registry, setRegistry] = useState(initialState);
  const base64 = (str: string): string | null => {
    const regExp = /[^<>]+/g;
    const cleanString = str.match(regExp);
    if (cleanString) {
      // TODO rewrite to create a msg for the user console.log('input wasnt clean');
      if (str !== cleanString[0]) return null;
      return btoa(cleanString[0]);
    }
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setRegistry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (subscribe) {
      const { email, password, name, localSelector, localName } = registry;
      const newUserForDB = {
        email: base64(email),
        password: btoa(password),
        name: base64(name),
        localSelector: base64(localSelector),
        localName: base64(localName),
      };
      // TO and FROM API
      const registeredUser = await registerNewUser(newUserForDB as newUser);
      dispatch(updateUser(registeredUser));
      history.push(`/profile/${registeredUser._id}`, registeredUser);
    } else {
      const { email, password } = registry;
      const userLoginDetails = {
        email: base64(email),
        password: btoa(password),
      };
      const userInfo = await loginUser(userLoginDetails as userLogin);
      dispatch(updateUser(userInfo));
      history.push(`/profile/${userInfo._id}`, userInfo);
    }
  };

  const validateRegister = (): boolean => {
    if (subscribe) {
      return (
        !registry.email ||
        !registry.emailConfirm ||
        !registry.password ||
        !registry.name ||
        !registry.localName
      );
    }
    return !registry.email || !registry.password;
  };

  const emailInput = (): JSX.Element => {
    return (
      <>
        <label htmlFor="email">
          {subscribe
            ? 'What is your email address?'
            : 'Please use your email address to sign in'}

          <input
            type="email"
            placeholder={
              subscribe ? 'write your email here...' : 'Type your email here...'
            }
            name="email"
            value={registry.email}
            onChange={handleChange}
          />
        </label>
      </>
    );
  };

  const emailConfirm = (): JSX.Element => {
    return (
      <>
        <label htmlFor="emailConfirm">
          Confirm your email address
          <input
            type="email"
            placeholder="re-enter your email..."
            name="emailConfirm"
            value={registry.emailConfirm}
            onChange={handleChange}
          />
        </label>
      </>
    );
  };

  const passwordInput = (): JSX.Element => {
    return (
      <>
        <label htmlFor="password">
          {subscribe ? 'Create a password' : 'Use your Password'}

          <input
            type="password"
            placeholder={
              subscribe ? 'Create a password...' : 'Type your password here...'
            }
            name="password"
            value={registry.password}
            onChange={handleChange}
          />
        </label>
      </>
    );
  };

  const nameInput = (): JSX.Element => {
    return (
      <>
        <label htmlFor="name">
          What would you like your profile name to be?
          <input
            type="text"
            placeholder="Write your profile name here..."
            name="name"
            value={registry.name}
            onChange={handleChange}
          />
        </label>
      </>
    );
  };

  const localSelectorInput = (): JSX.Element => {
    return (
      <>
        <label htmlFor="localSelector">
          What kind of place do you have?
          <select
            name="localSelector"
            id="localSelect"
            value={registry.localSelector}
            onChange={handleChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Coffeeshop">Coffeeshop</option>
            <option value="Bar">Bar</option>
          </select>
        </label>
      </>
    );
  };

  const localNameInput = (): JSX.Element => {
    return (
      <>
        <label htmlFor="localName">
          {/* // TODO check if this works on the screen output */}
          What&apos;s the name of your place
          <input
            type="text"
            placeholder="Write the name of your place here..."
            name="localName"
            value={registry.localName}
            onChange={handleChange}
          />
        </label>
      </>
    );
  };

  const submitButtonRegister = (): JSX.Element => {
    return (
      <>
        <input type="submit" value="Register" disabled={validateRegister()} />

        <div className="subscribe-login">
          <p>Already have an account?</p>
          <Link to="/Login">
            <p>Login here</p>
          </Link>
        </div>
      </>
    );
  };

  const submitButtonLogin = (): JSX.Element => {
    return (
      <>
        <input type="submit" value="Log in" disabled={validateRegister()} />

        <div className="subscribe-login">
          <p>Don&apos;t have an account yet?</p>
          <Link to="/Subscribe">
            <p>Register here</p>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div>
      <h1 className="subscribe-heading">
        {subscribe
          ? "It's free to register an account"
          : 'To continue log in here'}
      </h1>

      <form className="subscribe-form" onSubmit={handleSubmit}>
        <h3>
          {subscribe
            ? 'Registerbelow with an email'
            : 'Login below with your email & password'}
        </h3>
        {subscribe ? emailInput() : emailInput()}
        {subscribe ? emailConfirm() : null}
        {subscribe ? passwordInput() : passwordInput()}
        {subscribe ? nameInput() : null}
        {subscribe ? localSelectorInput() : null}
        {subscribe ? localNameInput() : null}
        {subscribe ? submitButtonRegister() : submitButtonLogin()}
      </form>
    </div>
  );
};

export default Authentication;
