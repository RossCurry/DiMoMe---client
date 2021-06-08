import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import store, { useDispatch, useSelector } from 'react-redux';
import './Category.styles.scss';
import { newCategory } from '../../ApiService';

interface CatergoryProps {
  addNewCategory: (newCategory: string) => void;
}

const Category = ({ addNewCategory }: CatergoryProps): JSX.Element => {
  const [text, setText] = useState('' as string);
  const currentUser = useSelector((state) => state.currentUser.user);
  const history = useHistory();
  // const dispatch = useDispatch();

  // TODO a more complete list to store in the database?

  if (!currentUser) history.push(`/`);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const textInput = e.target.value;
    setText(textInput);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO database insertion here
    // TODO send to edit menu page
    addNewCategory(text.toUpperCase());
    setText('');
  };

  const userGreetingMessage = (): JSX.Element => {
    return (
      <>
        <h1>
          {currentUser.localName}
          {currentUser.localType}
        </h1>
      </>
    );
  };
  const defaultGreeting = (): JSX.Element => {
    return (
      <>
        <h1>Restaurant</h1>
      </>
    );
  };
  return (
    <div className="category-container">
      <div className="local-title">
        {currentUser ? userGreetingMessage() : defaultGreeting()}
      </div>
      <label htmlFor="category">
        Create a New Catergory
        <form onSubmit={handleSubmit} className="category-form">
          <input type="submit" value="+" />
          <input
            type="text"
            name="categoryName"
            placeholder="Insert a Category Name..."
            value={text}
            onChange={handleInput}
          />
        </form>
      </label>
    </div>
  );
}

export default Category;
