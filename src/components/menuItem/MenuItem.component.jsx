import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MenuItem.styles.scss'

//COMPONENTS
import ItemDetail from '../itemDetail/ItemDetail.component'
import CategoryItem from '../catergoryItem/CategoryItem.componet';
import ItemDetailDisplay from '../itemDetailDisplay/ItemDetailDisplay.component'
import SelectItem from '../selectItem/SelectItem.component'


function MenuItem({ 
  categoryList, 
  addMenuItem, 
  menuItemList, 
  handleSelected, 
  handleMenuItem,
  itemSelected,
  editMenuItem,
  itemSavedForDisplay,
  selectedCategory,
  state,
  setState }) 
  {

  // states
  //user input on menu item form
  const [text, setText] = useState('');
  
  

  const [ selectItem , setSelectItem ] = useState(null);

  const handleInput = (e) => {
    const textInput = e.target.value;
    setText(textInput);
  }
  
  const handleSubmit = (e) =>  {
    e.preventDefault();
    if (!text) return;
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

 const menuItemNames = menuItemList.map( item => {

  // IF MENU ITEM HAS THE SAME CATEGORY ID AS THE SELECTED ONE THEN MAP
      if (item.categoryId === selectedCategory._id){
      return (<div 
        key={item._id}
        className="menu-item-label"
        onClick={() => handleMenuItem(item)}
      >
        {item.itemName}
      </div>)
      } 

 });

 


  return (
    <React.Fragment>
      <div className="menu-item-container">

        <div className="row-1">
          <div className="category-list">
            {categoryNames}
          </div>
        </div>
        <div className="row-2">

          <div className="col-1">
              <label for="menuItemInput">
                Add a new item
              </label>
            <form
              onSubmit={handleSubmit}
              className="menu-item-form">
                <input
                  type="submit"
                  value="+"
                />
              <input
                type="text"
                name="menuItemInput"
                id="menuItemInput"
                placeholder="Type new items here..."
                value={text}
                onChange={handleInput}
              />
            </form>
            <div className="menu-item-list">
              {/*}
              //TODO insert selected category name
      */}
              <h2 className="label-title">{selectedCategory ? selectedCategory.categoryName : 'Select a category'}</h2>
              {menuItemNames}
            </div>
          </div>

          <div className="col-2">
            {/* {toggleState && itemSavedForDisplay */}
            {state === 'view' && 
            (<ItemDetailDisplay 
              itemSavedForDisplay={itemSavedForDisplay}
              itemSelected={itemSelected}
              setState={setState}/>
            )}
            {state === 'edit' && 
            (<ItemDetail
            itemSelected={itemSelected}
            editMenuItem={editMenuItem}
            setState={setState}/>
            )}
            {state === 'select' && (
            <SelectItem />
            )}
           
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}

export default MenuItem;