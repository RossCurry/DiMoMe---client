import React from 'react';
import './ItemDetail.styles.scss'

function ItemDetail({ itemSelected }) {

  const defaultDisplay = () => {
    return (
      <div>
        <h2>No item selected yet</h2>
      </div>
    )
  }
  const displaySelectedItem = () => {
    return (
      <div className="item-detail-container">
        <h2>Im the menu detail</h2>
        <div>{itemSelected.itemName}</div>
      </div>
    )
  }
  

  return (
    <React.Fragment>
      { itemSelected ? displaySelectedItem() : defaultDisplay() }
    </React.Fragment>
    // <div className="item-detail-container">
    //   <h2>Im the menu detail</h2>
    //   <div>{itemSelected.itemName}</div>
    // </div>
  );
}

export default ItemDetail;