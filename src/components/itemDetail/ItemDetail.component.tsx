/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState } from 'react';
import cameraIcon from '../../assets/svg/camera.svg';
import {
  BASE_URL,
  menuItemFromDB,
  newMenuItem,
  allergenSchema,
} from '../../ApiService';
import './ItemDetail.styles.scss';

interface IProps {
  itemSelected: menuItemFromDB;
  editMenuItem: (product: menuItemFromDB) => void;
  // TODO give this useState an interface so TS can infer the type
  setState: (state: string) => void;
}

interface initialState {
  itemName: string;
  _id: number | null;
  description: string;
  itemPrice: string;
  allergyContent: allergenSchema[];
  dietaryContent: string[];
  // eslint-disable-next-line camelcase
  public_id: number | null;
  imageUrl: string;
}
const initialState = {
  // itemName: '',
  // _id: null,
  // description: '',
  // itemPrice: '',
  // allergyContent: [],
  // dietaryContent: [],
  // public_id: null,
  // imageUrl: '',
  _id: 0,
  itemName: 'string',
  categoryId: 0,
  description: 'string',
  itemPrice: 0,
  allergyContent: [{ name: 'string' }],
  dietaryContent: ['string'],
  userId: 0,
  public_id: 'string',
  imageUrl: 'string',
};
const allergensInit = [
  { name: 'Cereals', checked: false },
  { name: 'Crustaceans', checked: false },
  { name: 'Eggs', checked: false },
  { name: 'Fish', checked: false },
  { name: 'Peanuts', checked: false },
  { name: 'Soybeans', checked: false },
  { name: 'Milk', checked: false },
  { name: 'Nuts', checked: false },
  { name: 'Celery', checked: false },
  { name: 'Mustard', checked: false },
  { name: 'Sesame', checked: false },
  { name: 'Sulphur', checked: false },
  { name: 'Lupin', checked: false },
  { name: 'Molluscs', checked: false },
];

const ItemDetail = ({
  itemSelected,
  editMenuItem,
  setState,
}: IProps): JSX.Element => {
  const [product, setProduct] = useState<menuItemFromDB>(initialState);
  const [allergensList, setAllergensList] = useState(allergensInit);
  const [previewImageFile, setPreviewImageFile] = useState('');

  // TODO change default to include the layout of the edit item
  const defaultDisplay = (): JSX.Element => {
    return (
      <div className="item-detail-container">
        <h2 className="section-title">No item selected yet</h2>
      </div>
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const newState = allergensList.map((item) => {
      if (item.name === value) {
        // eslint-disable-next-line no-param-reassign
        item.checked = !item.checked;
        return item;
      }
      // TODO does this code even make sense???
      return item;
    });
    setAllergensList(newState);
  };

  // TODO revise how this should work in typescript, used to be async - Problems???
  const handleChangeImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void | null => {
    if (!e.target.files) return;
    const selectedImageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedImageFile);
    reader.onloadend = () => {
      setPreviewImageFile(reader.result as string);
    };
  };

  // TODO fix the any return once we can see what we get back
  const uploadImage = async (image: string): Promise<any | null> => {
    // const BASE_URL = "http://localhost:3005"
    const API_PATH = '/image/upload';
    try {
      if (typeof BASE_URL === 'string') {
        return await fetch(`${BASE_URL}${API_PATH}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          // eslint-disable-next-line no-underscore-dangle
          body: JSON.stringify({ data: image, itemId: itemSelected._id }),
        });
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent): void | null => {
    e.preventDefault();
    if (!product.description || !product.itemPrice || !previewImageFile) {
      return;
    }
    // TODO pretty sure I'm not supposed to edit state like this.
    product.itemName = itemSelected.itemName;
    // eslint-disable-next-line no-underscore-dangle
    product._id = itemSelected._id;
    product.allergyContent = allergensList.filter(
      (allergen) => allergen.checked === true
    );

    // TODO send image to OUR SERVER - possible change the function location once working
    uploadImage(previewImageFile)
      // TODO need to determine the typings for cloudinary
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        product.public_id = data.public_id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        product.imageUrl = data.url;
      })
      .then(() => editMenuItem(product))
      .catch((err) => console.log(err));
    // TODO call a function from edit menu component
    setAllergensList(allergensInit);
    setProduct(initialState);
    setState('view');
  };

  const editMenuItemView = (): JSX.Element => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="item-detail-sub-container">
            <div className="row-1-item-detail">
              <div className="col-top-left-item-detail">
                <h1>{itemSelected.itemName.toUpperCase()}</h1>
              </div>

              <div className="col-top-right-item-detail">
                <div className="item-photo">
                  <img
                    src={previewImageFile || cameraIcon}
                    alt="upload icon"
                    className={
                      cameraIcon ? 'image-upload-icon' : 'image-upload-file'
                    }
                  />

                  <input
                    type="file"
                    name="addImage"
                    id="addImage"
                    multiple={false}
                    accept="image/png, image/jpeg"
                    onChange={handleChangeImage}
                  />
                </div>
              </div>
            </div>

            <div className="row-2-item-detail">
              <div className="col-bottom-left-item-detail">
                <label htmlFor="description">
                  Product description
                  <textarea
                    name="description"
                    placeholder="Write a small description of the product here..."
                    wrap="soft"
                    maxLength={120}
                    rows={4}
                    value={product.description}
                    onChange={
                      (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        handleChange(e)
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                  />
                </label>
                <label htmlFor="product-price">
                  Product price
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
                </label>
              </div>
              <div className="col-bottom-right-item-detail">
                <h3>Select the product allergens</h3>
                <div className="check-box-container">
                  {allergensList &&
                    allergensList.map((allergen) => {
                      return (
                        <div className="checkbox-wrap" key={allergen.name}>
                          <input
                            type="checkbox"
                            id={allergen.name}
                            name={allergen.name}
                            value={allergen.name}
                            onChange={handleChecked}
                            checked={allergen.checked}
                          />
                          <label htmlFor={allergen.name}>{allergen.name}</label>
                          <br />
                        </div>
                      );
                    })}
                </div>
                <input type="submit" value="Save details" />
              </div>
            </div>
          </div>
        </form>
      </>
    );
  };
  const displaySelectedItem = (): JSX.Element => {
    return <div className="item-detail-container">{editMenuItemView()}</div>;
  };
  return <>{itemSelected ? displaySelectedItem() : defaultDisplay()}</>;
};

export default ItemDetail;
