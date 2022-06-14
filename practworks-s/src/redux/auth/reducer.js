import authAction from "./actions";

const initState = {
  isLogin: localStorage.getItem("isLogin")
    ? localStorage.getItem("isLogin") === "true"
    : false,
  accessToken: localStorage.getItem("accessToken"),
  userId: null,
  firstName: null,
  lastName: null,
  image: null,
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogin: action.isLogin,
        accessToken: action.accessToken,
        userId: action.userId,
      };
    case "USER_DATA":
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        Image: action.Image,
        user_data: action.user_data,
      };

    case authAction.LOGOUT:
      return {
        ...state,
        isLogin: action.isLogin,
        accessToken: null,
      };
    default:
      return state;
  }
}
