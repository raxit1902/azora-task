export const signupUserRequest = () => ({
  type: "USER_SIGNUP_REQUEST",
});

export const signupUserSuccess = (userData) => ({
  type: "USER_SIGNUP_SUCCESS",
  payload: userData,
});

export const signupUserFailure = (error) => ({
  type: "USER_SIGNUP_FAILURE",
  payload: error,
});
