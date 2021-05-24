import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/actions'
import { newCategoryDB } from '../../ApiService';
import './Category.styles.scss'

function Category({ addNewCategory }) {
  const [text, setText] = useState('');
  const currentUser = useSelector(state => state.currentUser.user)
  const history = useHistory();
  const dispatch = useDispatch();

  //TODO a more complete list to store in the database?

  if (!currentUser) history.push(`/`);
  const handleInput = (e) => {
    const textInput = e.target.value;
    setText(textInput);
  }
  const handleSubmit = (e) =>  {
    e.preventDefault();
    //TODO database insertion here
    //TODO send to edit menu page
    addNewCategory(text.toUpperCase());
    setText('');
  }

  const userGreetingMessage = () => {
    return (
      <React.Fragment>
        <h1>
          {currentUser.localName} {currentUser.localType}
        </h1>
      </React.Fragment>
    )
  };
  
  const defaultGreeting = () => {
    return (
      <React.Fragment>
        <h1>
          Restaurant
        </h1>
      </React.Fragment>
    )
  };
      

  return (
    <div className="category-container">
      <div className="local-title">
        {currentUser ? userGreetingMessage() : defaultGreeting()}
      </div>
      <label htmlFor="category">Create a New Catergory</label>
      <form onSubmit={handleSubmit} className="category-form">
        <input type="submit" value="+" />
        <input 
          type="text" 
          name="categoryName"
          placeholder="Insert a Category Name..." 
          value={text} 
          onChange={handleInput}
        ></input>
      </form>
    </div>
  );
}

export default Category;