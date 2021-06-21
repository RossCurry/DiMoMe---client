/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './EditMenu.styles.scss';
import {
  newMenuItemDB,
  editMenuItemDB,
  fetchAllMenuItemsByUserId,
} from '../../ApiService';
import {
  categoryFromDB,
  menuItemFromDB,
  newCategory as newCategoryType,
  newMenuItem as newMenuItemType,
} from '../../types/customTypes';
import MenuItem from '../../components/menuItem/MenuItem.component';
import { useAppSelector } from '../../redux/hooks';

const EditMenu = (): JSX.Element => {
  const { user } = useAppSelector((state) => state);
  const history = useHistory();
  useEffect(() => {
    if (user._id === 0) history.push('/login');
  }, [user, history]);

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
          currentList.push(storedMenuItem);
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

  const fetchAllMenuItems = async (): Promise<void> => {
    const allMenuItems = await fetchAllMenuItemsByUserId(user._id);
    if (allMenuItems) {
      setMenuItemList(allMenuItems);
    }
  };

  useEffect((): void => {
    // eslint-disable-next-line no-void
    void fetchAllMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="edit-menu-container">
      <MenuItem
        menuItemList={menuItemList}
        addMenuItem={addMenuItem}
        handleMenuItem={handleMenuItem}
        itemSelected={itemSelected}
        editMenuItem={editMenuItem}
        itemSavedForDisplay={itemSavedForDisplay}
        stateValue={state}
        setState={setState}
      />
    </div>
  );
};

export default EditMenu;
