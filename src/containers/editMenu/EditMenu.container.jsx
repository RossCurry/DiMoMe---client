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
 

  return (
    <div className="edit-menu-container">
      <Category addNewCategory={addNewCategory} />
      <MenuItem categoryList={categoryList}/>
      
      {/* <ItemDetail /> */}
    </div>
  );
}

export default EditMenu;