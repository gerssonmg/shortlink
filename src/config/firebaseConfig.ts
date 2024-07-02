// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2CtpWyZekfMS6vxvgXJwafCe3C-CzP9E",
  authDomain: "shortlink-86962.firebaseapp.com",
  databaseURL: "https://shortlink-86962-default-rtdb.firebaseio.com",
  projectId: "shortlink-86962",
  storageBucket: "shortlink-86962.appspot.com",
  messagingSenderId: "951033020316",
  appId: "1:951033020316:web:c8ce13b21dc5f5ee4cd259",
  measurementId: "G-N63XMXZ3YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);