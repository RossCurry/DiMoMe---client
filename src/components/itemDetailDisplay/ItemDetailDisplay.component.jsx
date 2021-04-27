import React from 'react';
import './itemDetailDisplay.styles.scss'

function ItemDetailDisplay(props) {
  return (
    <div className="item-detail-display-container">
      container
      <div className="row-1">row1
        <div className="col-1-top-left">topleft</div>
        <div className="col-2-top-right">topright</div>
      </div>
      <div className="row-2">row2
        <div className="col-1-bottom-left">bottomleft</div>
        <div className="col-2-bottom-right">
          <div className="item-info">
              <h1>Name</h1>
              <p>description</p>
              <div className="allergen-price">
                <div>
                  <p>🍈 🥑 🥦</p>
                </div>
                <div>
                  <h2>n€</h2>
                </div>
              </div>
            </div>  
          </div>
      </div>
      
      
    </div>
  );
}

export default ItemDetailDisplay;