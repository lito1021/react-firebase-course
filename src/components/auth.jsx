import { auth, googleProvider } from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import React, { useState, useEffect } from "react";

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };


    return ( 
        <div>
            <input
            placeholder = "Email..."
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
             placeholder = "Password..."
             onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}> Sign In </button>

            <button onClick={logout}> Log out </button>

            <button onClick={signIn}>Sign In With Google</button>
        </div>
    );
};