import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Authentication.styles.scss';
import { registerNewUser, loginUser } from '../../ApiService';
import { updateUser } from '../../redux/actions';

function Authentication({ subscribe }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subscribe) {
      const { email, password, name, localSelector, localName } = registry;
      const newUser = {
        email: base64(email),
        password: btoa(password),
        name: base64(name),
        localSelector: base64(localSelector),
        localName: base64(localName),
      };
      // TO and FROM API
      const registeredUser = await registerNewUser(newUser);
      dispatch(updateUser(registeredUser));
      history.push(`/profile/${registeredUser._id}`, registeredUser);
    } else {
      const { email, password } = registry;
      const userLoginDetails = {
        email: base64(email),
        password: btoa(password),
      };
      const userInfo = await loginUser(userLoginDetails);
      dispatch(updateUser(userInfo));
      history.push(`/profile/${userInfo._id}`, userInfo);
    }
  };

  const validateRegister = () => {
    if (subscribe) {
      return (
        !registry.email ||
        !registry.emailConfirm ||
        !registry.password ||
        !registry.name ||
        !registry.localName
      );
    } else {
      return !registry.email || !registry.password;
    }
  };

  const base64 = (str) => {
    const regExp = /[^<>]+/g;
    const cleanString = str.match(regExp);
    //TODO rewrite to create a msg for the user console.log('input wasnt clean');
    if (str !== cleanString[0]) return;
    return btoa(cleanString[0]);
  };

  const emailInput = () => {
    return (
      <React.Fragment>
        <label for="email">
          {subscribe
            ? 'What is your email address?'
            : 'Please use your email address to sign in'}
        </label>
        <input
          type="email"
          placeholder={
            subscribe ? 'write your email here...' : 'Type your email here...'
          }
          name="email"
          value={registry.email}
          onChange={handleChange}
        ></input>
      </React.Fragment>
    );
  };

  const emailConfirm = () => {
    return (
      <React.Fragment>
        <label for="emailConfirm">Confirm your email address</label>
        <input
          type="email"
          placeholder="re-enter your email..."
          name="emailConfirm"
          value={registry.emailConfirm}
          onChange={handleChange}
        ></input>
      </React.Fragment>
    );
  };

  const passwordInput = () => {
    return (
      <React.Fragment>
        <label for="password">
          {subscribe ? 'Create a password' : 'Use your Password'}
        </label>
        <input
          type="password"
          placeholder={
            subscribe ? 'Create a password...' : 'Type your password here...'
          }
          name="password"
          value={registry.password}
          onChange={handleChange}
        ></input>
      </React.Fragment>
    );
  };

  const nameInput = () => {
    return (
      <React.Fragment>
        <label for="name">What would you like your profile name to be? </label>
        <input
          type="text"
          placeholder="Write your profile name here..."
          name="name"
          value={registry.name}
          onChange={handleChange}
        ></input>
      </React.Fragment>
    );
  };

  const localSelectorInput = () => {
    return (
      <React.Fragment>
        <label for="localSelector">What kind of place do you have? </label>
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
      </React.Fragment>
    );
  };

  const localNameInput = () => {
    return (
      <React.Fragment>
        <label for="localName">What's the name of your place</label>
        <input
          type="text"
          placeholder="Write the name of your place here..."
          name="localName"
          value={registry.localName}
          onChange={handleChange}
        ></input>
      </React.Fragment>
    );
  };

  const submitButtonRegister = () => {
    return (
      <React.Fragment>
        <input
          type="submit"
          value="Register"
          disabled={validateRegister()}
        ></input>

        <div className="subscribe-login">
          <p>Already have an account?</p>
          <Link to={'/Login'}>
            <p>Login here</p>
          </Link>
        </div>
      </React.Fragment>
    );
  };

  const submitButtonLogin = () => {
    return (
      <React.Fragment>
        <input
          type="submit"
          value="Log in"
          disabled={validateRegister()}
        ></input>

        <div className="subscribe-login">
          <p>Don't have an account yet?</p>
          <Link to={'/Subscribe'}>
            <p>Register here</p>
          </Link>
        </div>
      </React.Fragment>
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
}

export default Authentication;
