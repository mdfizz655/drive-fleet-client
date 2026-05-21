

import { initializeApp } from "firebase/app";



import { getAuth } from "firebase/auth";







const firebaseConfig = {
  apiKey: "AIzaSyAeNs_BtijyWY2Id9guc6WKCyBnVv_yIxU",

  authDomain: "assinment09-d2aab.firebaseapp.com",


  projectId: "assinment09-d2aab",


  storageBucket: "assinment09-d2aab.firebasestorage.app",


  messagingSenderId: "264645959128",


  appId: "1:264645959128:web:c3beb510059b7b6b72a6ad",


  measurementId: "G-SJMM4VGQ4B"
};





export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);