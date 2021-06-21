import React, { useEffect } from 'react';
import './itemDetailDisplay.styles.scss';
import { menuItemFromDB, newMenuItem } from '../../types/customTypes';

// interface IProps {
//   itemSavedForDisplay: menuItemFromDB;
//   setToggleState: boolean;
//   itemSelected: menuItemFromDB;
//   // TODO give this useState an interface so TS can infer the type
//   setState: string;
// }

interface IProps {
  itemSavedForDisplay: menuItemFromDB;
  itemSelected: menuItemFromDB;
  setState: (state: string) => void;
}

const ItemDetailDisplay = ({
  itemSavedForDisplay,
  itemSelected,
  setState,
}: IProps): JSX.Element => {
  const renderDisplayOnSave = (): JSX.Element => {
    return (
      <div
        className="item-detail-display-container"
        style={{ backgroundImage: `url(${itemSavedForDisplay.imageUrl})` }}
      >
        <div className="row-1-display-item">
          <div className="col-1-top-left-display-item" />
          <div className="col-2-top-right-display-item" />
        </div>
        <div className="row-2-display-item">
          <div className="col-1-bottom-left-display-item" />
          <div className="col-2-bottom-right-display-item">
            <div className="item-info">
              <div>
                <h1>{itemSavedForDisplay.itemName}</h1>
                <p>{itemSavedForDisplay.description}</p>
              </div>
              <div className="allergen-price">
                <div>
                  <h3>
                    {itemSavedForDisplay.allergyContent.length > 0
                      ? 'Allergen types:'
                      : ''}
                  </h3>
                  {itemSavedForDisplay.allergyContent.map((allergy) => (
                    <p key={allergy.name}>{allergy.name}</p>
                  ))}
                </div>
                <div>
                  <h2>
                    <p>€</p>
                    {itemSavedForDisplay.itemPrice}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={(): void => {
                  setState('edit');
                }}
                className="edit-item-btn"
              >
                Edit Item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDisplayOnSelect = (): JSX.Element => {
    return (
      <div
        className="item-detail-display-container"
        style={{ backgroundImage: `url(${itemSelected.imageUrl})` }}
      >
        <div className="row-1-display-item">
          <div className="col-1-top-left-display-item" />
          <div className="col-2-top-right-display-item" />
        </div>
        <div className="row-2-display-item">
          <div className="col-1-bottom-left-display-item" />
          <div className="col-2-bottom-right-display-item">
            <div className="item-info">
              <div>
                <h1>{itemSelected.itemName}</h1>
                <p>{itemSelected.description}</p>
              </div>
              <div className="allergen-price">
                <div>
                  <h3>
                    {itemSelected.allergyContent.length > 0
                      ? 'Allergen types:'
                      : ''}
                  </h3>
                  {itemSelected.allergyContent.map((allergy) => (
                    <p key={allergy.name}>{allergy.name}</p>
                  ))}
                </div>

                <div>
                  <h2>
                    <p>€</p>
                    {itemSelected.itemPrice}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setState('edit')}
                className="edit-item-btn"
              >
                Edit Item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    renderDisplayOnSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected]);
  return (
    <>{itemSavedForDisplay ? renderDisplayOnSave() : renderDisplayOnSelect()}</>
  );
};

export default ItemDetailDisplay;
