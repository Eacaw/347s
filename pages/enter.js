import { auth, googleAuthProvider, firestore } from "../lib/firebase";
import { signInWithPopup, signOut, FacebookAuthProvider } from "firebase/auth";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import debounce from "lodash.debounce";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import SignOutButton from "../components/SignOut";
import Image from "next/image";
import { useRouter } from "next/router";

const logoHeight = "50vh";
const logoWidth = "50vw";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <>
          <GoogleSignInButton />
          <br />
          <FacebookSignInButton />
        </>
      )}
    </main>
  );
}

// Sign in with Google button
function GoogleSignInButton() {
  const signInWithGoogle = async () => {
    return signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <button className="btn-google push-center" onClick={signInWithGoogle}>
      <img src={"/google.png"} /> <p>Sign in with Google</p>
    </button>
  );
}

// Sign in with Facebook button
function FacebookSignInButton() {
  const signInWithFacebook = async () => {
    return signInWithPopup(auth, new FacebookAuthProvider());
  };

  return (
    <button className="btn-google push-center" onClick={signInWithFacebook}>
      <img src={"/facebook.png"} /> <p>Sign in with Facebook</p>
    </button>
  );
}

function UsernameForm() {
  const router = useRouter();

  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = doc(firestore, "users", user.uid);
    const usernameDoc = doc(firestore, "usernames", formValue);

    // Commit both docs together as a batch write.
    const batch = writeBatch(firestore);
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  // Check if the entered username is valid
  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  // auto redirect to the home page if the user is signed in and has a username
  useEffect(() => {
    if (username) {
      setTimeout(() => {
        router.push("/");
      }, 2500);
    }
  }, [username]);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(firestore, "usernames", username);
        const docSnap = await getDoc(ref);
        console.log("Firestore read executed!");
        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
