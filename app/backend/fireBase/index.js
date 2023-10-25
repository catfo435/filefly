import firebase from "firebase/compat/app";
import "firebase/firestore";

import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CREDS)

const app = initializeApp(firebaseConfig)

export const fileStorage = getStorage(app);
