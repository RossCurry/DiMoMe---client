/* eslint-disable no-console */
/* eslint-disable camelcase */
// const { REACT_APP_SV_URL, REACT_APP_SV_PORT } = process.env;
// const BASE_URL = `http://${REACT_APP_SV_URL}:${REACT_APP_SV_PORT}`;
// TODO adapt ENV variables to match server address.
export const BASE_URL = process.env.REACT_APP_SV_URL;

export type newUser = {
  email: string;
  name: string;
  localSelector: string;
  localName: string;
  password: string;
};

export type userFromDB = {
  _id: number;
  email: string;
  name: string;
  localType: string;
  localName: string;
};

export type userLogin = {
  email: string;
  password: string;
};

export async function registerNewUser(newUser: newUser): Promise<userFromDB> {
  const sendBody = JSON.stringify(newUser);
  const USER_PATH = '/user/subscribe';
  return fetch(BASE_URL + USER_PATH, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: sendBody,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function loginUser(userLogin: userLogin): Promise<userFromDB> {
  const sendBody = JSON.stringify(userLogin);
  const USER_PATH = '/user/login';
  return fetch(BASE_URL + USER_PATH, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: sendBody,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export type newCategory = {
  categoryName: string;
  userId: number;
};

export type categoryFromDB = {
  // categoryId: number;
  _id: number;
  categoryName: string;
  userId: number;
  selected?: boolean;
};

export const newCategoryDB = async (
  newCategory: newCategory
): Promise<categoryFromDB> => {
  const CATEGORY_PATH = '/category';
  return fetch(BASE_URL + CATEGORY_PATH, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCategory),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

// TODO possibly unneccessary
export type allergenSchema = {
  name: string;
  checked: boolean;
};

export type newMenuItem = {
  itemName: string;
  categoryId: number;
  description: string;
  itemPrice: number;
  allergyContent: allergenSchema[];
  dietaryContent: string;
  userId: number;
  public_id: string;
  imageUrl: string;
};

export type menuItemFromDB = {
  _id: number;
  itemName: string;
  categoryId: number;
  description: string;
  itemPrice: number;
  allergyContent: [{ name: string }];
  dietaryContent: string;
  userId: number;
  public_id: string;
  imageUrl: string;
};

export const newMenuItemDB = async (
  newMenuItem: newMenuItem
): Promise<newMenuItem> => {
  const PRODUCT_PATH = '/item';
  return fetch(BASE_URL + PRODUCT_PATH, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMenuItem),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const editMenuItemDB = async (
  menuItem: menuItemFromDB
): Promise<menuItemFromDB> => {
  const { _id } = menuItem;
  // The ID might be unnecessary
  const PRODUCT_PATH = `/item/${_id}`;
  return fetch(BASE_URL + PRODUCT_PATH, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menuItem),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const fetchAllCategoriesByUserId = async (
  userId: number
): Promise<categoryFromDB[]> => {
  const CATEGORY_PATH = `/categories/${userId}`;
  return fetch(BASE_URL + CATEGORY_PATH, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const fetchAllMenuItemsByUserId = async (
  userId: number
): Promise<menuItemFromDB[]> => {
  const CATEGORY_PATH = `/items/${userId}`;
  return fetch(BASE_URL + CATEGORY_PATH, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
