import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("email", email);
  } catch (error) {
    throw Error(error);
  }
};

export const signupUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data) => {
  const uid = auth.currentUser.uid;
  try {
    if (uid) {
      const ref = doc(db, "users", uid);
      await setDoc(ref, data);
      localStorage.setItem("email", data.email);
      window.location.reload();
    }
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserData = async () => {
  const uid = auth.currentUser.uid;
  try {
    const docRef = doc(db, "users", uid);
    const d = await getDoc(docRef);
    if (d.exists) {
      return d.data();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data) => {
  const uid = auth.currentUser.uid;
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, data);
  } catch (error) {
    throw error;
  }
};

export const signout = async () => {
  await signOut(auth);
};
