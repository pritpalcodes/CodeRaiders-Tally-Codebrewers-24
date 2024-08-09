import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA77h7nByejBPCHVwCZ49QZ0nhRdc7rbLY",
    authDomain: "online-compiler-d4420.firebaseapp.com",
    projectId: "online-compiler-d4420",
    storageBucket: "online-compiler-d4420.appspot.com",
    messagingSenderId: "554637175705",
    appId: "1:554637175705:web:2701f10f23cf1d93c34108",
    measurementId: "G-L458J3P26W"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;