import { combineReducers } from 'redux';


const userCategories = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      state.push(action.payload);
      return state;
      // break;
    case 'EDIT_CATEGORY':
      break;
    case 'DELETE_CATEGORY':
      break;
  
    default: 
      return state;
      
  }
}

const currentUser = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      state.user = action.payload;
      return state;

    default:
      return state;
  }
}


const reducers = combineReducers({
  userCategories,
  currentUser
})
export default reducers;