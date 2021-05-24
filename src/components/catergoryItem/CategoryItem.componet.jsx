import React from 'react';
import './CategoryItem.styles.scss'

function CategoryItem({ category, handleSelected }) {
  return (
    <div
      key={category.categoryId}
        onClick={ () => handleSelected(category)}
        className={
          category.selected 
          ? "category-card border-select" 
          : "category-card"
        }
      >
        {category.categoryName}
    </div>
  );
}

export default CategoryItem;