/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import './MenuItem.styles.scss';
import Category from '../categories/Category.component';
import CategoryItem from '../catergoryItem/CategoryItem.componet';
import ItemDetail from '../itemDetail/ItemDetail.component';
import ItemDetailDisplay from '../itemDetailDisplay/ItemDetailDisplay.component';
import SelectItem from '../selectItem/SelectItem.component';
import { newCategoryDB } from '../../ApiService';
import { addNewCategoryToStore } from '../../redux/reducers/categorySlice';
import { categoryFromDB, menuItemFromDB } from '../../types/customTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

interface MenuItemProps {
  addMenuItem: (text: string) => void;
  menuItemList: menuItemFromDB[] | undefined;
  handleMenuItem: (item: menuItemFromDB) => void;
  itemSelected: menuItemFromDB | undefined;
  editMenuItem: (item: menuItemFromDB) => void;
  itemSavedForDisplay: menuItemFromDB | undefined;
  stateValue: string;
  setState: Dispatch<SetStateAction<string>>;
}

const MenuItem = ({
  addMenuItem,
  menuItemList,
  handleMenuItem,
  itemSelected,
  editMenuItem,
  itemSavedForDisplay,
  stateValue,
  setState,
}: MenuItemProps): JSX.Element => {
  const [text, setText] = useState('' as string);
  const [categoryList, setCategoryList] = useState<categoryFromDB[]>();
  const [selectedCategory, setSelectedCategory] = useState<categoryFromDB>();
  const categories = useAppSelector((state) => state.category);
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

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
  useEffect(() => {
    setCategoryList(categories);
  }, [categories]);
  // TODO handleSelected appears to break the code
  const handleSelected = (category: categoryFromDB): void => {
    category.selected = !category.selected;
    if (categoryList) {
      const newList = categoryList.map((item) => {
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
  const addNewCategory = async (newCat: string): Promise<void> => {
    const categoryObj = {
      categoryName: newCat,
      userId: user._id,
    };
    const storedCategory = await newCategoryDB(categoryObj);
    if (storedCategory) {
      if (categoryList) {
        dispatch(addNewCategoryToStore(storedCategory));
      }
    }
  };

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
            {stateValue === 'view' && itemSavedForDisplay && itemSelected ? (
              <ItemDetailDisplay
                itemSavedForDisplay={itemSavedForDisplay}
                itemSelected={itemSelected}
                setState={setState}
              />
            ) : null}
            {stateValue === 'edit' && itemSelected ? (
              <ItemDetail
                itemSelected={itemSelected}
                editMenuItem={editMenuItem}
                setState={setState}
              />
            ) : null}
            {stateValue === 'select' && <SelectItem />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
