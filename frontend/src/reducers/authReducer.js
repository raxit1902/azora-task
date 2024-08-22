const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case "LOGIN_USER_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT_USER":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
}
