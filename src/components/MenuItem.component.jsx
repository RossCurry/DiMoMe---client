import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MenuItem.styles.scss'

const selectAllCategories = state => state.userMenu;

function MenuItem(props) {

  const categories = useSelector(selectAllCategories);
  
  const renderCategories = categories.map(category => {
    console.log('category', category);
    return <div key={category.categoryId}>{category.categoryName}</div>
  })

  return (
    <React.Fragment>
      <div className="menu-item-container">
        <h1>hello</h1>
        <h2>{renderCategories}</h2>
      </div>
    </React.Fragment>
  );
}

export default MenuItem;