import app from "./config.firebase";
import { FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app as FirebaseApp);

const createUser = async (email: string, password: string) => {
    const response = createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return { error: false, data: user }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: { errorCode, errorMessage } }
        })
    return response;
}

const login = async (email: string, password: string) => {
    const response = signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return { error: false, data: user }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: { errorCode, errorMessage } }
        })
    return response;
}

export default { createUser, login };