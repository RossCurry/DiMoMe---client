/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './EditMenu.styles.scss';
import {
  newCategoryDB,
  newMenuItemDB,
  editMenuItemDB,
  fetchAllCategoriesByUserId,
  fetchAllMenuItemsByUserId,
  categoryFromDB,
  menuItemFromDB,
  newCategory as newCategoryType,
  newMenuItem as newMenuItemType,
} from '../../ApiService';
import MenuItem from '../../components/menuItem/MenuItem.component';
import { useAppSelector } from '../../redux/hooks';

const EditMenu = (): JSX.Element => {
  const { user } = useAppSelector((state) => state);
  const history = useHistory();
  useEffect(() => {
    if (user._id === 0) history.push('/login');
  }, [user, history]);
  // state for list
  const [categoryList, setCategoryList] = useState<categoryFromDB[]>();

  // state for menu items
  const [menuItemList, setMenuItemList] = useState<menuItemFromDB[]>();

  // item to send to detail
  const [itemSelected, setItemSelected] = useState<menuItemFromDB>();

  // category selected
  const [selectedCategory, setSelectedCategory] = useState<categoryFromDB>();

  // edited item returned from DB
  const [itemSavedForDisplay, setItemSavedForDisplay] =
    useState<menuItemFromDB>();

  // state to change edit/view of item
  const [state, setState] = useState<string>('select');

  // TODO try to figure out how to re-render
  const handleSelected = (category: categoryFromDB): void => {
    // eslint-disable-next-line no-param-reassign
    category.selected = !category.selected;
    if (categoryList) {
      const newList = categoryList.map((item) => {
        // eslint-disable-next-line no-underscore-dangle
        if (item._id !== category._id) {
          const modItem = item;
          modItem.selected = false;
          return modItem;
        }
        return item;
      });
      setCategoryList(newList);
      setSelectedCategory(category);
    }
  };

  // send menu item to menu detail comp. & toggle views
  const handleMenuItem = (menuItem: menuItemFromDB): void => {
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

  // API CALLS //

  const addNewCategory = async (newCategory: string): Promise<void> => {
    // Basic category object for DB

    const categoryObj = {
      categoryName: newCategory,
      // eslint-disable-next-line no-underscore-dangle
      userId: user._id,
    };
    // Category Object from DB
    const storedCategory = await newCategoryDB(categoryObj);
    if (storedCategory) {
      if (categoryList) {
        const currentList = [...categoryList];
        currentList.push(storedCategory);
        setCategoryList(currentList);
        // TODO use dispatch to send to redux store
      }
    }
  };

  // send to aPI
  const addMenuItem = async (newItem: string): Promise<void> => {
    if (selectedCategory && user) {
      const menuItemObj = {
        itemName: newItem,
        description: 'Write a small description of the product here...',
        itemPrice: 0,
        userId: user._id,
        categoryId: selectedCategory._id,
      };
      const storedMenuItem = await newMenuItemDB(menuItemObj);
      if (storedMenuItem) {
        if (menuItemList) {
          const currentList = [...menuItemList, storedMenuItem];
          // currentList.push(storedMenuItem);
          setMenuItemList(currentList);
        }
      }
    }
  };

  // send to API to Edit Item
  const editMenuItem = async (menuItem: menuItemFromDB): Promise<void> => {
    const editedItem = await editMenuItemDB(menuItem);
    if (editedItem) setItemSavedForDisplay(editedItem);
  };

  const fetchAllCategories = async (): Promise<void> => {
    await fetchAllCategoriesByUserId(user._id)
      .then((res) => {
        if (res) {
          setCategoryList(res);
          setSelectedCategory(res[0]);
        }
      })
      .catch((err: Error) => console.error({ message: err }));
  };

  const fetchAllMenuItems = async (): Promise<void> => {
    const allMenuItems = await fetchAllMenuItemsByUserId(user._id);
    if (allMenuItems) {
      setMenuItemList(allMenuItems);
    }
  };

  useEffect((): void => {
    // eslint-disable-next-line no-void
    void fetchAllCategories();
    // eslint-disable-next-line no-void
    void fetchAllMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // setSelectedCategory={setSelectedCategory}
        state={state}
        setState={setState}
      />
    </div>
  );
};

export default EditMenu;
