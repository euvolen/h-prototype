import { GET_ERRORS} from '../types';

// Get all errors
export const getErrors = (error) => dispatch => {
        dispatch({
          type: GET_ERRORS,
          payload: {error}
        })
  };