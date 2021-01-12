import { combineReducers } from 'redux';
import authReducer from './authReducer';
import plannerReducer from './plannerReducer';
import {reducer as firebase} from 'react-redux-firebase';
import { reducer as firestore } from 'react-redux-firebase';
//import { location } from './directions'
//import { chatroom } from './chatroomReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  planner: plannerReducer,
  firebase,
  firestore
  //location,
//chatroom
})

export default rootReducer