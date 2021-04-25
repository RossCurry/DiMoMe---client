import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './EditMenu.styles.scss';
import { newCategoryDB, newMenuItemDB } from '../../ApiService';

//COMPONENTS
import Category from '../../components/categories/Category.component'
import MenuItem from '../../components/menuItem/MenuItem.component'
import ItemDetail from '../../components/itemDetail/ItemDetail.component'



function EditMenu(props) {

  // get user details to insert into category
  const currentUser = useSelector(state => state.currentUser.user)
  
  // state for list
  const [ categoryList, setCategoryList ] = useState([]);
  
  // state for menu items
  const [ menuItemList, setMenuItemList ] = useState([]);
  
  // item to send to detail
  const [ itemSelected, setItemSelected ] = useState(null);

//TODO try to figure out how to re-render
  // indicates a selected item in category list
  const handleSelected = (category) => {
    console.log('e.target', category);
    category.selected = !category.selected;
  }

  //send menu item to menu detail comp.
  const handleMenuItem = (menuItem) => {
    setItemSelected(menuItem);
  }

  ///////////////
  // API CALLS //
  ///////////////

  const addNewCategory = async (newCategory) => {

    //Basic category object for DB
    const categoryObj = {
      categoryName: newCategory,
      userId: currentUser._id 
    };

    //Category Object from DB
    const storedCategory = await newCategoryDB(categoryObj);
    // console.log('storedCategory', storedCategory);
    const currentList = [...categoryList]
    currentList.push(storedCategory)
    setCategoryList(currentList);

    //TODO use dispatch to send to redux store
    // would add DB category to the store
    //dispatch(addCategory(storedCategory));
    //setCategory(initialState);
  }
 
  //send to aPI
  const addMenuItem = async (newItem) => {

    const menuItemObj = {
      itemName: newItem,
      description: 'Write a small description of the product here...',
      itemPrice: 0,
      allergyContent: [],
      dietaryContent: []
    }
    const storedMenuItem = await newMenuItemDB(menuItemObj);
    //TODO send to API & return
    const currentList = [...menuItemList]
    currentList.push(storedMenuItem)
    setMenuItemList(currentList);
  };

  return (
    <div className="edit-menu-container">
      <Category addNewCategory={addNewCategory} />
      <MenuItem 
        categoryList={categoryList}
        menuItemList={menuItemList}
        addMenuItem={addMenuItem}
        handleSelected={handleSelected}
        handleMenuItem={handleMenuItem}
      />
      {/* 
      //TODO send only the selected item
      */}
      <ItemDetail itemSelected={itemSelected}/>
    </div>
  );
}

export default EditMenu;