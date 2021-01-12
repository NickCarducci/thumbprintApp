//import { useFirestore } from "react-redux-firebase";
/*import firebase from "../../../public/init-firebase"
import { fireStore } from "../public/init-firebase";

export const signUp = (newUser) => {
  return (dispatch, getState) => {
    //const newUser = getState()
    const userId = getState().firebase.auth.uid;
    //const firebase = getFirebase()
    var user = firebase.auth().currentUser;
    console.log(user)
    console.log(userId)
    fireStore
      .collection("users")
      .doc(newUser.authUID)
      .set({
        username: newUser.username,
        name: newUser.name,
        //Seatsioid: newUser.Seatsioid,
        events: newUser.events,
        clubs: newUser.clubs,
        jobs: newUser.jobs,
        housing: newUser.housing,
        shops: newUser.shops,
        restaurants: newUser.restaurants,
        bars: newUser.bars,
        services: newUser.services,
        proposals: newUser.proposals
        //publicKey: newUser.publicKey
        //initials: newUser.firstName[0] + newUser.lastName[0]
      })
      .then(() => {
        console.log('complete signup')
        dispatch({ type: "SIGNUP_SUCCESS" });
        //return(<Redirect to="/signupconfirm"/>)
        //this.props.history.push("/signupconfirm")
      })
      .catch(err => {
        console.log("signup error" + err);
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};


export const editUser = (state) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firestore = getFirestore();
    //const userId = getState().firebase.auth.uid;
    const firebase = getFirebase()
        var user = firebase.auth().currentUser;
    firestore.collection('users').doc(user).update({
      ...state,
      updatedAt: new Date()
    }).then(() => {
      dispatch({ type: 'EDIT_USER', state })
    }).catch((err) => {
      dispatch({type: 'EDIT_USER_ERROR', err})
    })
  }
}
export const deleteUser = (state) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
const firebase = getFirebase()
    var user = firebase.auth().currentUser;
    user.delete()
    .then(() => {
      // User deleted.
      dispatch({ type: 'DELETE_USER', state })
    }).catch(err => {
      dispatch({type: 'DELETE_USER_ERROR', err})
      // An error happened.
    })
  }
}
export const register = newUser => {
  return (dispatch, getState, { getFirebase,  getFirestore }) => {
      const firebase = getFirebase()
      const firestore = getFirestore()
      
      firebase.auth().createUserWithEmailAndPassword(
          newUser.email,
          newUser.password
      )
          .then(res => {
              return firestore.collection('users').doc(res.user.uid).set({
                  firstName: newUser.firstName,
                  lastName: new User.lastName,
                  initials: newUser.firstName[0] + newUser.lastName[0]
          })
          .then(() => dispatch({ type: REGISTER_SUCCESS })
          .catch(err => dispatch({type: REGISTER_FAILED, err })
          }
export const signIn = credentials => {
  return (dispatch, getState, { useFirebase }) => {
    const firebase = useFirebase();

    //const phonenumber = "+17322331085" // for US number (123) 456-7899
    //var testVerificationCode = "123452";
    /*const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible"
      }
    );
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });*/ /*
    firebase.auth().signInWithPhoneNumber(credentials.phone, recaptchaVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      const verificationCode = window.prompt('Please enter the verification ' +
          'code that was sent to your mobile device.');
      return confirmationResult.confirm(verificationCode)
    })
    .then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};
*/
/*
    // After asking the user for their email.
    var email = window.prompt("Please provide your email");// Construct the email link credential from the current URL.
    var credential = firebase.auth.EmailAuthProvider.credentialWithLink(
        email, window.location.href);
    
    // Link the credential to the current user.
    firebase.auth().currentUser.linkWithCredential(credential)
      .then(function(usercred) {
        // The provider is now successfully linked.
        // The phone user can now sign in with their phone number or email.
      })
      .catch(function(error) {
        // Some error occurred.
      }); 
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(credentials.email, window.location.href)
      .then(function(result) {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }
/*
export const resetPassword = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function(user) {
        alert("Please check your email...");
      })
      .catch(function(e) {
        console.log(e);
      });
  };
};
export const resetPassword = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
  firebase.auth().sendEmailVerification(email)
    .then(function (user) {
      alert('Please check your email...')
    }).catch(function (e) {
      console.log(e)
    })
}
}


var phoneNumber = getPhoneNumberFromUserInput();
var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });
    */
