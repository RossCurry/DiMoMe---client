import React, {useState} from 'react';

function Category(props) {

  const [ value, setValue ] = useState('');
  const handleChange = (e) => {
    const input = e.target.value;
    setValue(prevState => (input))
  }

  return (
    <div>
      <h2>Hi I'm the categories</h2>
      <form onSubmit={props.handleCategorySubmit}>
        <input 
          type="text" 
          name="newCategory" 
          id="newCategory"
          placeholder="Type custom catergory..."
          value={value}
          onChange={handleChange}
          />

        <input 
          type="submit" 
          value="Add category"
        />
      </form>
    </div>
  );
}

export default Category;