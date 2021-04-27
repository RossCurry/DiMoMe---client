import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react'
import './itemDetailDisplay.styles.scss'


function ItemDetailDisplay({itemSavedForDisplay, setToggleState, itemSelected, setState}) {

  // const [ product, setProduct ] = useState(itemSelected ? itemSelected : null)

console.log('itemSelected ', itemSelected);

// <CloudinaryContext 
//         cloudName="dimome" 
//         className="image-background" 
//         style={{backgroundImage: `url(${url})`}}
//         // style={`{backgroundImage: url(${< Image publicId={itemSavedForDisplay.public_id} />})}`}
//       >
//         {/* < Image publicId={itemSavedForDisplay.public_id} />  */}
      
//       </CloudinaryContext>


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
      <div className="row-2-display-item-display-item">
        <div className="col-1-bottom-left-display-item"></div>
        <div className="col-2-bottom-right-display-item">
          <div className="item-info">
            <div>
              <h1>{itemSavedForDisplay.itemName}</h1>
              <p>{itemSavedForDisplay.description}</p>
            </div>
            <div className="allergen-price">
              
                <div className="allergens-type">
                  {itemSavedForDisplay.allergyContent.map(allergy => <p key={allergy.name}>{allergy.name}</p>)}
                </div>
             
              <div>
                <h2>€{itemSavedForDisplay.itemPrice}</h2>
              </div>

            </div>
              <button onClick={() => setState('edit')} className="edit-item-btn">Edit Item</button>
          </div>
        </div>
      </div>
    </div>
  )
  }


  const renderDisplayOnSelect = () => {
    console.log('display rendered');
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
                    <h3>Allergen types:</h3>
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

  const renderPageLoading = () => {
    return (
      <div><h1>Page Loading...one sec</h1></div>
    )
  }

  // const defaultDisplay = () => {
  //   return (
  //     <div className="item-detail-container">
  //       <h2 className="section-title">No item selected yet</h2>
        
  //     </div>
  //   )
  // }

  return (
    <React.Fragment>
      { itemSavedForDisplay ? renderDisplayOnSave() : renderDisplayOnSelect()}
    </React.Fragment>
  );
}

export default ItemDetailDisplay;