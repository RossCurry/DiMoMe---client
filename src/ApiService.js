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

module.exports = { registerNewUser, loginUser, newCategoryDB }