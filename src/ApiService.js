const BASE_URL = "http://localhost:3005"


async function registerNewUser(newUser) {

  const sendBody = JSON.stringify(newUser);
  const USER_PATH = '/users/subscribe'

  return await fetch(BASE_URL + USER_PATH, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: sendBody
  })
    .then((res) => res.json())
    .then(data => data)
    .catch((err) => console.log(err));
}

async function loginUser(userLogin) {
  
  const sendBody = JSON.stringify(userLogin);
  const USER_PATH = '/users/login';

  return await fetch(BASE_URL + USER_PATH, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: sendBody
  })
    .then((res) => res.json())
    .then(data => data)
    .catch((err) => console.log(err));
}
  


//TODO DELETE ONCE YOU HAVE DB
let categoryId = 1
const newCategoryDB = (newCategory) => {

  const { categoryName, userId} = newCategory;
  //TODO send to DB
  // add fake values to the newCategory
  const returnCategory = {
    categoryName: categoryName,
    categoryId: categoryId,
    userId: userId,
    menuItems: [],
    selected: false
  }
  categoryId++
  return returnCategory
};

module.exports = { registerNewUser, loginUser, newCategoryDB }