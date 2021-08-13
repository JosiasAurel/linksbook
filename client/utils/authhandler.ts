import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";

interface IfirebaseConfig {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
}

// firease config
const fireBaseConfig: IfirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSENGER_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASURE
}

// instancing firebase app
const firebaseApp = initializeApp(fireBaseConfig);

const auth: any = getAuth(firebaseApp);

function signUser(email, password) {

}

export {};