export const loginUserRequest = () => ({
  type: "LOGIN_USER_REQUEST",
});

export const loginUserSuccess = (userData) => ({
  type: "LOGIN_USER_SUCCESS",
  payload: userData,
});

export const loginUserFailure = (error) => ({
  type: "LOGIN_USER_FAILURE",
  payload: error,
});

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});
