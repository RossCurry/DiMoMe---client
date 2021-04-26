import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from '../catergoryItem/CategoryItem.componet';
import './MenuItem.styles.scss'


function MenuItem({ categoryList, addMenuItem, menuItemList, handleSelected, handleMenuItem }) {

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
    //TODO toggle selected category in the array
      <CategoryItem key={category._id} category={category} handleSelected={handleSelected}/>
    )
  )

 const menuItemNames = menuItemList.map( item => 
      <div 
        key={item._id}
        className="menu-item-label"
        onClick={() => handleMenuItem(item)}
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
        <div>
          <h2 className="label-title">
            Your menu catergoies
          </h2>
        </div>

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
         <h2 className="label-title">Your menu items</h2>
         {menuItemNames}
       </div>


      </div>
    </React.Fragment>
  );
}

export default MenuItem;