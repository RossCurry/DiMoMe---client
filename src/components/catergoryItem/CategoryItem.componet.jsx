import React from 'react';
import './CategoryItem.styles.scss'

function CategoryItem({ category, handleSelected, selectedCategory, setSelectedCategory }) {

  return (
    <div
      key={category.categoryId}
        // className="category-card border-select"
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