import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/actions'
import { newCategoryDB } from '../../ApiService';
import './Category.styles.scss'

function Category({ addNewCategory }) {
  
  // const userMenu = useSelector(state => state.userMenu);
  const currentUser = useSelector(state => state.currentUser.user)
  const history = useHistory();
  const dispatch = useDispatch();
  //TODO a more complete list to store in the database?
  // const defaultCategories = ['starters', 'Mains', 'Desserts', 'Drinks', 'Coffees', 'Teas']

  if (!currentUser) history.push(`/login`);

  
  const [text, setText] = useState('')
  

  const handleInput = (e) => {
    const textInput = e.target.value;
    setText(textInput);
  }

  const handleSubmit = (e) =>  {
    e.preventDefault();
    //TODO database insertion here
    // validation of some sort
    //TODO send to edit menu page
    addNewCategory(text);
    setText('');
  }

  const userGreetingMessage = () => 
    currentUser 
      ? (<React.Fragment>
        <h1>
            {currentUser.localName} {currentUser.localType}
          </h1>
          <p>
            {currentUser.name}, use the form below to add categories to your menu
          </p>
      </React.Fragment>)
      : (<React.Fragment>
        <h1>
          Restaurant
          </h1>
          <p>
            Use the form below to add categories to your menu
          </p>
      </React.Fragment>)

  return (
    <div className="category-container">

      <div className="local-title">
        {userGreetingMessage}
      </div>

      <form onSubmit={handleSubmit} className="category-form">
        <label for="category">Create a New Catergory</label>
        <input 
          type="text" 
          name="categoryName"
          placeholder="Insert a Category Name..." 
          value={text} 
          onChange={handleInput}
        ></input>
        <input type="submit" value="Add Category" />
      </form>

       {/* <div className="category-list">
        {userMenu.map(category => (
          <div key={category.categoryid}>{category.categoryName}</div>
          ))}  
      </div>  */}

          {/*
          //TODO send to menu item list
      //TODO default options for categories//
      */}

      {/* <div className="category-list">
        {defaultCategories.map((category, index) => (
          <div key={category} className="category-items">{category}</div>
        ))}  
      </div> */}


    </div>
  );
}

export default Category;