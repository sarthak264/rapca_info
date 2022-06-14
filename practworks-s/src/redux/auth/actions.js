const authActions = {
  login: (data) => {
    return {
      type: "LOGIN",
      isLogin: true,
      accessToken: data.token,
      userId: data.userId,
    };
  },

  userData: (data) => {
    return {
      type: "USER_DATA",
      firstName: data.firstName,
      lastName: data.lastName,
      Image: data.image,
      user_data: data.data,
    };
  },

  logout: () => {
    return {
      type: authActions.LOGOUT,
      isLogin: false,
      accessToken: null,
    };
  },
};

export default authActions;
