import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MenuItem.styles.scss'


function MenuItem({ categoryList, addMenuItem, menuItemList }) {

  const [text, setText] = useState('');
  

  const handleInput = (e) => {
    const textInput = e.target.value;
    setText(textInput);
  }
  
  const handleSubmit = (e) =>  {
    e.preventDefault();
    //TODO database insertion here
    // validation of some sort
    //TODO send to edit menu page
    addMenuItem(text)
    setText('');
  }



  const categoryNames = categoryList.map( category => (
    //TODO make a categoryItem component for each iteration
      <div 
        key={category.categoryId}
        className="category-card"
      >
        {category.categoryName}
      </div>
    )
  )

 const menuItemNames = menuItemList.map( item => 
      <div 
        key={item.itemId+item.itemName}
        className="menu-item-label"
      >
        {item.itemName}
      </div>
  )

  return (
    <React.Fragment>
      <div className="menu-item-container">
        {/*
        //TODO delete me
        */}
        <h2>List of categories from props</h2>

       <div className="category-list">
        {categoryNames}
       </div>

       <form 
        onSubmit={handleSubmit} 
        className="menu-item-form">
          <label for="menuItemInput">
            Create a new menu item here
          </label>
          <input 
            type="text" 
            name="menuItemInput" 
            id="menuItemInput"
            placeholder="Type your menu item here..."
            value={text}
            onChange={handleInput}
          />
          <input 
            type="submit" 
            value="Add Item"
        />
       </form>
       <div className="menu-item-list">
         <h3>List of items added</h3>
         {menuItemNames}
       </div>


      </div>
    </React.Fragment>
  );
}

export default MenuItem;