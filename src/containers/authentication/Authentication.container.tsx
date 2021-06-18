/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { updateUser } from '../../redux/actions';
import { useAppDispatch } from '../../redux/hooks';
import { updateUser } from '../../redux/reducers/userSlice';
import './Authentication.styles.scss';
import {
  registerNewUser,
  loginUser,
  newUser,
  userLogin,
} from '../../ApiService';

interface AuthenticationProps {
  subscribe: boolean;
}

const Authentication = ({ subscribe }: AuthenticationProps): JSX.Element => {
  const history = useHistory();
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const initialState = {
    email: '',
    emailConfirm: '',
    password: '',
    name: '',
    localType: '',
    localName: '',
  };

  const [userInput, setUserInput] = useState(initialState);
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
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (subscribe) {
      const { email, password, name, localType, localName } = userInput;
      const newUserForDB = {
        email: base64(email),
        password: btoa(password),
        name: base64(name),
        localType: base64(localType),
        localName: base64(localName),
      };
      // TO and FROM API
      const registeredUser = await registerNewUser(newUserForDB as newUser);
      if (registeredUser) {
        // here we add the user info to the Redux store
        dispatch(updateUser(registeredUser));
        history.push(`/profile/${registeredUser._id}`, registeredUser);
      }
    } else {
      const { email, password } = userInput;
      const userLoginDetails = {
        email: base64(email),
        password: btoa(password),
      };
      const userInfo = await loginUser(userLoginDetails as userLogin);
      if (userInfo) {
        dispatch(updateUser(userInfo));
        history.push(`/profile/${userInfo._id}`, userInfo);
      }
    }
  };

  const validateRegister = (): boolean => {
    if (subscribe) {
      return (
        !userInput.email ||
        !userInput.emailConfirm ||
        !userInput.password ||
        !userInput.name ||
        !userInput.localName
      );
    }
    return !userInput.email || !userInput.password;
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
            value={userInput.email}
            onChange={handleChange}
          />
        </label>
      </>
    );
  };

  // const emailConfirm = (): JSX.Element => {
  //   return (
  //     <>
  //       <label htmlFor="emailConfirm">
  //         Confirm your email address
  //         <input
  //           type="email"
  //           placeholder="re-enter your email..."
  //           name="emailConfirm"
  //           value={userInput.emailConfirm}
  //           onChange={handleChange}
  //         />
  //       </label>
  //     </>
  //   );
  // };

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
            value={userInput.password}
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
            value={userInput.name}
            onChange={handleChange}
          />
        </label>
      </>
    );
  };

  const localTypeInput = (): JSX.Element => {
    return (
      <>
        <label htmlFor="localType">
          What kind of place do you have?
          <select
            name="localType"
            id="localSelect"
            value={userInput.localType}
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
            value={userInput.localName}
            onChange={handleChange}
          />
        </label>
      </>
    );
  };

  const submitButtonRegister = (): JSX.Element => {
    return (
      <>
        <input
          type="submit"
          value="Register"
          // disabled={validateRegister()}
        />

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
        <input
          type="submit"
          value="Log in"
          // disabled={validateRegister()}
        />

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
        {/* {subscribe ? emailConfirm() : null} */}
        {subscribe ? passwordInput() : passwordInput()}
        {subscribe ? nameInput() : null}
        {subscribe ? localTypeInput() : null}
        {subscribe ? localNameInput() : null}
        {subscribe ? submitButtonRegister() : submitButtonLogin()}
      </form>
    </div>
  );
};

export default Authentication;
