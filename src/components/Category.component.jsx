import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../redux/actions'
import './Category.styles.scss'

function Category(props) {
  
  const userMenu = useSelector(state => state.userMenu);
  const currentUser = useSelector(state => state.currentUser.user)
  const dispatch = useDispatch();

  const initialState = {
    categoryName: '',
    userId: currentUser.id || 0 
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
    // validation of some sort
    // send category to DB
    console.log('category to send to DB', category);
    dispatch(addCategory(category));
    setCategory(initialState);
    console.log('userMenu: ', userMenu);
  }


  return (
    <div className="category-container">
      <form onSubmit={handleSubmit} className="category-form">
        <h2>im the Category list</h2>
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

      <div className="category-list">
        {userMenu.map(category => (
          <div>{category.categoryName}</div>
        ))}  
      </div>

    </div>
  );
}

export default Category;