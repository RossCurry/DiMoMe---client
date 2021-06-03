import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './EditMenu.styles.scss';
import {
  newCategoryDB,
  newMenuItemDB,
  editMenuItemDB,
  fetchAllCategoriesByUserId,
  fetchAllMenuItemsByUserId,
} from '../../ApiService';
import MenuItem from '../../components/menuItem/MenuItem.component';

function EditMenu(props) {
  // get user details to insert into category
  const currentUser = useSelector((state) => state.currentUser.user);

  // state for list
  const [categoryList, setCategoryList] = useState([]);

  // state for menu items
  const [menuItemList, setMenuItemList] = useState([]);

  // item to send to detail
  const [itemSelected, setItemSelected] = useState(null);

  // category selected
  const [selectedCategory, setSelectedCategory] = useState(null);

  // edited item returned from DB
  const [itemSavedForDisplay, setItemSavedForDisplay] = useState(null);

  // state to change edit/view of item
  const [state, setState] = useState('select');

  //TODO try to figure out how to re-render
  const handleSelected = (category) => {
    category.selected = !category.selected;
    const newList = categoryList.map((item) => {
      if (item._id !== category._id) item.selected = false;
      return item;
    });
    setCategoryList(newList);
    setSelectedCategory(category);
  };

  //send menu item to menu detail comp. & toggle views
  const handleMenuItem = (menuItem) => {
    if (menuItem !== itemSelected) {
      setState('view');
      setItemSelected(menuItem);
    } else if (menuItem === itemSelected && state === 'view') {
      setState('edit');
      setItemSelected(menuItem);
    } else if (menuItem === itemSelected && state === 'edit') {
      setState('view');
      setItemSelected(menuItem);
    }
  };

  ///////////////
  // API CALLS //
  ///////////////

  const addNewCategory = async (newCategory) => {
    //Basic category object for DB
    const categoryObj = {
      categoryName: newCategory,
      userId: currentUser._id,
    };
    //Category Object from DB
    const storedCategory = await newCategoryDB(categoryObj);
    const currentList = [...categoryList];
    currentList.push(storedCategory);
    setCategoryList(currentList);
    //TODO use dispatch to send to redux store
  };

  //send to aPI
  const addMenuItem = async (newItem) => {
    const menuItemObj = {
      itemName: newItem,
      description: 'Write a small description of the product here...',
      itemPrice: 0,
      allergyContent: [],
      dietaryContent: [],
      userId: currentUser._id,
      categoryId: selectedCategory._id,
    };
    const storedMenuItem = await newMenuItemDB(menuItemObj);
    const currentList = [...menuItemList];
    currentList.push(storedMenuItem);
    setMenuItemList(currentList);
  };

  // send to API to Edit Item
  const editMenuItem = async (menuItem) => {
    const editedItem = await editMenuItemDB(menuItem);
    setItemSavedForDisplay(editedItem);
  };

  const fetchAllCategories = async () => {
    await fetchAllCategoriesByUserId(currentUser._id)
      .then((res) => {
        setCategoryList(res);
        setSelectedCategory(res[0]);
      })
      .catch((err) => console.error);
  };

  const fetchAllMenuItems = async () => {
    const allMenuItems = await fetchAllMenuItemsByUserId(currentUser._id);
    setMenuItemList(allMenuItems);
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllMenuItems();
  }, []);

  return (
    <div className="edit-menu-container">
      <MenuItem
        categoryList={categoryList}
        addNewCategory={addNewCategory}
        menuItemList={menuItemList}
        addMenuItem={addMenuItem}
        handleSelected={handleSelected}
        handleMenuItem={handleMenuItem}
        itemSelected={itemSelected}
        editMenuItem={editMenuItem}
        itemSavedForDisplay={itemSavedForDisplay}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        state={state}
        setState={setState}
      />
    </div>
  );
}

export default EditMenu;
