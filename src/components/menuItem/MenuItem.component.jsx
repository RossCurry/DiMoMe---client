import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MenuItem.styles.scss'


function MenuItem({ categoryList }) {


  console.log('categoryList', categoryList);
  const renderCategories = () => {
    return (
      <React.Fragment>
        {categoryList.map( (category) => { 
          return (
            <div key={category.categoryId}>{category.categoryName}</div>
          )
        })}
      </React.Fragment>
    )
  }

  const categoryItems = categoryList.map( category => (
    //TODO make a categoryItem component for each iteration
      <div 
        key={category.categoryId}
        className="category-card"
      >
        {category.categoryName}
      </div>
    )
  )

  return (
    <React.Fragment>
      <div className="menu-item-container">
       <div className="category-list">
        <h2>List of categories from props</h2>
        <h3>{categoryItems}</h3>
       </div>
       <button>add new item</button>
       <div>List of items added</div>


      </div>
    </React.Fragment>
  );
}

export default MenuItem;