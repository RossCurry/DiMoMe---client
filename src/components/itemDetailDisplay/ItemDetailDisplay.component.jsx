import React from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react'
import './itemDetailDisplay.styles.scss'

function ItemDetailDisplay({itemSavedForDisplay}) {


  const renderDisplay = () => {
    console.log('display rendered');
    return (
      <div className="item-detail-display-container">
      container
      <CloudinaryContext cloudName="dimome" className="image-background">
        < Image publicId={itemSavedForDisplay.public_id} />
      </CloudinaryContext>
       
      <div className="row-1">row1
        <div className="col-1-top-left">topleft</div>
        <div className="col-2-top-right">topright</div>
      </div>
      <div className="row-2">row2
        <div className="col-1-bottom-left">bottomleft</div>
        <div className="col-2-bottom-right">
          <div className="item-info">
              <h1>{itemSavedForDisplay.itemName}</h1>
              <p>{itemSavedForDisplay.description}</p>
              <div className="allergen-price">
                <div>
                  <p>🍈 🥑 🥦
                    //todo replace with ICONS
                    {itemSavedForDisplay.allergyContent.map( allergy => <div key={allergy.name}>{allergy.name}</div> )}
                  </p>
                </div>
                <div>
                  <h2>{itemSavedForDisplay.itemPrice}</h2>
                </div>
              </div>
            </div>  
          </div>
      </div>
    </div>
    )
  }

  const renderPageLoading = () => {
    return (
      <div><h1>Page Loading...one sec</h1></div>
    )
  }

  return (
    <React.Fragment>
      {  itemSavedForDisplay ? renderDisplay() : renderPageLoading()}
    </React.Fragment>
  );
}

export default ItemDetailDisplay;