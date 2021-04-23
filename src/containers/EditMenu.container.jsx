import React from 'react';
import './EditMenu.styles.scss'

//COMPONENTS
import Category from '../components/Category.component'
import MenuItem from '../components/MenuItem.component'
import ItemDetail from '../components/ItemDetail.component'

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