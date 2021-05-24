import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MenuItem.styles.scss'
import Category from '../categories/Category.component'
import CategoryItem from '../catergoryItem/CategoryItem.componet';
import ItemDetail from '../itemDetail/ItemDetail.component'
import ItemDetailDisplay from '../itemDetailDisplay/ItemDetailDisplay.component'
import SelectItem from '../selectItem/SelectItem.component'


function MenuItem({ 
  addNewCategory,
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
        <Category addNewCategory={addNewCategory} className="col-1" />
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
              <h2 className="label-title">{selectedCategory ? selectedCategory.categoryName : 'Select a category'}</h2>
              {menuItemNames}
            </div>
          </div>
          <div className="col-2">
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