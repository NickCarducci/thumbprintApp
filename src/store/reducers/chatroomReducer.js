import { combineReducers } from 'redux';
import firebaseInitialized from "../.././config/fbConfig";

var initialState = {
  isFetching: false,
  lastFetched: null,
  height: 0
}
const meta = (state = initialState, action) => {
  switch (action.type) {
      case 'START_FETCHING_MESSAGES':
          return Object.assign({}, state, {
              isFetching: true
          });
      case 'RECEIVED_MESSAGES':
          return Object.assign({}, state, {
              isFetching: false,
              lastFetched: action.receivedAt
          });
      case 'UPDATE_MESSAGES_HEIGHT':
          return Object.assign({}, state, {
              height: action.height
          });
      default:
          return state
  }
}
const messages = (state = [], action) => {
  switch (action.type) {
      case 'ADD_MESSAGE':
          if (state.map(m => m.id).includes(action.id)) {
              return state;
          }else{
              return [
              ...state,
              message(undefined, action)
              ]
          }
      case 'SEND_MESSAGE':
          return [
              ...state,
              message(undefined, action)
          ]
      default:
          return state
  }
};
export const chatroom = combineReducers({
  messages,
  meta
});




const message = (state, action, getFirebase) => {
  const firebase = getFirebase()
  switch (action.type) {
      case 'ADD_MESSAGE':
          return {
              id: action.id,
              text: action.text,
              time: action.time,
              author: action.author
          }
      case 'SEND_MESSAGE':
          let msg = {
              text: action.text,
              time: Date.now(),
              author: {
                  name: action.user.name,
                  avatar: action.user.avatar
              }
          };
          const newMsgRef = firebase.database()
                                    .ref('messages')
                                    .push();
          msg.id = newMsgRef.key;
          newMsgRef.set(msg);
          return msg;
      default:
          return state
  }
}


const userInitialState = {
  name: null,
  avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
  authorizing: false,
  authorized: false
};
const user = (state = userInitialState, action) => {
  switch (action.type) {
      case 'SET_USER_NAME':
          return Object.assign({}, state, {
              name: action.name
          });
      case 'SET_USER_AVATAR':
          return Object.assign({}, state, {
              avatar: action.avatar
          });
      case 'USER_START_AUTHORIZING':
          return Object.assign({}, state, {
              authorizing: true
          });
      case 'USER_AUTHORIZED':
          return Object.assign({}, state, {
              authorizing: false,
              authorized: true
          });
      default:
          return state
  }
}