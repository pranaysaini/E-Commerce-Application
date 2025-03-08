import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD7u-DIiOP-TlftkMAe_7bls9HZPa0Arxw" ,
    authDomain: "e-commerce-application-31a8b.firebaseapp.com" ,
    projectId: "e-commerce-application-31a8b" ,
    storageBucket: "e-commerce-application-31a8b.firebasestorage.app" ,
    messagingSenderId: "887382586758" ,
    appId: "1:887382586758:web:d8dd1e53d01e15b08de807" ,
    measurementId: "G-5Z97VPQCZX"
  };

  // const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  export { app, auth, firebaseConfig, db };
  
