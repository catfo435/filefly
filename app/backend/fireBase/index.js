import firebase from "firebase/compat/app";
import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CREDS)

const app = initializeApp(firebaseConfig)

export const firebaseDB  = getFirestore(app);
