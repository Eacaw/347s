import { initializeApp, getApp, FirebaseOptions } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBvaVmCk31IcRiUHwTH5dE-RN0zdOol18I",
  authDomain: "fir-dev-bae24.firebaseapp.com",
  projectId: "fir-dev-bae24",
  storageBucket: "fir-dev-bae24.appspot.com",
  messagingSenderId: "415811267911",
  appId: "1:415811267911:web:a326f47ffb29f70d143062",
  measurementId: "G-4G6368RKNB",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}
const firebaseApp = createFirebaseApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore();

export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = "state_changed";

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  // const usersRef = collection(firestore, 'users');
  // const query = usersRef.where('username', '==', username).limit(1);

  const q = query(
    collection(firestore, "users"),
    where("username", "==", username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
