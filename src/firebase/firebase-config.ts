import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from "@firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const app = initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyB-Itp-etrAupxtre8vNss4t_Z4TqCvbJc",
  authDomain: "comfty-sloth.firebaseapp.com",
  projectId: "comfty-sloth",
  storageBucket: "comfty-sloth.appspot.com",
  messagingSenderId: "414420056040",
  appId: "1:414420056040:web:4937e9dc5f32aef735965d",
  measurementId: "G-0M9H8GP2N6",
});

//database of products
export const db = getFirestore(app);

//products collection methods
export const loadProducts = async () => {
  const data = await getDocs(collection(db, "products"));
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

//auth
const provider = new GoogleAuthProvider();
//adding this so user must select an account when Signing in with Google
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//users collection methods
export const createUserDocumentFromAuth = async (
  userAuth: any,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //if user does not exist - it will be added to firebase list
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user");
    }
  }
  //if created
  return userDocRef;
};

export const createUserWithEmailAndPasswordFromAuth = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPasswordFromAuth = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
