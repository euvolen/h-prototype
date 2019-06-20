import { combineReducers } from 'redux';
import userReducer from './user';
import errorReducer from './errors';
export default combineReducers({
  user: userReducer,
  errors: errorReducer
});
