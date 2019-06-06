import { AUTH_USER, AUTH_ERROR } from "../action/types";
const INITAL_STATE = {
  authenticated: null,
  errorMessage: null
};
export default function(state = INITAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };

    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
}
