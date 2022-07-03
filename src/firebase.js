
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBE-thRm9WzWty0AluoF_nujDoiiesUDjo",
    authDomain: "disneyplus-clone-fc2b6.firebaseapp.com",
    projectId: "disneyplus-clone-fc2b6",
    storageBucket: "disneyplus-clone-fc2b6.appspot.com",
    messagingSenderId: "700100267921",
    appId: "1:700100267921:web:e44ddb6ef0cd0480cd5430",
    measurementId: "G-PYQWSLJX2Y"
  };
  

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  const storage=firebase.storage;

  export {auth, provider, storage};
  export default db;