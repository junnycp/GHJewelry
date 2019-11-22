export const ACTIONS = {
  UPDATE_USER_INFO: 'LOGIN/UPDATE_USER_INFO'
};

const initState = { userInfo: {username: "admin123"} };
//load state data from LocalStorage

//save state data to LocalStorage
const LoginReducer = (state = initState, action) => {
  console.log('before: ', state, action);
  switch (action.type) {
    case ACTIONS.UPDATE_USER_INFO:
      let ret = {
        ...state,
        userInfo: action.payload
      };
      console.log('after: ', ret);
      return ret;
    // return Object.assign({}, {
    //     userInfo: action.userInfo
    // }, state);
    default:
      return state;
  }
};

export default LoginReducer;
