import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../redux/actions'
import { newCategoryDB } from '../ApiService';
import './Category.styles.scss'

function Category(props) {
  
  const userMenu = useSelector(state => state.userMenu);
  const currentUser = useSelector(state => state.currentUser.user)
  const history = useHistory();
  const dispatch = useDispatch();
  //TODO a more complete list to store in the database?
  const defaultCategories = ['starters', 'Mains', 'Desserts', 'Drinks', 'Coffees', 'Teas']

  if (!currentUser) history.push(`/login`);

  const initialState = {
    categoryName: '',
    userId: 0 
  };
  
  const [category, setCategory] = useState(initialState)
  

  const handleInput = (e) => {
    const { value } = e.target;
    setCategory(prevState => ({
      ...prevState,
      categoryName: value
    }));
  }

  const handleSubmit = (e) =>  {
    e.preventDefault();
    //TODO database insertion here
    // validation of some sort
    // send category to DB
    const storedCategory = newCategoryDB(category);
    // would add DB category to the store
    dispatch(addCategory(storedCategory));
    setCategory(initialState);
  }


  return (
    <div className="category-container">

      <div className="local-title">
        <h1>
        {currentUser.localName} {currentUser.localType}
        </h1>
        <p>
          {currentUser.name}, use the form below to add categories to your menu
        </p>
      </div>

      <form onSubmit={handleSubmit} className="category-form">
        <label for="category">Create a New Catergory</label>
        <input 
          type="text" 
          name="categoryName"
          placeholder="Insert a Category Name..." 
          value={category.categoryName} 
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