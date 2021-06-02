import React, { useEffect } from 'react';
import './itemDetailDisplay.styles.scss';

function ItemDetailDisplay({itemSavedForDisplay, setToggleState, itemSelected, setState}) {
useEffect( () => {
  renderDisplayOnSelect()
}, [itemSelected])

  const renderDisplayOnSave = () => {
    return (
      <div
        className="item-detail-display-container"
        style={{ backgroundImage: `url(${itemSavedForDisplay.imageUrl})` }}
      >
        <div className="row-1-display-item">
          <div className="col-1-top-left-display-item"></div>
          <div className="col-2-top-right-display-item"></div>
        </div>
        <div className="row-2-display-item">
          <div className="col-1-bottom-left-display-item"></div>
          <div className="col-2-bottom-right-display-item">
            <div className="item-info">
              <div>
                <h1>{itemSavedForDisplay.itemName}</h1>
                <p>{itemSavedForDisplay.description}</p>
              </div>
              <div className="allergen-price">
                <div>
                  <h3>{itemSavedForDisplay.allergyContent.length > 0 ? 'Allergen types:' : ''}</h3>
                  {itemSavedForDisplay.allergyContent.map(allergy => <p key={allergy.name}>{allergy.name}</p>)}
                </div>
                <div>
                  <h2>€{itemSavedForDisplay.itemPrice}</h2>
                </div>
              </div>
              <button
                onClick={() => setState('edit')}
                className="edit-item-btn"
              >
                Edit Item</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderDisplayOnSelect = () => {
    return (
      <div
        className="item-detail-display-container"
        style={{ backgroundImage: `url(${itemSelected.imageUrl})` }}
      >
        <div className="row-1-display-item">
          <div className="col-1-top-left-display-item"></div>
          <div className="col-2-top-right-display-item"></div>
        </div>
        <div className="row-2-display-item">
          <div className="col-1-bottom-left-display-item"></div>
          <div className="col-2-bottom-right-display-item">
            <div className="item-info">
              <div>
                <h1>{itemSelected.itemName}</h1>
                <p>{itemSelected.description}</p>
              </div>
              <div className="allergen-price">

                <div>
                  <h3>{itemSelected.allergyContent.length > 0 ? 'Allergen types:' : ''}</h3>
                  {itemSelected.allergyContent.map(allergy => <p key={allergy.name}>{allergy.name}</p>)}
                </div>

                <div>
                  <h2>€{itemSelected.itemPrice}</h2>
                </div>

              </div>
              <button
                onClick={() => setState('edit')}
                className="edit-item-btn"
              >
                Edit Item</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      { itemSavedForDisplay ? renderDisplayOnSave() : renderDisplayOnSelect()}
    </React.Fragment>
  );
}

export default ItemDetailDisplay;