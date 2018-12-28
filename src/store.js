import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-UqT903UqyLCL54zvvNs2V6Vox7CCmas",
  authDomain: "react-redux-clientmanager.firebaseapp.com",
  databaseURL: "https://react-redux-clientmanager.firebaseio.com",
  projectId: "react-redux-clientmanager",
  storageBucket: "react-redux-clientmanager.appspot.com",
  messagingSenderId: "693461818903"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

// check for settings in local storage
if (localStorage.getItem("settings") == null) {
  //Default Settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  // set to local strorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// create initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
