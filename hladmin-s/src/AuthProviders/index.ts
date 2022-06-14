import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { UserDataI } from "../types/UserDataType";

const config = {
  apiKey: "AIzaSyD6_-F85j6GxAw-6iVRi5BrOoX37V_i8UI",
  authDomain: "hl-dev-01.firebaseapp.com",
  projectId: "hl-dev-01",
  storageBucket: "hl-dev-01.appspot.com",
  messagingSenderId: "292066023946",
  appId: "1:292066023946:web:4d80e74438f5b439bdddf3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}

//   firebase.analytics();

export const db = firebase.firestore();

export const auth = firebase.auth();
var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:3000/login",
  // This must be true.
  handleCodeInApp: true,
};

export const authProvider = {
  SignInWithEmail: (email: string) => {
    return AxiosInstance.post("", {
      jsonrpc: "2.0+hl",
      id: 1,
      method: "hladmin1:sign_in:email_link",
      params: {
        email: email,
      },
      auth: {},
    });
  },
  VerifySignIn: () => {
    console.log("signingin");
    // Confirm the link is a sign-in with email link.
    console.log(window.location.href);
    if (auth.isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem("emailForSignIn");
      console.log({ email });
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        return {
          success: false,
          code: "Wrong Browser",
          data: null,
        };
      }
      // The client SDK will parse the code from the link for you.
      return auth
        .signInWithEmailLink(email, window.location.href)
        .then(async (result) => {
          console.log(auth.currentUser);
          if (auth.currentUser) {
            return { success: true, code: "Success", data: auth.currentUser };
          }

          return {
            success: false,
            code: "Unexpected",
            data: null,
          };

          // Clear email from storage.
          // localStorage.removeItem("emailForSignIn");

          // if (auth.currentUser && !auth.currentUser.displayName)
          //   return {
          //     success: false,
          //     code: "Unexpected",
          //   };

          // return { success: true, code: "Success" };
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile===null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          console.log({ error });
          return { success: false, code: "Link Expired", data: null };
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    } else {
      return {
        success: false,
        code: "Unexpected",
        data: null,
      };
    }
  },
  logout: () => {
    return auth.signOut();
  },
};
