/* eslint-disable no-underscore-dangle */
import React, { useState, Dispatch, SetStateAction } from 'react';
import './MenuItem.styles.scss';
import Category from '../categories/Category.component';
import CategoryItem from '../catergoryItem/CategoryItem.componet';
import ItemDetail from '../itemDetail/ItemDetail.component';
import ItemDetailDisplay from '../itemDetailDisplay/ItemDetailDisplay.component';
import SelectItem from '../selectItem/SelectItem.component';
import {
  categoryFromDB,
  newCategory,
  menuItemFromDB,
} from '../../types/customTypes';

interface MenuItemProps {
  addNewCategory: (newCategory: string) => void;
  categoryList: categoryFromDB[] | undefined;
  addMenuItem: (text: string) => void;
  menuItemList: menuItemFromDB[] | undefined;
  handleSelected: (category: categoryFromDB) => void;
  handleMenuItem: (item: menuItemFromDB) => void;
  itemSelected: menuItemFromDB | undefined;
  editMenuItem: (item: menuItemFromDB) => void;
  itemSavedForDisplay: menuItemFromDB | undefined;
  selectedCategory: categoryFromDB | undefined;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
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

  const categoryNames = categoryList
    ? categoryList.map((category) => (
        // TODO toggle selected category in the array
        <CategoryItem
          key={category._id}
          category={category}
          handleSelected={handleSelected}
        />
      ))
    : null;

  const menuItemNames = menuItemList
    ? menuItemList.map((item) => {
        if (selectedCategory) {
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
        }
        return null;
      })
    : null;

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
            {state === 'view' && itemSavedForDisplay && itemSelected ? (
              <ItemDetailDisplay
                itemSavedForDisplay={itemSavedForDisplay}
                itemSelected={itemSelected}
                setState={setState}
              />
            ) : null}
            {state === 'edit' && itemSelected ? (
              <ItemDetail
                itemSelected={itemSelected}
                editMenuItem={editMenuItem}
                setState={setState}
              />
            ) : null}
            {state === 'select' && <SelectItem />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
