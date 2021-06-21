/* eslint-disable no-console */
/* eslint-disable camelcase */
import {
  newUser as newUserType,
  userFromDB,
  userLogin as userLoginType,
  newCategory as newCategoryType,
  categoryFromDB,
  newMenuItem as newMenuItemType,
  menuItemFromDB,
} from './types/customTypes';
// const { REACT_APP_SV_URL, REACT_APP_SV_PORT } = process.env;
// const BASE_URL = `http://${REACT_APP_SV_URL}:${REACT_APP_SV_PORT}`;

// TODO adapt ENV variables to match server address.
export const BASE_URL = 'http://localhost:3005';
// export const BASE_URL = process.env.REACT_APP_SV_URL || '';

export async function registerNewUser(
  newUser: newUserType
): Promise<userFromDB | null> {
  const sendBody = JSON.stringify(newUser);
  const USER_PATH = '/user/subscribe';
  try {
    const returnInfo = await fetch(`${BASE_URL}${USER_PATH}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: sendBody,
    });
    const userInfo = (await returnInfo.json()) as userFromDB;
    return userInfo;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export async function loginUser(
  userLogin: userLoginType
): Promise<userFromDB | null> {
  const sendBody = JSON.stringify(userLogin);
  const USER_PATH = '/user/login';
  try {
    const returnInfo = await fetch(`${BASE_URL}${USER_PATH}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: sendBody,
    }).then(async (res) => {
      const user = (await res.json()) as userFromDB;
      return user;
    });
    return returnInfo;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export const newCategoryDB = async (
  newCategory: newCategoryType
): Promise<categoryFromDB | null> => {
  const CATEGORY_PATH = '/category';
  try {
    const returnInfo = await fetch(`${BASE_URL}${CATEGORY_PATH}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategory),
    });
    const category = (await returnInfo.json()) as categoryFromDB;
    return category;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const newMenuItemDB = async (
  newMenuItem: newMenuItemType
): Promise<menuItemFromDB | null> => {
  const PRODUCT_PATH = '/item';
  try {
    const returnInfo = await fetch(`${BASE_URL}${PRODUCT_PATH}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMenuItem),
    });
    const menuItem = (await returnInfo.json()) as menuItemFromDB;
    return menuItem;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const editMenuItemDB = async (
  menuItem: menuItemFromDB
): Promise<menuItemFromDB | null> => {
  const { _id } = menuItem;
  // The ID might be unnecessary
  const PRODUCT_PATH = `/item/${_id}`;
  try {
    const returnInfo = await fetch(`${BASE_URL}${PRODUCT_PATH}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menuItem),
    });
    const editedMenuItem = (await returnInfo.json()) as menuItemFromDB;
    return editedMenuItem;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const fetchAllCategoriesByUserId = async (
  userId: number
): Promise<categoryFromDB[] | null> => {
  const CATEGORY_PATH = `/categories/${userId}`;
  try {
    const returnInfo = await fetch(BASE_URL + CATEGORY_PATH, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
    const categories = (await returnInfo.json()) as categoryFromDB[];
    return categories;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const fetchAllMenuItemsByUserId = async (
  userId: number
): Promise<menuItemFromDB[] | null> => {
  const CATEGORY_PATH = `/items/${userId}`;
  try {
    const returnInfo = await fetch(BASE_URL + CATEGORY_PATH, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
    const menuItems = (await returnInfo.json()) as menuItemFromDB[];
    return menuItems;
  } catch (error) {
    console.error(error);
  }
  return null;
};
