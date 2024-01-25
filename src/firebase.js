import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCm1bO1s1vZnDFQRM8NTuWVe6YGOm23fIs",
  authDomain: "assessment-6e6cd.firebaseapp.com",
  projectId: "assessment-6e6cd",
  storageBucket: "assessment-6e6cd.appspot.com",
  messagingSenderId: "463554706549",
  appId: "1:463554706549:web:7a899722b653e4f83dcc3c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
