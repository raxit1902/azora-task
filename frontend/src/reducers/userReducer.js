const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_SIGNUP_REQUEST":
      return { ...state, loading: true, error: null };
    case "USER_SIGNUP_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "USER_SIGNUP_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
