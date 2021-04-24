import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './EditMenu.styles.scss';
import { newCategoryDB } from '../../ApiService';

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
    console.log('handlemenu item');
    setItemSelected(menuItem);
  }

  // send to API
  const addNewCategory = (newCategory) => {

    //TODO has fake stats so far
    const categoryObj = {
      categoryName: newCategory,
      userId: currentUser._id 
    };
    const storedCategory = newCategoryDB(categoryObj);
    const currentList = [...categoryList]
    currentList.push(storedCategory)
    setCategoryList(currentList);

    //TODO use dispatch to send to redux store
    // would add DB category to the store
    //dispatch(addCategory(storedCategory));
    //setCategory(initialState);
  }
 
  //send to aPI
  const addMenuItem = (newItem) => {
    const menuItemObj = {
      itemName: newItem,
      itemId: 1,
      description: 'var256',
      itemPrice: 12.95,
      allergyContent: [{}],
      dietaryContent: [{}]
    }
  
    //TODO send to API & return
    const currentList = [...menuItemList]
    currentList.push(menuItemObj)
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