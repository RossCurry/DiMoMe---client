import React from 'react';
import './ItemDetail.styles.scss'

function ItemDetail({ itemSelected }) {

  console.log('itemSelected', itemSelected);

  const defaultDisplay = () => {
    return (
      <div className="item-detail-container">
        <h2 className="section-title">No item selected yet</h2>
        
      </div>
    )
  }
  const displaySelectedItem = () => {
    return (
      <div className="item-detail-container">
        <h2 className="section-title">Im the menu detail</h2>
        {editMenuItem()}
      </div>
    )
  }
  
  const editMenuItem = () => {
    return (
      // left side
      <React.Fragment>
        <form>
          <div className="item-detail-sub-container">
            <div className="edit-item-left">
              <h1>{itemSelected.itemName.toUpperCase()}</h1>
              {/* <form
              className="edit-item-form"
            > */}
              <label htmlFor="description">Product description</label>
              <textarea
                type="textarea"
                name="description"
                placeholder="Write a small description of the product here..."
                spellCheck={true}
                wrap="soft"
                maxLength={120}
                rows={4}

              />
              <label htmlFor="product-price">Product price</label>
              <input type="number" placeholder="Insert a price. eg. 2.50" step="0.01" min="0" max="1000" name="product-price"></input>
              {/* <div className="check-box-left">
             
      
            </div> */}
              {/* </form> */}
            </div >
            {/*
          //right side // image and save button
           */}
            <div className="edit-item-right">
              <div className="item-photo">photo here</div>
              {/* <button>Save details</button> */}
              <h3>Select the product allergens</h3>
              <div className="check-box-right">

                <div className="sub-left">
                <input
                  type="checkbox"
                  id="gluten"
                  name="gluten"
                  value="gluten"
                />
                <label for="gluten">Gluten</label>
                <br />
                <input
                  type="checkbox"
                  id="crustaceans"
                  name="crustaceans"
                  value="crustaceans"
                />
                <label for="crustaceans">Crustaceans</label>
<br />
                <input
                  type="checkbox"
                  id="eggs"
                  name="eggs"
                  value="eggs"
                />
                <label for="eggs">Eggs</label>
<br />
                <input
                  type="checkbox"
                  id="fish"
                  name="fish"
                  value="fish"
                />
                <label for="fish">Fish</label>
<br />
                <input
                  type="checkbox"
                  id="peanuts"
                  name="peanuts"
                  value="peanuts"
                />
                <label for="peanuts">Peanuts</label>
<br />
                <input
                  type="checkbox"
                  id="soybeans"
                  name="soybeans"
                  value="soybeans"
                />
                <label for="soybeans">Soybeans</label>
<br />
                <input
                  type="checkbox"
                  id="lactose"
                  name="lactose"
                  value="lactose"
                />
                <label for="lactose">Lactose</label>
<br />
                </div>

                <div className="sub-right">
                <input
                  type="checkbox"
                  id="nuts"
                  name="nuts"
                  value="nuts"
                />
                <label for="nuts">Nuts</label>
<br />
                <input
                  type="checkbox"
                  id="celery"
                  name="celery"
                  value="celery"
                />
                <label for="celery">Celery</label>
<br />
                <input
                  type="checkbox"
                  id="mustard"
                  name="mustard"
                  value="mustard"
                />
                <label for="mustard">Mustard</label>
<br />
                <input
                  type="checkbox"
                  id="sesame"
                  name="sesame"
                  value="sesame"
                />
                <label for="sesame">Sesame seeds</label>
<br />
                <input
                  type="checkbox"
                  id="sulphur"
                  name="sulphur"
                  value="sulphur"
                />
                <label for="sulphur">Sulphites</label>
<br />
                <input
                  type="checkbox"
                  id="lupin"
                  name="lupin"
                  value="lupin"
                />
                <label for="lupin">Lupin </label>
<br />
                <input
                  type="checkbox"
                  id="molluscs"
                  name="molluscs"
                  value="molluscs"
                />
                <label for="molluscs">Molluscs </label>
                </div>


              </div>
              <input type="submit" value="Save details" />
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
     {itemSelected ? displaySelectedItem() : defaultDisplay()}
      

    </React.Fragment>
  );
}

export default ItemDetail;