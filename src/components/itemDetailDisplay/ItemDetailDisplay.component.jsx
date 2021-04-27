import React from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react'
import './itemDetailDisplay.styles.scss'


function ItemDetailDisplay({itemSavedForDisplay}) {

  const url = 'https://conelmorrofino.com/wp-content/uploads/2019/06/Gobu-Burger-Madrid-Portada.jpg'


// <CloudinaryContext 
//         cloudName="dimome" 
//         className="image-background" 
//         style={{backgroundImage: `url(${url})`}}
//         // style={`{backgroundImage: url(${< Image publicId={itemSavedForDisplay.public_id} />})}`}
//       >
//         {/* < Image publicId={itemSavedForDisplay.public_id} />  */}
      
//       </CloudinaryContext>



  const renderDisplay = () => {
    console.log('display rendered');
    return (
      <div 
        className="item-detail-display-container" 
        style={{ backgroundImage: `url(${itemSavedForDisplay.imageUrl})` }}
      >
        <div className="row-1">
          <div className="col-1-top-left"></div>
          <div className="col-2-top-right"></div>
        </div>
        <div className="row-2">
          <div className="col-1-bottom-left"></div>
          <div className="col-2-bottom-right">
            <div className="item-info">
              <div>
                <h1>{itemSavedForDisplay.itemName}</h1>
                <p>{itemSavedForDisplay.description}</p>
              </div>
              <div className="allergen-price">
                
                  <div>🍈 🥑 🥦
                  //todo replace with ICONS
                    {itemSavedForDisplay.allergyContent.map(allergy => <p key={allergy.name}>{allergy.name}</p>)}
                  </div>
               
                <div>
                  <h2>€{itemSavedForDisplay.itemPrice}</h2>
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