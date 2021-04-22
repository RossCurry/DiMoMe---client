import React, {useState} from 'react';
import './Authentication.styles.scss'

function Authentication(props) {

  const initialState = {
    email: '',
    emailConfirm: '',
    password: '',
    name: '',
    localSelector: '',
    localName: ''
  };

  const [registry, setRegistry] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target.value;
    // console.log('e.target.value: ', e.target.value);
    // setRegistry((prevState) => {
    //   return {...prevState,[name]: value}
    // })
    setRegistry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log('registry', registry);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name, localSelector, localName} = registry;
    password = btoa(password);
    const newUser = {email, password, name, localSelector, localName}
    console.log('newUser', newUser);
  }

  const validateInputs = () => {
    return (
        !registry.email || !registry.emailConfirm || !registry.password || !registry.name || !registry.localName
      )
  };
  

  return (
    <div>
      <h1 className="subscribe-heading">It's free to register an account</h1>
      <form 
        className="subscribe-form" 
        onSubmit={handleSubmit}
      >
        <h3>Register below with an email</h3>

        <label for="email">What is your email address?</label>
        <input 
          type="email" 
          placeholder="write your email here..." 
          name="email"
          value={registry.email}
          onChange={handleChange}
        >
        </input>

        <label for="emailConfirm">Confirm your email address</label>
        <input 
          type="email" 
          placeholder="re-enter your email..." name="emailConfirm"
          value={registry.emailConfirm}
          onChange={handleChange}
        >
        </input>
        
        <label for="password">Create a password</label>
        <input 
          type="password" 
          placeholder="Create a password..." 
          name="password"
          value={registry.password}
          onChange={handleChange}
        >
        </input>
        
        <label for="name">What would you like your profile name to be? </label>
        <input 
          type="text" 
          placeholder="Write your profile name here..." name="name"
          value={registry.name}
          onChange={handleChange}
        >
        </input>

        <label for="localSelector">What kind of place do you have? </label>
        <select 
        name="localSelector" 
        id="localSelect"
        value={registry.localSelector}
        onChange={handleChange}
        >
          <option selected value="">--Please choose an option--</option>
          <option value="restaurant">Restaurant</option>
          <option value="cafe">Cafe</option>
          <option value="bar">Bar</option>
        </select>

        <label for="localName">What's the name of your place</label>
        <input 
        type="text" 
        placeholder="Write the name of your place here..." name="localName"
        value={registry.localName}
        onChange={handleChange}
        >
        </input>

        <input type="submit" value="Register" disabled={validateInputs()}></input>

      <div className="subscribe-login">
        <p>Already have an account?</p>
        <p>Login here</p>
      </div>

      </form>


    </div>
  );
}

export default Authentication;