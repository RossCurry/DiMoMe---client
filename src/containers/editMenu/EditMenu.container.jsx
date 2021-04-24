import React from 'react';
import { useSelector } from 'react-redux'
import './EditMenu.styles.scss'

//COMPONENTS
import Category from '../../components/categories/Category.component'
import MenuItem from '../../components/menuItem/MenuItem.component'
import ItemDetail from '../../components/itemDetail/ItemDetail.component'

function EditMenu(props) {

  

  return (
    <div className="edit-menu-container">
      <Category />
      <MenuItem />
      <ItemDetail />
    </div>
  );
}

export default EditMenu;