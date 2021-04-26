import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './EditMenu.styles.scss';

// API Services
import { 
  newCategoryDB, 
  newMenuItemDB, 
  editMenuItemDB, 
  fetchAllCategoriesByUserId, 
  fetchAllMenuItemsByUserId 
} from '../../ApiService';

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

  // category selected 
  const [ categorySelected, setCategorySelected ] = useState(null);

//TODO try to figure out how to re-render
  // indicates a selected item in category list
  const handleSelected = (category) => {
    console.log('e.target', category);
    category.selected = !category.selected;
    setCategorySelected(category);
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

    console.log('addMenuItem category', categorySelected._id );

    const menuItemObj = {
      itemName: newItem,
      description: 'Write a small description of the product here...',
      itemPrice: 0,
      allergyContent: [],
      dietaryContent: [],
      userId: currentUser._id,
      categoryId: categorySelected._id
    }

    console.log('menuItem to send to DB', menuItemObj);
    const storedMenuItem = await newMenuItemDB(menuItemObj);
    const currentList = [...menuItemList]
    currentList.push(storedMenuItem)
    setMenuItemList(currentList);
  };

  // send to API to Edit Item
  const editMenuItem = async (menuItem) => {
    console.log('editMenuItem', menuItem);
    //SEND TO API
    const editedItem = await editMenuItemDB(menuItem);
    console.log('editedItem', editedItem);

    //TODO client side, RELOAD DATA TO ANOTHER COMPONENT TO LOAD: eg. PRODUCT DISPLAY COMP.
  };



  const fetchAllCategories = async () => {
    const allCategories = await fetchAllCategoriesByUserId(currentUser._id);
    console.log('allCategories fetched', allCategories);
    setCategoryList(allCategories);

    // // auto select a category to avoid errores
    // const autoSelectCategory = async () => {
    //   const [firstCategory] =  await categoryList;
    //   setCategorySelected(firstCategory);
    //   console.log('category autoSelected ', firstCategory);
    //   console.log('category selected ', categorySelected);
    // }
    // autoSelectCategory();
  }

  const fetchAllMenuItems = async () => {
    const allMenuItems = await fetchAllMenuItemsByUserId(currentUser._id);
    console.log('MenuItems fetched', allMenuItems);
    setMenuItemList(allMenuItems);
  }

  useEffect(()=>{
    //fetchAllCategoriesWithUserID
    //fetchAllMenuItemsWithUserID
    fetchAllCategories();
    fetchAllMenuItems();
  }, [])

  return (
    <div className="edit-menu-container">
      {/* <Category addNewCategory={addNewCategory} /> */}
      <MenuItem 
        categoryList={categoryList}
        menuItemList={menuItemList}
        addMenuItem={addMenuItem}
        handleSelected={handleSelected}
        handleMenuItem={handleMenuItem}
        itemSelected={itemSelected}
        editMenuItem={editMenuItem}
      />
      {/* 
      //TODO send only the selected item
      */}
      {/* <ItemDetail 
        itemSelected={itemSelected}
        editMenuItem={editMenuItem}
      /> */}
    </div>
  );
}

export default EditMenu;