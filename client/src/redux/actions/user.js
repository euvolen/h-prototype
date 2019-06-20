import { SET_CURRENT_USER, CLEAR_ERRORS } from '../types';

// Authentication
export const authenticateUser = (current, history = undefined) => dispatch => {
  dispatch({type:CLEAR_ERRORS})
  dispatch({type: SET_CURRENT_USER,payload:current})
  if(history)
    history.push('/')
};


// Removing user from the store
export const logoutUser = () => dispatch => {
    dispatch({type:CLEAR_ERRORS})
    dispatch({type: SET_CURRENT_USER,payload:{}})
  };