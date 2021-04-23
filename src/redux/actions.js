
// CATEGORY 
export const addCategory = (newCategory) => ({
  type: 'ADD_CATEGORY',
  payload: newCategory
});

export const editCategory = (newCategory) => ({
  type: 'EDIT_CATEGORY',
  payload: newCategory
});

export const deleteCategory = (categoryId) => ({
  type: 'DELETE_CATEGORY',
  payload: categoryId
});


// USER

export const updateUser = (user) => ({
  type: 'UPDATE_USER',
  payload: user
})