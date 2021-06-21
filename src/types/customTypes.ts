/* eslint-disable camelcase */
export type newUser = {
  email: string;
  name: string;
  localType: string;
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
  allergyContent?: allergenSchema[];
  dietaryContent?: string;
  userId: number;
  public_id?: string;
  imageUrl?: string;
};

export type menuItemFromDB = {
  _id: number;
  itemName: string;
  categoryId: number;
  description: string;
  itemPrice: number;
  allergyContent: { name: string }[];
  dietaryContent: string[];
  userId: number;
  public_id: string;
  imageUrl: string;
};
