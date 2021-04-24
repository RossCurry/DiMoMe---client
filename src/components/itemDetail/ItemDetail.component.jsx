import React, { useState } from 'react';
import './ItemDetail.styles.scss'

function ItemDetail({ itemSelected }) {

  console.log('itemSelected', itemSelected);


  const initialState = {
    itemName: '',
    description: '',
    itemPrice: 0,
    allergyContent: [],
    dietaryContent: []
  }
  
  const [ product, setProduct ] = useState(initialState)

  //TODO change default to include the layout of the edit item
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
  

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log('name', name);
    console.log('value', value);
    setProduct( prevState => ({
      ...prevState, 
      [name]: value,
    }))
  }
  
  const handleChecked = (e) => {
    // console.log('e.target.value: ', e.target.value);
    const { value } = e.target;
    const { checked } = e.target;
    if (checked) setProduct( prevState => {
      return {
        ...prevState,
        allergyContent: [...prevState.allergyContent, value]
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    product.itemName = itemSelected.itemName;
    console.log('handleSubmit: ', product);
  }

  const editMenuItem = () => {
    return (
      // left side
      <React.Fragment>
        <form onSubmit={handleSubmit}>
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
                value={product.description}
                onChange={handleChange}
              />
              <label htmlFor="product-price">Product price</label>
              <input 
                type="number" 
                placeholder="Insert a price. eg. 2.50" 
                step="0.01" 
                min="0" 
                max="1000" 
                name="itemPrice"
                value={product.price}
                onChange={handleChange}
              />
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
                  onChange={handleChecked}
                />
                <label for="gluten">Gluten</label>
                <br />
                <input
                  type="checkbox"
                  id="crustaceans"
                  name="crustaceans"
                  value="crustaceans"
                  onChange={handleChecked}
                />
                <label for="crustaceans">Crustaceans</label>
<br />
                <input
                  type="checkbox"
                  id="eggs"
                  name="eggs"
                  value="eggs"
                  onChange={handleChecked}
                />
                <label for="eggs">Eggs</label>
<br />
                <input
                  type="checkbox"
                  id="fish"
                  name="fish"
                  value="fish"
                  onChange={handleChecked}
                />
                <label for="fish">Fish</label>
<br />
                <input
                  type="checkbox"
                  id="peanuts"
                  name="peanuts"
                  value="peanuts"
                  onChange={handleChecked}
                />
                <label for="peanuts">Peanuts</label>
<br />
                <input
                  type="checkbox"
                  id="soybeans"
                  name="soybeans"
                  value="soybeans"
                  onChange={handleChecked}
                />
                <label for="soybeans">Soybeans</label>
<br />
                <input
                  type="checkbox"
                  id="lactose"
                  name="lactose"
                  value="lactose"
                  onChange={handleChecked}
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
                  onChange={handleChecked}
                />
                <label for="nuts">Nuts</label>
<br />
                <input
                  type="checkbox"
                  id="celery"
                  name="celery"
                  value="celery"
                  onChange={handleChecked}
                />
                <label for="celery">Celery</label>
<br />
                <input
                  type="checkbox"
                  id="mustard"
                  name="mustard"
                  value="mustard"
                  onChange={handleChecked}
                />
                <label for="mustard">Mustard</label>
<br />
                <input
                  type="checkbox"
                  id="sesame"
                  name="sesame"
                  value="sesame"
                  onChange={handleChecked}
                />
                <label for="sesame">Sesame seeds</label>
<br />
                <input
                  type="checkbox"
                  id="sulphur"
                  name="sulphur"
                  value="sulphur"
                  onChange={handleChecked}
                />
                <label for="sulphur">Sulphites</label>
<br />
                <input
                  type="checkbox"
                  id="lupin"
                  name="lupin"
                  value="lupin"
                  onChange={handleChecked}
                />
                <label for="lupin">Lupin </label>
<br />
                <input
                  type="checkbox"
                  id="molluscs"
                  name="molluscs"
                  value="molluscs"
                  onChange={handleChecked}
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