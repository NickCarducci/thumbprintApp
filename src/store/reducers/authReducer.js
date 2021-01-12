const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Login failed"
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;

    case "SIGNUP":
      console.log("signing up...");
      return {
        ...state,
        authError: null
      };

      case "confirmationResult":
        console.log("confirmationResult");
        return {
          ...state,
          authError: null
        };

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null
      };

    case "SIGNUP_ERROR":
      //console.log("signup error");
      return {
        ...state,
        authErrorSignup: action.err.message,
        loadingSignup: false
      };

    case "NowRequestVerificationCode":
      console.log("sms sent");
      return {
        ...state,
        authErrorSignup: "sms sent"
      };

    case "VCWINDOW":
      console.log("start verification code window");
      console.log(action.response);
      return {
        ...state,
        authErrorSignup: action.response
      };

    default:
      return state;
  }
};

export default authReducer;
