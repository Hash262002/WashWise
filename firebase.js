import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDIXgYaF3i5ap2E046_YzBQi1yScR_UyGQ",
  authDomain: "washwise-dc55b.firebaseapp.com",
  projectId: "washwise-dc55b",
  storageBucket: "washwise-dc55b.appspot.com",
  messagingSenderId: "252029544979",
  appId: "1:252029544979:web:de0697d09175ae36f6ade6"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore();
 export {auth,db};