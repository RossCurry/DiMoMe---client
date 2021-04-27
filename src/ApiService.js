const BASE_URL = "http://localhost:3005"


async function registerNewUser(newUser) {

  const sendBody = JSON.stringify(newUser);
  const USER_PATH = '/user/subscribe'

  return await fetch(BASE_URL + USER_PATH, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: sendBody
  })
    .then((res) => res.json())
    // .then(data => data)
    .catch((err) => console.log(err));
}

async function loginUser(userLogin) {
  
  const sendBody = JSON.stringify(userLogin);
  const USER_PATH = '/user/login';

  return await fetch(BASE_URL + USER_PATH, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: sendBody
  })
    .then((res) => res.json())
    // .then(data => data)
    .catch((err) => console.log(err));
}
  


const newCategoryDB = async (newCategory) => {
  
  const CATEGORY_PATH = '/category';
  
  return await fetch(BASE_URL + CATEGORY_PATH, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCategory)
  })
    .then((res) => res.json())
    .then(data => data)
    .catch((err) => console.log(err));

};


const newMenuItemDB = async (newMenuItem) => {

  const PRODUCT_PATH = '/item';
  
  return await fetch(BASE_URL + PRODUCT_PATH, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMenuItem)
  })
    .then((res) => res.json())
    .then(data => data)
    .catch((err) => console.log(err));

}

const editMenuItemDB = async (menuItem) => {
  
  // console.log('menuItem to send to DB', menuItem);
  const { _id } = menuItem;

  // The ID might be unnecessary
  const PRODUCT_PATH = `/item/${_id}`;

  return await fetch(BASE_URL + PRODUCT_PATH, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menuItem)
  })
    .then((res) => res.json())
    .then(data => data)
    .catch((err) => console.log(err));

};


const fetchAllCategoriesByUserId = async (userId) => {

  const CATEGORY_PATH = `/categories/${userId}`;
  
  return await fetch(BASE_URL + CATEGORY_PATH, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then(data => data)
    .catch((err) => console.log(err));

};

const fetchAllMenuItemsByUserId = async (userId) => {

  const CATEGORY_PATH = `/items/${userId}`;
  
  return await fetch(BASE_URL + CATEGORY_PATH, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then(data => data)
    .catch((err) => console.log(err));
};


module.exports = { 
  registerNewUser, 
  loginUser, 
  newCategoryDB, 
  newMenuItemDB,
  editMenuItemDB,
  fetchAllCategoriesByUserId,
  fetchAllMenuItemsByUserId
 }