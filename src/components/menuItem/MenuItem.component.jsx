import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//COMPONENTS
import ItemDetail from '../itemDetail/ItemDetail.component'
import CategoryItem from '../catergoryItem/CategoryItem.componet';
import './MenuItem.styles.scss'


function MenuItem({ 
  categoryList, 
  addMenuItem, 
  menuItemList, 
  handleSelected, 
  handleMenuItem,
  itemSelected,
  editMenuItem }) 
  {

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
        {/* <div>
          <h2 className="label-title">
            Your menu catergoies
          </h2>
        </div> */}

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
              <h2 className="label-title">"selected  category"</h2>
              {menuItemNames}
            </div>
          </div>

          <div className="col-2">
            <ItemDetail
              itemSelected={itemSelected}
              editMenuItem={editMenuItem}
            />
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}

export default MenuItem;