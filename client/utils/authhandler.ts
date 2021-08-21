import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

import { setCredentials } from "./misc";

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

console.log(process.env.NEXT_PUBLIC_AUTH_DOMAIN)
// firease config
const fireBaseConfig_: IfirebaseConfig = {
    apiKey: "cowbvv8f9h34f8h3ffr30hfh",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "123456",
    measurementId: "537875835"
}

const firebaseApp = initializeApp(fireBaseConfig_);

const auth: any = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

connectAuthEmulator(auth, "http://localhost:9000");

async function signUser(email: string, password: string) {
    const signUpResult = await createUserWithEmailAndPassword(auth, email, password);
    return signUpResult;
}

function signWithGoogle() {
    let status: string;

    signInWithPopup(auth, googleProvider)
        .then(res => {
            const credentials = GoogleAuthProvider.credentialFromResult(res);
            const token: string = credentials.accessToken;
            const name: string = res.user.displayName;
            const email: string = res.user.email;

            // save the user credentials in localStorage
            setCredentials(name, email, token);
            status = "success";
        }).catch(error => {
            status = "error";
        });

        return status;
}

function getUser() {
    let uid: string;
    onAuthStateChanged(auth, user => {
        if (user) {
            uid = user.uid;
        } else {
            return;
        }
        
    }); 

    return uid;
}


export { signUser, signWithGoogle, auth };