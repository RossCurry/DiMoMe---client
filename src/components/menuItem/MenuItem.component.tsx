/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import './MenuItem.styles.scss';
import Category from '../categories/Category.component';
import CategoryItem from '../catergoryItem/CategoryItem.componet';
import ItemDetail from '../itemDetail/ItemDetail.component';
import ItemDetailDisplay from '../itemDetailDisplay/ItemDetailDisplay.component';
import SelectItem from '../selectItem/SelectItem.component';
import { categoryFromDB, newCategory, menuItemFromDB } from '../../ApiService';

interface MenuItemProps {
  addNewCategory: newCategory;
  categoryList: categoryFromDB[];
  addMenuItem: (text: string) => void;
  menuItemList: menuItemFromDB[];
  handleSelected: () => void;
  handleMenuItem: (item: menuItemFromDB) => void;
  itemSelected: menuItemFromDB;
  editMenuItem: (item: menuItemFromDB) => void;
  itemSavedForDisplay: menuItemFromDB;
  selectedCategory: categoryFromDB;
  state: string;
  setState: () => void;
}

const MenuItem = ({
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
  setState,
}: MenuItemProps): JSX.Element => {
  const [text, setText] = useState('' as string);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const textInput = e.target.value;
    setText(textInput);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!text) return;
    // TODO database insertion here
    // TODO send to edit menu page
    addMenuItem(text);
    setText('');
  };

  const categoryNames = categoryList.map((category) => (
    // TODO toggle selected category in the array
    <CategoryItem
      key={category._id}
      category={category}
      handleSelected={handleSelected}
    />
  ));

  const menuItemNames = menuItemList.map((item) => {
    if (item.categoryId === selectedCategory._id) {
      return (
        <button
          type="button"
          key={item._id}
          className="menu-item-label"
          onClick={() => handleMenuItem(item)}
        >
          {item.itemName}
        </button>
      );
    }
    return null;
  });

  return (
    <>
      <div className="menu-item-container">
        <div className="row-1">
          {/* TS forced me to add a new div, might cause CSS issues */}
          <div className="col-1">
            <Category addNewCategory={addNewCategory} />
          </div>
          <div className="category-list">{categoryNames}</div>
        </div>
        <div className="row-2">
          <div className="col-1">
            <form onSubmit={handleSubmit} className="menu-item-form">
              <label htmlFor="menuItemInput">
                Add a new item
                <input type="submit" value="+" />
                <input
                  type="text"
                  name="menuItemInput"
                  id="menuItemInput"
                  placeholder="Type new items here..."
                  value={text}
                  onChange={handleInput}
                />
              </label>
            </form>
            <div className="menu-item-list">
              <h2 className="label-title">
                {selectedCategory
                  ? selectedCategory.categoryName
                  : 'Select a category'}
              </h2>
              {menuItemNames}
            </div>
          </div>
          <div className="col-2">
            {state === 'view' && (
              <ItemDetailDisplay
                itemSavedForDisplay={itemSavedForDisplay}
                itemSelected={itemSelected}
                setState={setState}
              />
            )}
            {state === 'edit' && (
              <ItemDetail
                itemSelected={itemSelected}
                editMenuItem={editMenuItem}
                setState={setState}
              />
            )}
            {state === 'select' && <SelectItem />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
