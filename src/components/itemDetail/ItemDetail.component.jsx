import React, { useState } from 'react';
import cameraIcon from '../../assets/svg/camera.svg'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import './ItemDetail.styles.scss'

function ItemDetail({ itemSelected, editMenuItem }) {


  const initialState = {
    itemName: '',
    _id: '',
    description: '',
    itemPrice: 0,
    allergyContent: [],
    dietaryContent: []
  }
  
  const [ product, setProduct ] = useState(itemSelected ? itemSelected : initialState)

  const [ previewImageFile, setPreviewImageFile ] = useState(null);
  
  const [ imageForCloud, setImageForCloud ] = useState(null);

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
        {editMenuItemView()}
      </div>
    )
  }
  



  const handleChange = (e) => {
    const { name, value } = e.target
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
        //TODO ask staff how to fix this problem
        allergyContent: [...prevState.allergyContent, value]
      }
    });
    
  };


  const handleChangeImage = async (e) => {
    
    // ONE: way to get the image for preview
    // // show image client side
    // const image = URL.createObjectURL(e.target.files[0]);
    // setPreviewImageFile(image);

    // TWO:get the image for preview
    const selectedImageFile = e.target.files[0];
    const reader = new FileReader(selectedImageFile)
    reader.readAsDataURL(selectedImageFile);
    reader.onloadend = () => {
      console.log('reader.result', reader.result);
      setPreviewImageFile(reader.result);
    }


    // METHOD ONE FOR IMAGE UPLOAD
    // image for cloud
    // const selectedImage = e.target.files[0];
    // setImageForCloud(selectedImage)
    // const formData = new FormData();
    // formData.append("file", selectedImage); 
    // formData.append("upload_preset", 'n2bzbolf');
    // formData.append("public_id", image);

    // send to cloudinary // METHOD ONE - 
    // const cloudinaryURL = 'https://api.cloudinary.com/v1_1/dimome/image/upload';
    // fetch(cloudinaryURL, {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: formData
    // })
    // .then(res => console.log(res))
    // .catch(err => console.error(err));


  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO delele me - for testing submit
    // console.log('submit button');
    // console.log('product.description', product.description);
    // console.log('product.price', product.itemPrice);
    // console.log('previewImageFile', previewImageFile);
    if (!product.description || !product.itemPrice || !previewImageFile ){
      console.log('mising description, price or image');
      return;
    } 
    //TODO pretty sure I'm not supposed to edit state like this.
    // ADD NAME AND ID
    product.itemName = itemSelected.itemName;
    product._id = itemSelected._id;
    //TODO send image to OUR SERVER - possible change the function location once working
    // previewImageFile is 64baseEncoded
    uploadImage(previewImageFile)
    //TODO call a function from edit menu component
    editMenuItem(product);
    setProduct(initialState);
  }

   const uploadImage = async (image) => {
    const BASE_URL = "http://localhost:3005"
    const API_PATH = '/image/upload'
    try {
      await fetch(BASE_URL+API_PATH, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({data: image})
      })
    } catch (error) {
      console.error(error);
    }
   }


  //COMPONENT VIEW
  const editMenuItemView = () => {
    return (
      // left side
      <React.Fragment>
        <form onSubmit={handleSubmit}>
          <div className="item-detail-sub-container">
            <div className="edit-item-left">
              <h1>{itemSelected.itemName.toUpperCase()}</h1>
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
            </div >
            {/*
          //right side // image and save button
           */}
            <div className="edit-item-right">
              <div className="item-photo">
                photo here
                
                <img 
                  src={previewImageFile ? previewImageFile : cameraIcon} 
                  alt="image upload icon" 
                  className="image-upload-icon"
                  style={{height: "200px"}}
                />

                <input 
                  type="file" 
                  name="addImage" 
                  id="addImage"
                  multiple={false}
                  accept='image/png, image/jpeg'
                  onChange={handleChangeImage}
                />

              <Image 
                cloudName='dimome'
                // public_id='https://res.cloudinary.com/dimome/image/upload/v1619437624/test-images/pip2ttqzeobbydfvcynt.jpg'
              />
              </div>
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

              {/*//TODO /we can use <button /> with a type="submit" to submit forms */}
              <input type="submit" value="Save details" />
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }

  
// COMPONENT RENDER
  return (
    <React.Fragment>
     {itemSelected ? displaySelectedItem() : defaultDisplay()}
    </React.Fragment>
  );
}

export default ItemDetail;