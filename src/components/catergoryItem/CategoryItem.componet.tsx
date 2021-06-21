/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './CategoryItem.styles.scss';
import { categoryFromDB } from '../../types/customTypes';

type CategoryItemProps = {
  category: categoryFromDB;
  // TODO use correct TYPING
  handleSelected: (category: categoryFromDB) => void;
};

const CategoryItem = ({
  category,
  handleSelected,
}: CategoryItemProps): JSX.Element => {
  return (
    <div
      key={category._id}
      onClick={() => handleSelected(category)}
      className={
        // TODO I added a selected property in the front end. needs to be addressed.
        category.selected ? 'category-card border-select' : 'category-card'
      }
    >
      {category.categoryName}
    </div>
  );
};

export default CategoryItem;
