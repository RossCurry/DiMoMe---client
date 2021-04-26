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
  
  const allergensInit = [
    {name: 'Cereals', checked:false}, 
    {name: 'Crustaceans', checked:false}, 
    {name: 'Eggs', checked:false}, 
    {name: 'Fish', checked:false}, 
    {name: 'Peanuts', checked:false}, 
    {name: 'Soybeans', checked:false}, 
    {name: 'Milk', checked:false}, 
    {name: 'Nuts', checked:false}, 
    {name: 'Celery', checked:false}, 
    {name: 'Mustard', checked:false}, 
    {name: 'Sesame', checked:false}, 
    {name: 'Sulphur', checked:false}, 
    {name: 'Lupin', checked:false}, 
    {name: 'Molluscs', checked:false}, 
  ]

  const [ product, setProduct ] = useState(itemSelected ? itemSelected : initialState)

  const [ allergensList, setAllergensList ] = useState(allergensInit);

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
        {/* <h2 className="section-title">Im the menu detail</h2> */}
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
    const { value } = e.target;
    const { checked } = e.target;
    const newState = allergensList.map( item => {
      if (item.name === value) {
        item.checked = !item.checked;
        return item;
      } else {
        return item;
      }
    });
    setAllergensList(newState);

    // if (checked) {

    //   setProduct( prevState => {
    //    return {
    //      ...prevState,
    //      //TODO ask staff how to fix this problem
    //      allergyContent: [...prevState.allergyContent, value]
    //    }
    //   });
    // }
    
  };


  const handleChangeImage = async (e) => {

    // ONE: way to get the image for preview
    // // show image client side
    // const image = URL.createObjectURL(e.target.files[0]);
    // setPreviewImageFile(image);

    // TWO:get the image for preview
    if (e.target.files[0]) {
      const selectedImageFile = e.target.files[0];
      const reader = new FileReader(selectedImageFile)
      reader.readAsDataURL(selectedImageFile);
      reader.onloadend = () => {
        console.log('reader.result', reader.result);
        setPreviewImageFile(reader.result);
      }
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
    // ADD NAME, ID and 
    product.itemName = itemSelected.itemName;
    product._id = itemSelected._id;
    product.allergyContent = allergensList.filter( allergen => allergen.checked === true );
    //TODO send image to OUR SERVER - possible change the function location once working
    
    uploadImage(previewImageFile)
    .then(res => res.json())
    .then(data => product.public_id = data.public_id)
    .then(() => editMenuItem(product))
    .catch((err) => console.log(err));
    //TODO call a function from edit menu component
    //fetch image details, 
    // then add to the menuItem
    // save menu item
    // editMenuItem(product);
    setAllergensList(allergensInit);
    setProduct(initialState);
  }

   const uploadImage = async (image) => {
    const BASE_URL = "http://localhost:3005"
    const API_PATH = '/image/upload'
    try {
      return await fetch(BASE_URL+API_PATH, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({data: image, itemId: itemSelected._id })
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
            <div className="row-1-item-detail">
              <div className="col-1-item-detail">
                <h1>{itemSelected.itemName.toUpperCase()}</h1>
              </div>
              <div className="col-2-item-detail">
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

              {/* <Image 
                cloudName='dimome'
                // public_id='https://res.cloudinary.com/dimome/image/upload/v1619437624/test-images/pip2ttqzeobbydfvcynt.jpg'
              /> */}
              </div>
            </div>
            <div className="row-2-item-detail">
              <div className="col-1-item-detail">
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
                  value={product.itemPrice}
                  onChange={handleChange}
                />
              </div >
              <div className="col-2-item-detail">
                <h3>Select the product allergens</h3>
                <div className="check-box-container">
                  {allergensList && allergensList.map((allergen) => {
                    return (
                      <div className="checkbox-wrap">
                        <input
                          type="checkbox"
                          id={allergen.name}
                          name={allergen.name}
                          value={allergen.name}
                          onChange={handleChecked}
                          key={allergen.name}
                          checked={allergen.checked}
                        />
                        <label for={allergen.name}>{allergen.name}</label>
                        <br />
                      </div>
                    )
                  })}
                
                </div>
              {/*//TODO /we can use <button /> with a type="submit" to submit forms */}
              <input type="submit" value="Save details" />
              </div>
            </div>
         
            
              

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