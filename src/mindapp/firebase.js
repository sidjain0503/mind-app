import {initializeApp} from 'firebase/app'
import {getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESS_SEND_ID}`,
  appId: `${process.env.REACT_APP_API_ID}`,
  measurementId: "G-T7VFDPQZVG"
  
};

// Initialize firebase 
const app = initializeApp(firebaseConfig);

var authentication = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

export {authentication,db ,storage};
