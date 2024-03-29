import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_OPTION_SUCCESS,
  UPDATE_OPTION_FAIL,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  option: localStorage.getItem('option'),
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        user: payload.data.user,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };
    case UPDATE_OPTION_SUCCESS:
      return {
        ...state,
        option: payload,
      };
    case UPDATE_OPTION_FAIL:
    case UPDATE_USER_FAIL:
    case REGISTER_FAIL:
    default:
      return state;
  }
}
