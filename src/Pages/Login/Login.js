import { CircularProgress } from "@mui/material";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginCard from "./Components/LoginCard";

const Login = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [user] = useAuthState(getAuth());
  const [refreshedUser, setRefreshedUser] = useState(null);

  const db = getFirestore();

  async function setUserDoc(user) {
    let userDoc;
    try {
      userDoc = await getDoc(doc(db, "Users", user.uid));
    } catch (error) {
      // No user doc found, create one
    }
    await setDoc(doc(db, "Users", refreshedUser.uid), {
      displayName: refreshedUser.displayName,
      email: refreshedUser.email,
      photoURL: refreshedUser.photoURL,
      previouslogin: userDoc.data()
        ? userDoc.data().lastLogin
        : serverTimestamp(),
      lastLogin: serverTimestamp(),
      contributions: [],
      isAdmin: userDoc.data() ? userDoc.data().isAdmin : false,
    });
    moveToFeed();
  }

  function moveToFeed() {
    window.location.href = "/feed";
  }

  useEffect(() => {
    if (user) {
      user.reload().then(() => {
        setRefreshedUser(getAuth().currentUser);
      });
    }
  }, [user]);

  useEffect(() => {
    if (refreshedUser) {
      // Store a user doc in the db if it doesn't exist
      setShowSpinner(true);
      setUserDoc(refreshedUser);
    }
  }, [refreshedUser]);

  return (
    <div className="center-align-cards top-padding-navbar">
      {showSpinner ? <CircularProgress /> : <LoginCard />}
    </div>
  );
};

export default Login;
